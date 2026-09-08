// Показывает, по какому адресу открывать приложение с телефона.
//
// Запуск: npm run lan

import os from 'node:os'

const ips = []
for (const list of Object.values(os.networkInterfaces())) {
  for (const n of list || []) {
    if (n.family === 'IPv4' && !n.internal) ips.push({ ip: n.address, name: n.interfaceName || '' })
  }
}

if (ips.length === 0) {
  console.log('Не вижу ни одной локальной сети. Телефон не сможет дойти до dev-сервера.')
  process.exit(1)
}

console.log('\nЧекАгент в локальной сети:\n')
for (const { ip, name } of ips) {
  console.log(`  ${name ? name + '  ' : ''}${ip}`)
  console.log(`    обычный:  http://${ip}:8080`)
  console.log(`    установка: https://${ip}:8080   (npm run dev:https)\n`)
}

console.log(
  'Телефон должен быть в той же Wi-Fi сети. По http всё работает, кроме\n' +
    'установки на экран и пушей: им нужен защищённый контекст, то есть https.\n' +
    'Свой сертификат Chrome не знает — один раз нажмите\n' +
    '«Дополнительно → Перейти на сайт».\n',
)
