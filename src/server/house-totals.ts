import { q } from './db'
import { monthKey } from '~/lib/format'
import type { Member } from './functions/houses'
export async function membersOf(houseId: string): Promise<Array<Member>> {
  const rows = await q<Member & { display_name: string | null; uname: string | null; email: string | null }>(
    `SELECT m.id, m.user_id, m.salary_cents AS salary,
            p.display_name,
            u.name AS uname,
            u.email AS email
       FROM house_members m
       LEFT JOIN profiles p ON p.user_id = m.user_id
       LEFT JOIN "user" u ON u.id = m.user_id
      WHERE m.house_id = $1
      ORDER BY m.created_at`,
    [houseId],
  )
  return (rows ?? []).map((r) => ({
    id: r.id,
    user_id: r.user_id,
    name: r.display_name || r.uname || r.email?.split('@')[0] || 'Человек',
    salary: Number(r.salary || 0),
  }))
}

/** Доли: поровну / по доле зарплаты / платит один. Целые рубли, без копеек. */
export function computeShares(
  bill: { amount: number; split: string; payer_id: string | null },
  members: Array<Member>,
): Record<string, number> {
  const out: Record<string, number> = {}
  const amount = Math.round(Number(bill.amount || 0))
  if (!members.length) return out

  if (bill.split === 'payer') {
    for (const m of members) out[m.user_id] = 0
    const target = bill.payer_id && out[bill.payer_id] !== undefined ? bill.payer_id : members[0].user_id
    out[target] = amount
    return out
  }

  if (bill.split === 'salary') {
    const total = members.reduce((s, m) => s + Math.max(0, m.salary), 0)
    if (total > 0) {
      let given = 0
      members.forEach((m, idx) => {
        const share = idx === members.length - 1 ? amount - given : Math.round((amount * Math.max(0, m.salary)) / total)
        out[m.user_id] = share
        given += share
      })
      return out
    }
  }

  const base = Math.floor(amount / members.length)
  let given = 0
  members.forEach((m, idx) => {
    const share = idx === members.length - 1 ? amount - given : base
    out[m.user_id] = share
    given += share
  })
  return out
}

/** Internal aggregation for already-authorized house IDs; same paid-share rule as the detail screen. */
export async function paidHouseTotals(ids:string[]):Promise<Record<string,number>>{
 if(!ids.length)return {}
 const [bills,pays]=await Promise.all([
  q<any>('SELECT * FROM house_bills WHERE house_id=ANY($1::text[])',[ids]),
  q<any>('SELECT p.bill_id,p.user_id FROM house_bill_pays p JOIN house_bills b ON b.id=p.bill_id WHERE b.house_id=ANY($1::text[]) AND p.cycle=$2',[ids,monthKey()])
 ])
 const members=new Map(await Promise.all(ids.map(async id=>[id,await membersOf(id)] as const)))
 const result:Record<string,number>={}
 for(const bill of bills){
  const shares=computeShares(bill,members.get(bill.house_id)||[])
  for(const [uid,amount] of Object.entries(shares))if(pays.some(p=>p.bill_id===bill.id&&p.user_id===uid))result[bill.house_id]=(result[bill.house_id]||0)+amount
 }
 return result
}
