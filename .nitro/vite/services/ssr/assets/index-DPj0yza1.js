var p$2 = Object.create;
var i = Object.defineProperty;
var c$2 = Object.getOwnPropertyDescriptor;
var f$2 = Object.getOwnPropertyNames;
var l = Object.getPrototypeOf, s$2 = Object.prototype.hasOwnProperty;
var a$1 = (t2) => {
  throw TypeError(t2);
};
var _$2 = (t2, e, o2) => e in t2 ? i(t2, e, { enumerable: true, configurable: true, writable: true, value: o2 }) : t2[e] = o2;
var d$1 = (t2, e) => () => (t2 && (e = t2(t2 = 0)), e);
var D$3 = (t2, e) => () => (e || t2((e = { exports: {} }).exports, e), e.exports), F$1 = (t2, e) => {
  for (var o2 in e) i(t2, o2, { get: e[o2], enumerable: true });
}, g$2 = (t2, e, o2, m2) => {
  if (e && typeof e == "object" || typeof e == "function") for (let r of f$2(e)) !s$2.call(t2, r) && r !== o2 && i(t2, r, { get: () => e[r], enumerable: !(m2 = c$2(e, r)) || m2.enumerable });
  return t2;
};
var L$1 = (t2, e, o2) => (o2 = t2 != null ? p$2(l(t2)) : {}, g$2(i(o2, "default", { value: t2, enumerable: true }), t2));
var P$2 = (t2, e, o2) => _$2(t2, typeof e != "symbol" ? e + "" : e, o2), n = (t2, e, o2) => e.has(t2) || a$1("Cannot " + o2);
var h$1 = (t2, e, o2) => (n(t2, e, "read from private field"), o2 ? o2.call(t2) : e.get(t2)), R$1 = (t2, e, o2) => e.has(t2) ? a$1("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t2) : e.set(t2, o2), x$2 = (t2, e, o2, m2) => (n(t2, e, "write to private field"), e.set(t2, o2), o2), T$1 = (t2, e, o2) => (n(t2, e, "access private method"), o2);
var U$1 = (t2, e, o2, m2) => ({ set _(r) {
  x$2(t2, e, r);
}, get _() {
  return h$1(t2, e, m2);
} });
var u$1 = d$1(() => {
});
var yn = {};
F$1(yn, { ABSTIME: () => Et$1, ACLITEM: () => Ut, BIT: () => Qt, BOOL: () => ye, BPCHAR: () => ve$1, BYTEA: () => he$1, CHAR: () => bt, CID: () => St, CIDR: () => Rt, CIRCLE: () => Nt, DATE: () => ze$1, FLOAT4: () => Qe$1, FLOAT8: () => _e$1, GTSVECTOR: () => nn, INET: () => Ot, INT2: () => Ve$2, INT4: () => Fe$1, INT8: () => be, INTERVAL: () => Ft, JSON: () => we$1, JSONB: () => Ye$2, MACADDR: () => kt, MACADDR8: () => Pt, MONEY: () => Lt, NUMERIC: () => vt$1, OID: () => Ge$1, PATH: () => xt, PG_DEPENDENCIES: () => Zt, PG_LSN: () => $t, PG_NDISTINCT: () => Xt, PG_NODE_TREE: () => Dt, POLYGON: () => Mt$1, REFCURSOR: () => Ht, REGCLASS: () => jt, REGCONFIG: () => rn, REGDICTIONARY: () => sn, REGNAMESPACE: () => an, REGOPER: () => qt, REGOPERATOR: () => Yt, REGPROC: () => gt$1, REGPROCEDURE: () => zt, REGROLE: () => on, REGTYPE: () => Wt, RELTIME: () => Ct, SMGR: () => It, TEXT: () => ge$1, TID: () => wt$1, TIME: () => Vt, TIMESTAMP: () => qe$1, TIMESTAMPTZ: () => Ae, TIMETZ: () => Gt, TINTERVAL: () => Tt, TSQUERY: () => tn, TSVECTOR: () => en, TXID_SNAPSHOT: () => Jt, UUID: () => Kt, VARBIT: () => _t$1, VARCHAR: () => He$2, XID: () => At$1, XML: () => Bt, arrayParser: () => mn, arraySerializer: () => We$2, parseType: () => se$1, parsers: () => un, serializers: () => cn, types: () => je$2 });
u$1();
var yt = globalThis.JSON.parse, ht$1 = globalThis.JSON.stringify, ye = 16, he$1 = 17, bt = 18, be = 20, Ve$2 = 21, Fe$1 = 23, gt$1 = 24, ge$1 = 25, Ge$1 = 26, wt$1 = 27, At$1 = 28, St = 29, we$1 = 114, Bt = 142, Dt = 194, It = 210, xt = 602, Mt$1 = 604, Rt = 650, Qe$1 = 700, _e$1 = 701, Et$1 = 702, Ct = 703, Tt = 704, Nt = 718, Pt = 774, Lt = 790, kt = 829, Ot = 869, Ut = 1033, ve$1 = 1042, He$2 = 1043, ze$1 = 1082, Vt = 1083, qe$1 = 1114, Ae = 1184, Ft = 1186, Gt = 1266, Qt = 1560, _t$1 = 1562, vt$1 = 1700, Ht = 1790, zt = 2202, qt = 2203, Yt = 2204, jt = 2205, Wt = 2206, Kt = 2950, Jt = 2970, $t = 3220, Xt = 3361, Zt = 3402, en = 3614, tn = 3615, nn = 3642, rn = 3734, sn = 3769, Ye$2 = 3802, an = 4089, on = 4096, je$2 = { string: { to: ge$1, from: [ge$1, He$2, ve$1], serialize: (e) => e instanceof Date ? e.toISOString() : e.toString(), parse: (e) => e }, number: { to: 0, from: [Ve$2, Fe$1, Ge$1, Qe$1, _e$1], serialize: (e) => e.toString(), parse: (e) => +e }, bigint: { to: be, from: [be], serialize: (e) => e.toString(), parse: (e) => {
  let t2 = BigInt(e);
  return t2 < Number.MIN_SAFE_INTEGER || t2 > Number.MAX_SAFE_INTEGER ? t2 : Number(t2);
} }, json: { to: we$1, from: [we$1, Ye$2], serialize: (e) => typeof e == "string" ? e : ht$1(e, (t2, n2) => typeof n2 == "bigint" ? n2.toString() : n2), parse: (e) => yt(e) }, boolean: { to: ye, from: [ye], serialize: (e) => {
  if (typeof e == "boolean") return e ? "t" : "f";
  if (typeof e == "number") {
    if (e === 1) return "t";
    if (e === 0) return "f";
  } else if (typeof e == "string") {
    let t2 = e.trim().toLowerCase();
    if (["true", "t", "yes", "y", "on", "1"].includes(t2)) return "t";
    if (["false", "f", "no", "n", "off", "0"].includes(t2)) return "f";
  }
  throw new Error("Invalid input for boolean type");
}, parse: (e) => e === "t" }, date: { to: Ae, from: [ze$1, qe$1, Ae], serialize: (e) => {
  if (typeof e == "string") return e;
  if (typeof e == "number") return new Date(e).toISOString();
  if (e instanceof Date) return e.toISOString();
  throw new Error("Invalid input for date type");
}, parse: (e) => new Date(e) }, bytea: { to: he$1, from: [he$1], serialize: (e) => {
  if (!(e instanceof Uint8Array)) throw new Error("Invalid input for bytea type");
  return "\\x" + Array.from(e).map((t2) => t2.toString(16).padStart(2, "0")).join("");
}, parse: (e) => {
  let t2 = e.slice(2);
  return Uint8Array.from({ length: t2.length / 2 }, (n2, s2) => parseInt(t2.substring(s2 * 2, (s2 + 1) * 2), 16));
} } }, Se = ln(je$2), un = Se.parsers, cn = Se.serializers;
function se$1(e, t2, n2) {
  if (e === null) return null;
  let s2 = n2?.[t2] ?? Se.parsers[t2];
  return s2 ? s2(e, t2) : e;
}
function ln(e) {
  return Object.keys(e).reduce(({ parsers: t2, serializers: n2 }, s2) => {
    let { to: i2, from: a2, serialize: u2, parse: m2 } = e[s2];
    return n2[i2] = u2, n2[s2] = u2, t2[s2] = m2, Array.isArray(a2) ? a2.forEach((l2) => {
      t2[l2] = m2, n2[l2] = u2;
    }) : (t2[a2] = m2, n2[a2] = u2), { parsers: t2, serializers: n2 };
  }, { parsers: {}, serializers: {} });
}
var pn = /\\/g, dn = /"/g;
function fn(e) {
  return e.replace(pn, "\\\\").replace(dn, '\\"');
}
function We$2(e, t2, n2) {
  if (Array.isArray(e) === false) return e;
  if (!e.length) return "{}";
  let s2 = e[0], i2 = n2 === 1020 ? ";" : ",";
  return Array.isArray(s2) ? `{${e.map((a2) => We$2(a2, t2, n2)).join(i2)}}` : `{${e.map((a2) => (a2 === void 0 && (a2 = null), a2 === null ? "null" : '"' + fn(t2 ? t2(a2) : a2.toString()) + '"')).join(i2)}}`;
}
var me$1 = { i: 0, char: null, str: "", quoted: false, last: 0, p: null };
function mn(e, t2, n2) {
  return me$1.i = me$1.last = 0, Ke$1(me$1, e, t2, n2)[0];
}
function Ke$1(e, t2, n2, s2) {
  let i2 = [], a2 = s2 === 1020 ? ";" : ",";
  for (; e.i < t2.length; e.i++) {
    if (e.char = t2[e.i], e.quoted) e.char === "\\" ? e.str += t2[++e.i] : e.char === '"' ? (i2.push(n2 ? n2(e.str) : e.str), e.str = "", e.quoted = t2[e.i + 1] === '"', e.last = e.i + 2) : e.str += e.char;
    else if (e.char === '"') e.quoted = true;
    else if (e.char === "{") e.last = ++e.i, i2.push(Ke$1(e, t2, n2, s2));
    else if (e.char === "}") {
      if (e.last < e.i) {
        let u2 = t2.slice(e.last, e.i);
        u2 === "NULL" && !e.quoted ? i2.push(null) : i2.push(n2 ? n2(u2) : u2);
      }
      e.quoted = false, e.last = e.i + 1;
      break;
    } else if (e.char === a2 && e.p !== "}" && e.p !== '"') {
      let u2 = t2.slice(e.last, e.i);
      u2 === "NULL" && !e.quoted ? i2.push(null) : i2.push(n2 ? n2(u2) : u2), e.last = e.i + 1;
    }
    e.p = e.char;
  }
  return e.last < e.i && i2.push(n2 ? n2(t2.slice(e.last, e.i + 1)) : t2.slice(e.last, e.i + 1)), i2;
}
var gn = {};
F$1(gn, { parseDescribeStatementResults: () => bn, parseResults: () => hn });
u$1();
function hn(e, t2, n2, s2) {
  let i2 = [], a2 = { rows: [], fields: [] }, u2 = 0, m2 = { ...t2, ...n2?.parsers };
  return e.forEach((l2) => {
    switch (l2.name) {
      case "rowDescription": {
        let E2 = l2;
        a2.fields = E2.fields.map((I2) => ({ name: I2.name, dataTypeID: I2.dataTypeID }));
        break;
      }
      case "dataRow": {
        if (!a2) break;
        let E2 = l2;
        n2?.rowMode === "array" ? a2.rows.push(E2.fields.map((I2, C2) => se$1(I2, a2.fields[C2].dataTypeID, m2))) : a2.rows.push(Object.fromEntries(E2.fields.map((I2, C2) => [a2.fields[C2].name, se$1(I2, a2.fields[C2].dataTypeID, m2)])));
        break;
      }
      case "commandComplete": {
        let I2 = l2.text.split(" "), C2 = I2[0], de2 = parseInt(I2[I2.length - 1], 10);
        switch (C2) {
          case "INSERT":
          case "UPDATE":
          case "DELETE":
          case "COPY":
          case "MERGE":
            u2 += de2;
            break;
        }
        let fe2 = { ...a2, command: C2, affectedRows: u2 };
        Number.isNaN(de2) || (fe2.rowCount = de2), s2 && (fe2.blob = s2), i2.push(fe2), a2 = { rows: [], fields: [] };
        break;
      }
    }
  }), i2.length === 0 && i2.push({ affectedRows: 0, rows: [], fields: [] }), i2;
}
function bn(e) {
  let t2 = e.find((n2) => n2.name === "parameterDescription");
  return t2 ? t2.dataTypeIDs : [];
}
var Te$1 = {};
F$1(Te$1, { AuthenticationCleartextPassword: () => F, AuthenticationMD5Password: () => G$2, AuthenticationOk: () => V, AuthenticationSASL: () => Q, AuthenticationSASLContinue: () => _$1, AuthenticationSASLFinal: () => v$2, BackendKeyDataMessage: () => K, CommandCompleteMessage: () => X, CopyDataMessage: () => H$1, CopyResponse: () => z$2, DataRowMessage: () => Z, DatabaseError: () => N$1, Field: () => q, NoticeMessage: () => ee$1, NotificationResponseMessage: () => J$1, ParameterDescriptionMessage: () => j, ParameterStatusMessage: () => W$2, ReadyForQueryMessage: () => $$1, RowDescriptionMessage: () => Y$1, bindComplete: () => De$1, closeComplete: () => Ie$2, copyDone: () => Ce$2, emptyQuery: () => Ee$1, noData: () => xe$2, parseComplete: () => Be$2, portalSuspended: () => Me$2, replicationStart: () => Re$2 });
u$1();
var Be$2 = { name: "parseComplete", length: 5 }, De$1 = { name: "bindComplete", length: 5 }, Ie$2 = { name: "closeComplete", length: 5 }, xe$2 = { name: "noData", length: 5 }, Me$2 = { name: "portalSuspended", length: 5 }, Re$2 = { name: "replicationStart", length: 4 }, Ee$1 = { name: "emptyQuery", length: 4 }, Ce$2 = { name: "copyDone", length: 4 }, V = class {
  constructor(t2) {
    this.length = t2;
    this.name = "authenticationOk";
  }
}, F = class {
  constructor(t2) {
    this.length = t2;
    this.name = "authenticationCleartextPassword";
  }
}, G$2 = class G2 {
  constructor(t2, n2) {
    this.length = t2;
    this.salt = n2;
    this.name = "authenticationMD5Password";
  }
}, Q = class {
  constructor(t2, n2) {
    this.length = t2;
    this.mechanisms = n2;
    this.name = "authenticationSASL";
  }
}, _$1 = class _2 {
  constructor(t2, n2) {
    this.length = t2;
    this.data = n2;
    this.name = "authenticationSASLContinue";
  }
}, v$2 = class v2 {
  constructor(t2, n2) {
    this.length = t2;
    this.data = n2;
    this.name = "authenticationSASLFinal";
  }
}, N$1 = class N2 extends Error {
  constructor(n2, s2, i2) {
    super(n2);
    this.length = s2;
    this.name = i2;
  }
}, H$1 = class H2 {
  constructor(t2, n2) {
    this.length = t2;
    this.chunk = n2;
    this.name = "copyData";
  }
}, z$2 = class z2 {
  constructor(t2, n2, s2, i2) {
    this.length = t2;
    this.name = n2;
    this.binary = s2;
    this.columnTypes = new Array(i2);
  }
}, q = class {
  constructor(t2, n2, s2, i2, a2, u2, m2) {
    this.name = t2;
    this.tableID = n2;
    this.columnID = s2;
    this.dataTypeID = i2;
    this.dataTypeSize = a2;
    this.dataTypeModifier = u2;
    this.format = m2;
  }
}, Y$1 = class Y2 {
  constructor(t2, n2) {
    this.length = t2;
    this.fieldCount = n2;
    this.name = "rowDescription";
    this.fields = new Array(this.fieldCount);
  }
}, j = class {
  constructor(t2, n2) {
    this.length = t2;
    this.parameterCount = n2;
    this.name = "parameterDescription";
    this.dataTypeIDs = new Array(this.parameterCount);
  }
}, W$2 = class W2 {
  constructor(t2, n2, s2) {
    this.length = t2;
    this.parameterName = n2;
    this.parameterValue = s2;
    this.name = "parameterStatus";
  }
}, K = class {
  constructor(t2, n2, s2) {
    this.length = t2;
    this.processID = n2;
    this.secretKey = s2;
    this.name = "backendKeyData";
  }
}, J$1 = class J2 {
  constructor(t2, n2, s2, i2) {
    this.length = t2;
    this.processId = n2;
    this.channel = s2;
    this.payload = i2;
    this.name = "notification";
  }
}, $$1 = class $2 {
  constructor(t2, n2) {
    this.length = t2;
    this.status = n2;
    this.name = "readyForQuery";
  }
}, X = class {
  constructor(t2, n2) {
    this.length = t2;
    this.text = n2;
    this.name = "commandComplete";
  }
}, Z = class {
  constructor(t2, n2) {
    this.length = t2;
    this.fields = n2;
    this.name = "dataRow";
    this.fieldCount = n2.length;
  }
}, ee$1 = class ee2 {
  constructor(t2, n2) {
    this.length = t2;
    this.message = n2;
    this.name = "notice";
  }
};
var zn = {};
F$1(zn, { Parser: () => pe$1, messages: () => Te$1, serialize: () => $e$1 });
u$1();
u$1();
u$1();
u$1();
function P$1(e) {
  let t2 = e.length;
  for (let n2 = e.length - 1; n2 >= 0; n2--) {
    let s2 = e.charCodeAt(n2);
    s2 > 127 && s2 <= 2047 ? t2++ : s2 > 2047 && s2 <= 65535 && (t2 += 2), s2 >= 56320 && s2 <= 57343 && n2--;
  }
  return t2;
}
var b$1, g$1, k, ae$1, O$1, S$1, ie$2, L, Je$1, T = class {
  constructor(t2 = 256) {
    this.size = t2;
    R$1(this, S$1);
    R$1(this, b$1);
    R$1(this, g$1, 5);
    R$1(this, k, false);
    R$1(this, ae$1, new TextEncoder());
    R$1(this, O$1, 0);
    x$2(this, b$1, T$1(this, S$1, ie$2).call(this, t2));
  }
  addInt32(t2) {
    return T$1(this, S$1, L).call(this, 4), h$1(this, b$1).setInt32(h$1(this, g$1), t2, h$1(this, k)), x$2(this, g$1, h$1(this, g$1) + 4), this;
  }
  addInt16(t2) {
    return T$1(this, S$1, L).call(this, 2), h$1(this, b$1).setInt16(h$1(this, g$1), t2, h$1(this, k)), x$2(this, g$1, h$1(this, g$1) + 2), this;
  }
  addCString(t2) {
    return t2 && this.addString(t2), T$1(this, S$1, L).call(this, 1), h$1(this, b$1).setUint8(h$1(this, g$1), 0), U$1(this, g$1)._++, this;
  }
  addString(t2 = "") {
    let n2 = P$1(t2);
    return T$1(this, S$1, L).call(this, n2), h$1(this, ae$1).encodeInto(t2, new Uint8Array(h$1(this, b$1).buffer, h$1(this, g$1))), x$2(this, g$1, h$1(this, g$1) + n2), this;
  }
  add(t2) {
    return T$1(this, S$1, L).call(this, t2.byteLength), new Uint8Array(h$1(this, b$1).buffer).set(new Uint8Array(t2), h$1(this, g$1)), x$2(this, g$1, h$1(this, g$1) + t2.byteLength), this;
  }
  flush(t2) {
    let n2 = T$1(this, S$1, Je$1).call(this, t2);
    return x$2(this, g$1, 5), x$2(this, b$1, T$1(this, S$1, ie$2).call(this, this.size)), new Uint8Array(n2);
  }
};
b$1 = /* @__PURE__ */ new WeakMap(), g$1 = /* @__PURE__ */ new WeakMap(), k = /* @__PURE__ */ new WeakMap(), ae$1 = /* @__PURE__ */ new WeakMap(), O$1 = /* @__PURE__ */ new WeakMap(), S$1 = /* @__PURE__ */ new WeakSet(), ie$2 = function(t2) {
  return new DataView(new ArrayBuffer(t2));
}, L = function(t2) {
  if (h$1(this, b$1).byteLength - h$1(this, g$1) < t2) {
    let s2 = h$1(this, b$1).buffer, i2 = s2.byteLength + (s2.byteLength >> 1) + t2;
    x$2(this, b$1, T$1(this, S$1, ie$2).call(this, i2)), new Uint8Array(h$1(this, b$1).buffer).set(new Uint8Array(s2));
  }
}, Je$1 = function(t2) {
  if (t2) {
    h$1(this, b$1).setUint8(h$1(this, O$1), t2);
    let n2 = h$1(this, g$1) - (h$1(this, O$1) + 1);
    h$1(this, b$1).setInt32(h$1(this, O$1) + 1, n2, h$1(this, k));
  }
  return h$1(this, b$1).buffer.slice(t2 ? 0 : 5, h$1(this, g$1));
};
var f$1 = new T(), wn = (e) => {
  f$1.addInt16(3).addInt16(0);
  for (let s2 of Object.keys(e)) f$1.addCString(s2).addCString(e[s2]);
  f$1.addCString("client_encoding").addCString("UTF8");
  let t2 = f$1.addCString("").flush(), n2 = t2.byteLength + 4;
  return new T().addInt32(n2).add(t2).flush();
}, An = () => {
  let e = new DataView(new ArrayBuffer(8));
  return e.setInt32(0, 8, false), e.setInt32(4, 80877103, false), new Uint8Array(e.buffer);
}, Sn = (e) => f$1.addCString(e).flush(112), Bn = (e, t2) => (f$1.addCString(e).addInt32(P$1(t2)).addString(t2), f$1.flush(112)), Dn = (e) => f$1.addString(e).flush(112), In = (e) => f$1.addCString(e).flush(81), xn = [], Mn = (e) => {
  let t2 = e.name ?? "";
  t2.length > 63 && (console.error("Warning! Postgres only supports 63 characters for query names."), console.error("You supplied %s (%s)", t2, t2.length), console.error("This can cause conflicts and silent errors executing queries"));
  let n2 = f$1.addCString(t2).addCString(e.text).addInt16(e.types?.length ?? 0);
  return e.types?.forEach((s2) => n2.addInt32(s2)), f$1.flush(80);
}, U = new T();
var Rn = (e, t2) => {
  for (let n2 = 0; n2 < e.length; n2++) {
    let s2 = t2 ? t2(e[n2], n2) : e[n2];
    if (s2 === null) f$1.addInt16(0), U.addInt32(-1);
    else if (s2 instanceof ArrayBuffer || ArrayBuffer.isView(s2)) {
      let i2 = ArrayBuffer.isView(s2) ? s2.buffer.slice(s2.byteOffset, s2.byteOffset + s2.byteLength) : s2;
      f$1.addInt16(1), U.addInt32(i2.byteLength), U.add(i2);
    } else f$1.addInt16(0), U.addInt32(P$1(s2)), U.addString(s2);
  }
}, En = (e = {}) => {
  let t2 = e.portal ?? "", n2 = e.statement ?? "", s2 = e.binary ?? false, i2 = e.values ?? xn, a2 = i2.length;
  return f$1.addCString(t2).addCString(n2), f$1.addInt16(a2), Rn(i2, e.valueMapper), f$1.addInt16(a2), f$1.add(U.flush()), f$1.addInt16(s2 ? 1 : 0), f$1.flush(66);
}, Cn = new Uint8Array([69, 0, 0, 0, 9, 0, 0, 0, 0, 0]), Tn = (e) => {
  if (!e || !e.portal && !e.rows) return Cn;
  let t2 = e.portal ?? "", n2 = e.rows ?? 0, s2 = P$1(t2), i2 = 4 + s2 + 1 + 4, a2 = new DataView(new ArrayBuffer(1 + i2));
  return a2.setUint8(0, 69), a2.setInt32(1, i2, false), new TextEncoder().encodeInto(t2, new Uint8Array(a2.buffer, 5)), a2.setUint8(s2 + 5, 0), a2.setUint32(a2.byteLength - 4, n2, false), new Uint8Array(a2.buffer);
}, Nn = (e, t2) => {
  let n2 = new DataView(new ArrayBuffer(16));
  return n2.setInt32(0, 16, false), n2.setInt16(4, 1234, false), n2.setInt16(6, 5678, false), n2.setInt32(8, e, false), n2.setInt32(12, t2, false), new Uint8Array(n2.buffer);
}, Ne$1 = (e, t2) => {
  let n2 = new T();
  return n2.addCString(t2), n2.flush(e);
}, Pn = f$1.addCString("P").flush(68), Ln = f$1.addCString("S").flush(68), kn = (e) => e.name ? Ne$1(68, `${e.type}${e.name ?? ""}`) : e.type === "P" ? Pn : Ln, On = (e) => {
  let t2 = `${e.type}${e.name ?? ""}`;
  return Ne$1(67, t2);
}, Un = (e) => f$1.add(e).flush(100), Vn = (e) => Ne$1(102, e), oe$1 = (e) => new Uint8Array([e, 0, 0, 0, 4]), Fn = oe$1(72), Gn = oe$1(83), Qn = oe$1(88), _n = oe$1(99), $e$1 = { startup: wn, password: Sn, requestSsl: An, sendSASLInitialResponseMessage: Bn, sendSCRAMClientFinalMessage: Dn, query: In, parse: Mn, bind: En, execute: Tn, describe: kn, close: On, flush: () => Fn, sync: () => Gn, end: () => Qn, copyData: Un, copyDone: () => _n, copyFail: Vn, cancel: Nn };
u$1();
u$1();
var Pe$1 = { text: 0, binary: 1 };
u$1();
var vn = new ArrayBuffer(0), R, w$1, ce$2, le$1, te, ue$2 = class ue2 {
  constructor(t2 = 0) {
    R$1(this, R, new DataView(vn));
    R$1(this, w$1);
    R$1(this, ce$2, "utf-8");
    R$1(this, le$1, new TextDecoder(h$1(this, ce$2)));
    R$1(this, te, false);
    x$2(this, w$1, t2);
  }
  setBuffer(t2, n2) {
    x$2(this, w$1, t2), x$2(this, R, new DataView(n2));
  }
  int16() {
    let t2 = h$1(this, R).getInt16(h$1(this, w$1), h$1(this, te));
    return x$2(this, w$1, h$1(this, w$1) + 2), t2;
  }
  byte() {
    let t2 = h$1(this, R).getUint8(h$1(this, w$1));
    return U$1(this, w$1)._++, t2;
  }
  int32() {
    let t2 = h$1(this, R).getInt32(h$1(this, w$1), h$1(this, te));
    return x$2(this, w$1, h$1(this, w$1) + 4), t2;
  }
  string(t2) {
    return h$1(this, le$1).decode(this.bytes(t2));
  }
  cstring() {
    let t2 = h$1(this, w$1), n2 = t2;
    for (; h$1(this, R).getUint8(n2++) !== 0; ) ;
    let s2 = this.string(n2 - t2 - 1);
    return x$2(this, w$1, n2), s2;
  }
  bytes(t2) {
    let n2 = h$1(this, R).buffer.slice(h$1(this, w$1), h$1(this, w$1) + t2);
    return x$2(this, w$1, h$1(this, w$1) + t2), new Uint8Array(n2);
  }
};
R = /* @__PURE__ */ new WeakMap(), w$1 = /* @__PURE__ */ new WeakMap(), ce$2 = /* @__PURE__ */ new WeakMap(), le$1 = /* @__PURE__ */ new WeakMap(), te = /* @__PURE__ */ new WeakMap();
var Le$1 = 1, Hn = 4, Xe$1 = Le$1 + Hn, Ze$1 = new ArrayBuffer(0);
var A, B$1, D$2, o$2, c$1, ke$1, et$1, tt$1, nt, rt$1, st$1, it, at$2, Oe, ot$1, ut, ct, lt, pt, dt, ft$1, mt, Ue$2, pe$1 = class pe2 {
  constructor() {
    R$1(this, c$1);
    R$1(this, A, new DataView(Ze$1));
    R$1(this, B$1, 0);
    R$1(this, D$2, 0);
    R$1(this, o$2, new ue$2());
  }
  parse(t2, n2) {
    T$1(this, c$1, et$1).call(this, ArrayBuffer.isView(t2) ? t2.buffer.slice(t2.byteOffset, t2.byteOffset + t2.byteLength) : t2);
    let s2 = h$1(this, D$2) + h$1(this, B$1), i2 = h$1(this, D$2);
    for (; i2 + Xe$1 <= s2; ) {
      let a2 = h$1(this, A).getUint8(i2), u2 = h$1(this, A).getUint32(i2 + Le$1, false), m2 = Le$1 + u2;
      if (m2 + i2 <= s2 && u2 > 0) {
        let l2;
        try {
          l2 = T$1(this, c$1, tt$1).call(this, i2 + Xe$1, a2, u2, h$1(this, A).buffer);
        } catch (E2) {
          throw T$1(this, c$1, ke$1).call(this), E2;
        }
        n2(l2), i2 += m2;
      } else break;
    }
    i2 === s2 ? T$1(this, c$1, ke$1).call(this) : (x$2(this, B$1, s2 - i2), x$2(this, D$2, i2));
  }
};
A = /* @__PURE__ */ new WeakMap(), B$1 = /* @__PURE__ */ new WeakMap(), D$2 = /* @__PURE__ */ new WeakMap(), o$2 = /* @__PURE__ */ new WeakMap(), c$1 = /* @__PURE__ */ new WeakSet(), ke$1 = function() {
  x$2(this, A, new DataView(Ze$1)), x$2(this, B$1, 0), x$2(this, D$2, 0);
}, et$1 = function(t2) {
  if (h$1(this, B$1) > 0) {
    let n2 = h$1(this, B$1) + t2.byteLength;
    if (n2 + h$1(this, D$2) > h$1(this, A).byteLength) {
      let i2;
      if (n2 <= h$1(this, A).byteLength && h$1(this, D$2) >= h$1(this, B$1)) i2 = h$1(this, A).buffer;
      else {
        let a2 = h$1(this, A).byteLength * 2;
        for (; n2 >= a2; ) a2 *= 2;
        i2 = new ArrayBuffer(a2);
      }
      new Uint8Array(i2).set(new Uint8Array(h$1(this, A).buffer, h$1(this, D$2), h$1(this, B$1))), x$2(this, A, new DataView(i2)), x$2(this, D$2, 0);
    }
    new Uint8Array(h$1(this, A).buffer).set(new Uint8Array(t2), h$1(this, D$2) + h$1(this, B$1)), x$2(this, B$1, n2);
  } else x$2(this, A, new DataView(t2)), x$2(this, D$2, 0), x$2(this, B$1, t2.byteLength);
}, tt$1 = function(t2, n2, s2, i2) {
  switch (n2) {
    case 50:
      return De$1;
    case 49:
      return Be$2;
    case 51:
      return Ie$2;
    case 110:
      return xe$2;
    case 115:
      return Me$2;
    case 99:
      return Ce$2;
    case 87:
      return Re$2;
    case 73:
      return Ee$1;
    case 68:
      return T$1(this, c$1, pt).call(this, t2, s2, i2);
    case 67:
      return T$1(this, c$1, rt$1).call(this, t2, s2, i2);
    case 90:
      return T$1(this, c$1, nt).call(this, t2, s2, i2);
    case 65:
      return T$1(this, c$1, ot$1).call(this, t2, s2, i2);
    case 82:
      return T$1(this, c$1, mt).call(this, t2, s2, i2);
    case 83:
      return T$1(this, c$1, dt).call(this, t2, s2, i2);
    case 75:
      return T$1(this, c$1, ft$1).call(this, t2, s2, i2);
    case 69:
      return T$1(this, c$1, Ue$2).call(this, t2, s2, i2, "error");
    case 78:
      return T$1(this, c$1, Ue$2).call(this, t2, s2, i2, "notice");
    case 84:
      return T$1(this, c$1, ut).call(this, t2, s2, i2);
    case 116:
      return T$1(this, c$1, lt).call(this, t2, s2, i2);
    case 71:
      return T$1(this, c$1, it).call(this, t2, s2, i2);
    case 72:
      return T$1(this, c$1, at$2).call(this, t2, s2, i2);
    case 100:
      return T$1(this, c$1, st$1).call(this, t2, s2, i2);
    default:
      return new N$1("received invalid response: " + n2.toString(16), s2, "error");
  }
}, nt = function(t2, n2, s2) {
  h$1(this, o$2).setBuffer(t2, s2);
  let i2 = h$1(this, o$2).string(1);
  return new $$1(n2, i2);
}, rt$1 = function(t2, n2, s2) {
  h$1(this, o$2).setBuffer(t2, s2);
  let i2 = h$1(this, o$2).cstring();
  return new X(n2, i2);
}, st$1 = function(t2, n2, s2) {
  let i2 = s2.slice(t2, t2 + (n2 - 4));
  return new H$1(n2, new Uint8Array(i2));
}, it = function(t2, n2, s2) {
  return T$1(this, c$1, Oe).call(this, t2, n2, s2, "copyInResponse");
}, at$2 = function(t2, n2, s2) {
  return T$1(this, c$1, Oe).call(this, t2, n2, s2, "copyOutResponse");
}, Oe = function(t2, n2, s2, i2) {
  h$1(this, o$2).setBuffer(t2, s2);
  let a2 = h$1(this, o$2).byte() !== 0, u2 = h$1(this, o$2).int16(), m2 = new z$2(n2, i2, a2, u2);
  for (let l2 = 0; l2 < u2; l2++) m2.columnTypes[l2] = h$1(this, o$2).int16();
  return m2;
}, ot$1 = function(t2, n2, s2) {
  h$1(this, o$2).setBuffer(t2, s2);
  let i2 = h$1(this, o$2).int32(), a2 = h$1(this, o$2).cstring(), u2 = h$1(this, o$2).cstring();
  return new J$1(n2, i2, a2, u2);
}, ut = function(t2, n2, s2) {
  h$1(this, o$2).setBuffer(t2, s2);
  let i2 = h$1(this, o$2).int16(), a2 = new Y$1(n2, i2);
  for (let u2 = 0; u2 < i2; u2++) a2.fields[u2] = T$1(this, c$1, ct).call(this);
  return a2;
}, ct = function() {
  let t2 = h$1(this, o$2).cstring(), n2 = h$1(this, o$2).int32(), s2 = h$1(this, o$2).int16(), i2 = h$1(this, o$2).int32(), a2 = h$1(this, o$2).int16(), u2 = h$1(this, o$2).int32(), m2 = h$1(this, o$2).int16() === 0 ? Pe$1.text : Pe$1.binary;
  return new q(t2, n2, s2, i2, a2, u2, m2);
}, lt = function(t2, n2, s2) {
  h$1(this, o$2).setBuffer(t2, s2);
  let i2 = h$1(this, o$2).int16(), a2 = new j(n2, i2);
  for (let u2 = 0; u2 < i2; u2++) a2.dataTypeIDs[u2] = h$1(this, o$2).int32();
  return a2;
}, pt = function(t2, n2, s2) {
  h$1(this, o$2).setBuffer(t2, s2);
  let i2 = h$1(this, o$2).int16(), a2 = new Array(i2);
  for (let u2 = 0; u2 < i2; u2++) {
    let m2 = h$1(this, o$2).int32();
    a2[u2] = m2 === -1 ? null : h$1(this, o$2).string(m2);
  }
  return new Z(n2, a2);
}, dt = function(t2, n2, s2) {
  h$1(this, o$2).setBuffer(t2, s2);
  let i2 = h$1(this, o$2).cstring(), a2 = h$1(this, o$2).cstring();
  return new W$2(n2, i2, a2);
}, ft$1 = function(t2, n2, s2) {
  h$1(this, o$2).setBuffer(t2, s2);
  let i2 = h$1(this, o$2).int32(), a2 = h$1(this, o$2).int32();
  return new K(n2, i2, a2);
}, mt = function(t2, n2, s2) {
  h$1(this, o$2).setBuffer(t2, s2);
  let i2 = h$1(this, o$2).int32();
  switch (i2) {
    case 0:
      return new V(n2);
    case 3:
      return new F(n2);
    case 5:
      return new G$2(n2, h$1(this, o$2).bytes(4));
    case 10: {
      let a2 = [];
      for (; ; ) {
        let u2 = h$1(this, o$2).cstring();
        if (u2.length === 0) return new Q(n2, a2);
        a2.push(u2);
      }
    }
    case 11:
      return new _$1(n2, h$1(this, o$2).string(n2 - 8));
    case 12:
      return new v$2(n2, h$1(this, o$2).string(n2 - 8));
    default:
      throw new Error("Unknown authenticationOk message type " + i2);
  }
}, Ue$2 = function(t2, n2, s2, i2) {
  h$1(this, o$2).setBuffer(t2, s2);
  let a2 = {}, u2 = h$1(this, o$2).string(1);
  for (; u2 !== "\0"; ) a2[u2] = h$1(this, o$2).cstring(), u2 = h$1(this, o$2).string(1);
  let m2 = a2.M, l2 = i2 === "notice" ? new ee$1(n2, m2) : new N$1(m2, n2, i2);
  return l2.severity = a2.S, l2.code = a2.C, l2.detail = a2.D, l2.hint = a2.H, l2.position = a2.P, l2.internalPosition = a2.p, l2.internalQuery = a2.q, l2.where = a2.W, l2.schema = a2.s, l2.table = a2.t, l2.column = a2.c, l2.dataType = a2.d, l2.constraint = a2.n, l2.file = a2.F, l2.line = a2.L, l2.routine = a2.R, l2;
};
u$1();
var o$1 = { part: "part", container: "container" };
function s$1(t2, r, ...e) {
  let a2 = t2.length - 1, p2 = e.length - 1;
  if (p2 !== -1) {
    if (p2 === 0) {
      t2[a2] = t2[a2] + e[0] + r;
      return;
    }
    t2[a2] = t2[a2] + e[0], t2.push(...e.slice(1, p2)), t2.push(e[p2] + r);
  }
}
function y$2(t2, ...r) {
  let e = [t2[0]];
  e.raw = [t2.raw[0]];
  let a2 = [];
  for (let p2 = 0; p2 < r.length; p2++) {
    let n2 = r[p2], i2 = p2 + 1;
    if (n2?._templateType === o$1.part) {
      s$1(e, t2[i2], n2.str), s$1(e.raw, t2.raw[i2], n2.str);
      continue;
    }
    if (n2?._templateType === o$1.container) {
      s$1(e, t2[i2], ...n2.strings), s$1(e.raw, t2.raw[i2], ...n2.strings.raw), a2.push(...n2.values);
      continue;
    }
    e.push(t2[i2]), e.raw.push(t2.raw[i2]), a2.push(n2);
  }
  return { _templateType: "container", strings: e, values: a2 };
}
function g(t2, ...r) {
  let { strings: e, values: a2 } = y$2(t2, ...r);
  return { query: [e[0], ...a2.flatMap((p2, n2) => [`$${n2 + 1}`, e[n2 + 1]])].join(""), params: a2 };
}
u$1();
u$1();
function E(h2) {
  let s2 = h2.e;
  return s2.query = h2.query, s2.params = h2.params, s2.queryOptions = h2.options, s2;
}
var P, p$1, t, y$1, x$1, m$1, _, z$1 = class z3 {
  constructor() {
    R$1(this, t);
    this.serializers = { ...cn };
    this.parsers = { ...un };
    R$1(this, P, false);
    R$1(this, p$1, false);
  }
  async _initArrayTypes({ force: s2 = false } = {}) {
    if (h$1(this, P) && !s2) return;
    x$2(this, P, true);
    let e = await this.query(`
      SELECT b.oid, b.typarray
      FROM pg_catalog.pg_type a
      LEFT JOIN pg_catalog.pg_type b ON b.oid = a.typelem
      WHERE a.typcategory = 'A'
      GROUP BY b.oid, b.typarray
      ORDER BY b.oid
    `);
    for (let r of e.rows) this.serializers[r.typarray] = (o2) => We$2(o2, this.serializers[r.oid], r.typarray), this.parsers[r.typarray] = (o2) => mn(o2, this.parsers[r.oid], r.typarray);
  }
  async refreshArrayTypes() {
    await this._initArrayTypes({ force: true });
  }
  async query(s2, e, r) {
    return await this._checkReady(), await this._runExclusiveTransaction(async () => await T$1(this, t, x$1).call(this, s2, e, r));
  }
  async sql(s2, ...e) {
    let { query: r, params: o2 } = g(s2, ...e);
    return await this.query(r, o2);
  }
  async exec(s2, e) {
    return await this._checkReady(), await this._runExclusiveTransaction(async () => await T$1(this, t, m$1).call(this, s2, e));
  }
  async describeQuery(s2, e) {
    let r = [];
    try {
      await T$1(this, t, y$1).call(this, $e$1.parse({ text: s2, types: e?.paramTypes }), e), r = await T$1(this, t, y$1).call(this, $e$1.describe({ type: "S" }), e);
    } catch (n2) {
      throw n2 instanceof N$1 ? E({ e: n2, options: e, params: void 0, query: s2 }) : n2;
    } finally {
      r.push(...await T$1(this, t, y$1).call(this, $e$1.sync(), e));
    }
    let o2 = r.find((n2) => n2.name === "parameterDescription"), i2 = r.find((n2) => n2.name === "rowDescription"), c2 = o2?.dataTypeIDs.map((n2) => ({ dataTypeID: n2, serializer: this.serializers[n2] })) ?? [], u2 = i2?.fields.map((n2) => ({ name: n2.name, dataTypeID: n2.dataTypeID, parser: this.parsers[n2.dataTypeID] })) ?? [];
    return { queryParams: c2, resultFields: u2 };
  }
  async transaction(s2) {
    return await this._checkReady(), await this._runExclusiveTransaction(async () => {
      await T$1(this, t, m$1).call(this, "BEGIN"), x$2(this, p$1, true);
      let e = false, r = () => {
        if (e) throw new Error("Transaction is closed");
      }, o2 = { query: async (i2, c2, u2) => (r(), await T$1(this, t, x$1).call(this, i2, c2, u2)), sql: async (i2, ...c2) => {
        r();
        let { query: u2, params: n2 } = g(i2, ...c2);
        return await T$1(this, t, x$1).call(this, u2, n2);
      }, exec: async (i2, c2) => (r(), await T$1(this, t, m$1).call(this, i2, c2)), rollback: async () => {
        r(), await T$1(this, t, m$1).call(this, "ROLLBACK"), e = true;
      }, listen: async (i2, c2) => (r(), await this.listen(i2, c2, o2)), get closed() {
        return e;
      } };
      try {
        let i2 = await s2(o2);
        return e || (e = true, await T$1(this, t, m$1).call(this, "COMMIT")), x$2(this, p$1, false), i2;
      } catch (i2) {
        throw e || (e = true, await T$1(this, t, m$1).call(this, "ROLLBACK")), x$2(this, p$1, false), i2;
      }
    });
  }
  async runExclusive(s2) {
    return await this._runExclusiveQuery(s2);
  }
};
P = /* @__PURE__ */ new WeakMap(), p$1 = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakSet(), y$1 = async function(s2, e = {}) {
  return await this.execProtocolStream(s2, { ...e, syncToFs: false });
}, x$1 = async function(s2, e = [], r) {
  return await this._runExclusiveQuery(async () => {
    T$1(this, t, _).call(this, "runQuery", s2, e, r), await this._handleBlob(r?.blob);
    let o2 = [];
    try {
      let c2 = await T$1(this, t, y$1).call(this, $e$1.parse({ text: s2, types: r?.paramTypes }), r), u2 = bn(await T$1(this, t, y$1).call(this, $e$1.describe({ type: "S" }), r)), n2 = e.map((b2, k2) => {
        let D2 = u2[k2];
        if (b2 == null) return null;
        let v3 = r?.serializers?.[D2] ?? this.serializers[D2];
        return v3 ? v3(b2) : b2.toString();
      });
      o2 = [...c2, ...await T$1(this, t, y$1).call(this, $e$1.bind({ values: n2 }), r), ...await T$1(this, t, y$1).call(this, $e$1.describe({ type: "P" }), r), ...await T$1(this, t, y$1).call(this, $e$1.execute({}), r)];
    } catch (c2) {
      throw c2 instanceof N$1 ? E({ e: c2, options: r, params: e, query: s2 }) : c2;
    } finally {
      o2.push(...await T$1(this, t, y$1).call(this, $e$1.sync(), r));
    }
    await this._cleanupBlob(), h$1(this, p$1) || await this.syncToFs();
    let i2 = await this._getWrittenBlob();
    return hn(o2, this.parsers, r, i2)[0];
  });
}, m$1 = async function(s2, e) {
  return await this._runExclusiveQuery(async () => {
    T$1(this, t, _).call(this, "runExec", s2, e), await this._handleBlob(e?.blob);
    let r = [];
    try {
      r = await T$1(this, t, y$1).call(this, $e$1.query(s2), e);
    } catch (i2) {
      throw i2 instanceof N$1 ? E({ e: i2, options: e, params: void 0, query: s2 }) : i2;
    } finally {
      r.push(...await T$1(this, t, y$1).call(this, $e$1.sync(), e));
    }
    this._cleanupBlob(), h$1(this, p$1) || await this.syncToFs();
    let o2 = await this._getWrittenBlob();
    return hn(r, this.parsers, e, o2);
  });
}, _ = function(...s2) {
  this.debug > 0 && console.log(...s2);
};
u$1();
var d = Object.defineProperty, f = (t2, e) => {
  for (var r in e) d(t2, r, { get: e[r], enumerable: true });
}, p = {};
f(p, { IN_NODE: () => s, WASM_PREFIX: () => m, getFsBundle: () => w, instantiateWasm: () => b, pgliteProc: () => y, rmdirRecursive: () => u, startArtifactDownload: () => c, toPostgresName: () => v$1, uuid: () => S });
function h() {
  let t2 = process.type;
  return t2 === "renderer" || t2 === "worker" || t2 === "service-worker";
}
var s = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string" && !h(), m = "/pglite", y = globalThis && typeof globalThis.process < "u" ? globalThis.process : { exitCode: void 0 }, a = /* @__PURE__ */ new Map();
async function c(t2) {
  s || a.has(t2.toString()) || a.set(t2.toString(), fetch(t2));
}
var o = /* @__PURE__ */ new Map();
async function b(t2, e, r) {
  if (r || o.has(e.toString())) {
    let i2 = r || o.get(e.toString());
    return { instance: await WebAssembly.instantiate(i2, t2), module: i2 };
  }
  if (s) {
    let i2 = await (await import("fs/promises")).readFile(e), { module: n2, instance: l2 } = await WebAssembly.instantiate(i2, t2);
    return o.set(e.toString(), n2), { instance: l2, module: n2 };
  } else {
    a.has(e.toString()) || c(e);
    let i2 = await a.get(e.toString()), { module: n2, instance: l2 } = await WebAssembly.instantiateStreaming(i2.clone(), t2);
    return o.set(e.toString(), n2), { instance: l2, module: n2 };
  }
}
async function w(t2) {
  return s ? (await (await import("fs/promises")).readFile(t2)).buffer : (c(t2), (await a.get(t2.toString())).clone().arrayBuffer());
}
var S = () => {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  let t2 = new Uint8Array(16);
  if (globalThis.crypto?.getRandomValues) globalThis.crypto.getRandomValues(t2);
  else for (let r = 0; r < t2.length; r++) t2[r] = Math.floor(Math.random() * 256);
  t2[6] = t2[6] & 15 | 64, t2[8] = t2[8] & 63 | 128;
  let e = [];
  return t2.forEach((r) => {
    e.push(r.toString(16).padStart(2, "0"));
  }), e.slice(0, 4).join("") + "-" + e.slice(4, 6).join("") + "-" + e.slice(6, 8).join("") + "-" + e.slice(8, 10).join("") + "-" + e.slice(10).join("");
};
function v$1(t2) {
  let e;
  return t2.startsWith('"') && t2.endsWith('"') ? e = t2.substring(1, t2.length - 1) : e = t2.toLowerCase(), e;
}
function u(t2, e) {
  try {
    let r = t2.readdir(e).filter((i2) => i2 !== "." && i2 !== "..");
    for (let i2 of r) {
      let n2 = e + "/" + i2;
      try {
        t2.readdir(n2), u(t2, n2);
      } catch {
        t2.unlink(n2);
      }
    }
    t2.rmdir(e);
  } catch {
    try {
      t2.unlink(e);
    } catch {
    }
  }
}
var Y = D$3((Xr, M) => {
  u$1();
  var me2 = 9007199254740991, pe3 = /* @__PURE__ */ (function(e) {
    return e;
  })();
  function $e2(e) {
    return e === pe3;
  }
  function Se2(e) {
    return typeof e == "string" || Object.prototype.toString.call(e) == "[object String]";
  }
  function Ke2(e) {
    return Object.prototype.toString.call(e) == "[object Date]";
  }
  function q2(e) {
    return e !== null && typeof e == "object";
  }
  function $3(e) {
    return typeof e == "function";
  }
  function Je2(e) {
    return typeof e == "number" && e > -1 && e % 1 == 0 && e <= me2;
  }
  function Qe2(e) {
    return Object.prototype.toString.call(e) == "[object Array]";
  }
  function Ee2(e) {
    return q2(e) && !$3(e) && Je2(e.length);
  }
  function te2(e) {
    return Object.prototype.toString.call(e) == "[object ArrayBuffer]";
  }
  function Ze2(e, r) {
    return Array.prototype.map.call(e, r);
  }
  function er(e, r) {
    var t2 = pe3;
    return $3(r) && Array.prototype.every.call(e, function(n2, o2, a2) {
      var s2 = r(n2, o2, a2);
      return s2 && (t2 = n2), !s2;
    }), t2;
  }
  function rr(e) {
    return Object.assign.apply(null, arguments);
  }
  function ge2(e) {
    var r, t2, n2;
    if (Se2(e)) {
      for (t2 = e.length, n2 = new Uint8Array(t2), r = 0; r < t2; r++) n2[r] = e.charCodeAt(r) & 255;
      return n2;
    }
    return te2(e) ? new Uint8Array(e) : q2(e) && te2(e.buffer) ? new Uint8Array(e.buffer) : Ee2(e) ? new Uint8Array(e) : q2(e) && $3(e.toString) ? ge2(e.toString()) : new Uint8Array();
  }
  M.exports.MAX_SAFE_INTEGER = me2;
  M.exports.isUndefined = $e2;
  M.exports.isString = Se2;
  M.exports.isObject = q2;
  M.exports.isDateTime = Ke2;
  M.exports.isFunction = $3;
  M.exports.isArray = Qe2;
  M.exports.isArrayLike = Ee2;
  M.exports.isArrayBuffer = te2;
  M.exports.map = Ze2;
  M.exports.find = er;
  M.exports.extend = rr;
  M.exports.toUint8Array = ge2;
});
var W$1 = D$3(($r, ve2) => {
  u$1();
  var ne2 = "\0";
  ve2.exports = { NULL_CHAR: ne2, TMAGIC: "ustar" + ne2 + "00", OLDGNU_MAGIC: "ustar  " + ne2, REGTYPE: 0, LNKTYPE: 1, SYMTYPE: 2, CHRTYPE: 3, BLKTYPE: 4, DIRTYPE: 5, FIFOTYPE: 6, CONTTYPE: 7, TSUID: parseInt("4000", 8), TSGID: parseInt("2000", 8), TSVTX: parseInt("1000", 8), TUREAD: parseInt("0400", 8), TUWRITE: parseInt("0200", 8), TUEXEC: parseInt("0100", 8), TGREAD: parseInt("0040", 8), TGWRITE: parseInt("0020", 8), TGEXEC: parseInt("0010", 8), TOREAD: parseInt("0004", 8), TOWRITE: parseInt("0002", 8), TOEXEC: parseInt("0001", 8), TPERMALL: parseInt("0777", 8), TPERMMASK: parseInt("0777", 8) };
});
var ie$1 = D$3((Jr, P2) => {
  u$1();
  var ye2 = Y(), T2 = W$1(), tr = 512, oe2 = T2.TPERMALL, Fe2 = 0, he2 = 0, ae2 = [["name", 100, 0, function(e, r) {
    return V2(e[r[0]], r[1]);
  }, function(e, r, t2) {
    return L2(e.slice(r, r + t2[1]));
  }], ["mode", 8, 100, function(e, r) {
    var t2 = e[r[0]] || oe2;
    return t2 = t2 & T2.TPERMMASK, j2(t2, r[1], oe2);
  }, function(e, r, t2) {
    var n2 = x2(e.slice(r, r + t2[1]));
    return n2 &= T2.TPERMMASK, n2;
  }], ["uid", 8, 108, function(e, r) {
    return j2(e[r[0]], r[1], Fe2);
  }, function(e, r, t2) {
    return x2(e.slice(r, r + t2[1]));
  }], ["gid", 8, 116, function(e, r) {
    return j2(e[r[0]], r[1], he2);
  }, function(e, r, t2) {
    return x2(e.slice(r, r + t2[1]));
  }], ["size", 12, 124, function(e, r) {
    return j2(e.data.length, r[1]);
  }, function(e, r, t2) {
    return x2(e.slice(r, r + t2[1]));
  }], ["modifyTime", 12, 136, function(e, r) {
    return K2(e[r[0]], r[1]);
  }, function(e, r, t2) {
    return J3(e.slice(r, r + t2[1]));
  }], ["checksum", 8, 148, function(e, r) {
    return "        ";
  }, function(e, r, t2) {
    return x2(e.slice(r, r + t2[1]));
  }], ["type", 1, 156, function(e, r) {
    return "" + (parseInt(e[r[0]], 10) || 0) % 8;
  }, function(e, r, t2) {
    return (parseInt(String.fromCharCode(e[r]), 10) || 0) % 8;
  }], ["linkName", 100, 157, function(e, r) {
    return "";
  }, function(e, r, t2) {
    return L2(e.slice(r, r + t2[1]));
  }], ["ustar", 8, 257, function(e, r) {
    return T2.TMAGIC;
  }, function(e, r, t2) {
    return nr(L2(e.slice(r, r + t2[1]), true));
  }, function(e, r) {
    return e[r[0]] == T2.TMAGIC || e[r[0]] == T2.OLDGNU_MAGIC;
  }], ["owner", 32, 265, function(e, r) {
    return V2(e[r[0]], r[1]);
  }, function(e, r, t2) {
    return L2(e.slice(r, r + t2[1]));
  }], ["group", 32, 297, function(e, r) {
    return V2(e[r[0]], r[1]);
  }, function(e, r, t2) {
    return L2(e.slice(r, r + t2[1]));
  }], ["majorNumber", 8, 329, function(e, r) {
    return "";
  }, function(e, r, t2) {
    return x2(e.slice(r, r + t2[1]));
  }], ["minorNumber", 8, 337, function(e, r) {
    return "";
  }, function(e, r, t2) {
    return x2(e.slice(r, r + t2[1]));
  }], ["prefix", 131, 345, function(e, r) {
    return V2(e[r[0]], r[1]);
  }, function(e, r, t2) {
    return L2(e.slice(r, r + t2[1]));
  }], ["accessTime", 12, 476, function(e, r) {
    return K2(e[r[0]], r[1]);
  }, function(e, r, t2) {
    return J3(e.slice(r, r + t2[1]));
  }], ["createTime", 12, 488, function(e, r) {
    return K2(e[r[0]], r[1]);
  }, function(e, r, t2) {
    return J3(e.slice(r, r + t2[1]));
  }]], we2 = (function(e) {
    var r = e[e.length - 1];
    return r[2] + r[1];
  })(ae2);
  function nr(e) {
    if (e.length == 8) {
      var r = e.split("");
      if (r[5] == T2.NULL_CHAR) return (r[6] == " " || r[6] == T2.NULL_CHAR) && (r[6] = "0"), (r[7] == " " || r[7] == T2.NULL_CHAR) && (r[7] = "0"), r = r.join(""), r == T2.TMAGIC ? r : e;
      if (r[7] == T2.NULL_CHAR) return r[5] == T2.NULL_CHAR && (r[5] = " "), r[6] == T2.NULL_CHAR && (r[6] = " "), r == T2.OLDGNU_MAGIC ? r : e;
    }
    return e;
  }
  function V2(e, r) {
    return r -= 1, ye2.isUndefined(e) && (e = ""), e = ("" + e).substr(0, r), e + T2.NULL_CHAR;
  }
  function j2(e, r, t2) {
    for (t2 = parseInt(t2) || 0, r -= 1, e = (parseInt(e) || t2).toString(8).substr(-r, r); e.length < r; ) e = "0" + e;
    return e + T2.NULL_CHAR;
  }
  function K2(e, r) {
    if (ye2.isDateTime(e)) e = Math.floor(1 * e / 1e3);
    else if (e = parseInt(e, 10), isFinite(e)) {
      if (e <= 0) return "";
    } else e = Math.floor(1 * /* @__PURE__ */ new Date() / 1e3);
    return j2(e, r, 0);
  }
  function L2(e, r) {
    var t2 = String.fromCharCode.apply(null, e);
    if (r) return t2;
    var n2 = t2.indexOf(T2.NULL_CHAR);
    return n2 >= 0 ? t2.substr(0, n2) : t2;
  }
  function x2(e) {
    var r = String.fromCharCode.apply(null, e);
    return parseInt(r.replace(/^0+$/g, ""), 8) || 0;
  }
  function J3(e) {
    return e.length == 0 || e[0] == 0 ? null : new Date(1e3 * x2(e));
  }
  function or(e, r, t2) {
    var n2 = parseInt(r, 10) || 0, o2 = Math.min(n2 + we2, e.length), a2 = 0, s2 = 0, l2 = 0;
    t2 && ae2.every(function(p2) {
      return p2[0] == "checksum" ? (s2 = n2 + p2[2], l2 = s2 + p2[1], false) : true;
    });
    for (var u2 = 32, d2 = n2; d2 < o2; d2++) {
      var c2 = d2 >= s2 && d2 < l2 ? u2 : e[d2];
      a2 = (a2 + c2) % 262144;
    }
    return a2;
  }
  P2.exports.recordSize = tr;
  P2.exports.defaultFileMode = oe2;
  P2.exports.defaultUid = Fe2;
  P2.exports.defaultGid = he2;
  P2.exports.posixHeader = ae2;
  P2.exports.effectiveHeaderSize = we2;
  P2.exports.calculateChecksum = or;
  P2.exports.formatTarString = V2;
  P2.exports.formatTarNumber = j2;
  P2.exports.formatTarDateTime = K2;
  P2.exports.parseTarString = L2;
  P2.exports.parseTarNumber = x2;
  P2.exports.parseTarDateTime = J3;
});
var Me$1 = D$3((Zr, Te2) => {
  u$1();
  var ar = W$1(), Q2 = Y(), H3 = ie$1();
  function Ae2(e) {
    return H3.recordSize;
  }
  function be2(e) {
    return Math.ceil(e.data.length / H3.recordSize) * H3.recordSize;
  }
  function ir(e) {
    var r = 0;
    return e.forEach(function(t2) {
      r += Ae2() + be2(t2);
    }), r += H3.recordSize * 2, new Uint8Array(r);
  }
  function sr(e, r, t2) {
    t2 = parseInt(t2) || 0;
    var n2 = t2;
    H3.posixHeader.forEach(function(u2) {
      for (var d2 = u2[3](r, u2), c2 = d2.length, p2 = 0; p2 < c2; p2 += 1) e[n2 + p2] = d2.charCodeAt(p2) & 255;
      n2 += u2[1];
    });
    var o2 = Q2.find(H3.posixHeader, function(u2) {
      return u2[0] == "checksum";
    });
    if (o2) {
      var a2 = H3.calculateChecksum(e, t2, true), s2 = H3.formatTarNumber(a2, o2[1] - 2) + ar.NULL_CHAR + " ";
      n2 = t2 + o2[2];
      for (var l2 = 0; l2 < s2.length; l2 += 1) e[n2] = s2.charCodeAt(l2) & 255, n2++;
    }
    return t2 + Ae2();
  }
  function lr(e, r, t2) {
    return t2 = parseInt(t2, 10) || 0, e.set(r.data, t2), t2 + be2(r);
  }
  function ur(e) {
    e = Q2.map(e, function(n2) {
      return Q2.extend({}, n2, { data: Q2.toUint8Array(n2.data) });
    });
    var r = ir(e), t2 = 0;
    return e.forEach(function(n2) {
      t2 = sr(r, n2, t2), t2 = lr(r, n2, t2);
    }), r;
  }
  Te2.exports.tar = ur;
});
var ke = D$3((rt2, Pe2) => {
  u$1();
  var dr = W$1(), le2 = Y(), N4 = ie$1(), cr = { extractData: true, checkHeader: true, checkChecksum: true, checkFileSize: true }, _r = { size: true, checksum: true, ustar: true }, se2 = { unexpectedEndOfFile: "Unexpected end of file.", fileCorrupted: "File is corrupted.", checksumCheckFailed: "Checksum check failed." };
  function fr(e) {
    return N4.recordSize;
  }
  function mr(e) {
    return Math.ceil(e / N4.recordSize) * N4.recordSize;
  }
  function pr(e, r) {
    for (var t2 = r, n2 = Math.min(e.length, r + N4.recordSize * 2), o2 = t2; o2 < n2; o2++) if (e[o2] != 0) return false;
    return true;
  }
  function Sr(e, r, t2) {
    if (e.length - r < N4.recordSize) {
      if (t2.checkFileSize) throw new Error(se2.unexpectedEndOfFile);
      return null;
    }
    r = parseInt(r) || 0;
    var n2 = {}, o2 = r;
    if (N4.posixHeader.forEach(function(l2) {
      n2[l2[0]] = l2[4](e, o2, l2), o2 += l2[1];
    }), n2.type != 0 && (n2.size = 0), t2.checkHeader && N4.posixHeader.forEach(function(l2) {
      if (le2.isFunction(l2[5]) && !l2[5](n2, l2)) {
        var u2 = new Error(se2.fileCorrupted);
        throw u2.data = { offset: r + l2[2], field: l2[0] }, u2;
      }
    }), t2.checkChecksum) {
      var a2 = N4.calculateChecksum(e, r, true);
      if (a2 != n2.checksum) {
        var s2 = new Error(se2.checksumCheckFailed);
        throw s2.data = { offset: r, header: n2, checksum: a2 }, s2;
      }
    }
    return n2;
  }
  function Er(e, r, t2, n2) {
    return n2.extractData ? t2.size <= 0 ? new Uint8Array() : e.slice(r, r + t2.size) : null;
  }
  function gr(e, r) {
    var t2 = {};
    return N4.posixHeader.forEach(function(n2) {
      var o2 = n2[0];
      _r[o2] || (t2[o2] = e[o2]);
    }), t2.isOldGNUFormat = e.ustar == dr.OLDGNU_MAGIC, r && (t2.data = r), t2;
  }
  function vr(e, r) {
    r = le2.extend({}, cr, r);
    for (var t2 = [], n2 = 0, o2 = e.length; o2 - n2 >= N4.recordSize; ) {
      e = le2.toUint8Array(e);
      var a2 = Sr(e, n2, r);
      if (!a2) break;
      n2 += fr();
      var s2 = Er(e, n2, a2, r);
      if (t2.push(gr(a2, s2)), n2 += mr(a2.size), pr(e, n2)) break;
    }
    return t2;
  }
  Pe2.exports.untar = vr;
});
var Re$1 = D$3((nt2, Oe2) => {
  u$1();
  var yr = Y(), Fr = W$1(), hr = Me$1(), wr = ke();
  yr.extend(Oe2.exports, hr, wr, Fr);
});
u$1();
u$1();
var D$1 = L$1(Re$1());
async function ue$1(e, r, t2 = "pgdata", n2 = "auto") {
  let o2 = Tr(e, r), [a2, s2] = await Mr(o2, n2), l2 = t2 + (s2 ? ".tar.gz" : ".tar"), u2 = s2 ? "application/x-gzip" : "application/x-tar";
  return typeof File < "u" ? new File([a2], l2, { type: u2 }) : new Blob([a2], { type: u2 });
}
var Ar = ["application/x-gtar", "application/x-tar+gzip", "application/x-gzip", "application/gzip"];
async function at$1(e, r, t2) {
  let n2 = new Uint8Array(await r.arrayBuffer()), o2 = typeof File < "u" && r instanceof File ? r.name : void 0;
  (Ar.includes(r.type) || o2?.endsWith(".tgz") || o2?.endsWith(".tar.gz")) && (n2 = await De(n2));
  let s2;
  try {
    s2 = (0, D$1.untar)(n2);
  } catch (l2) {
    if (l2 instanceof Error && l2.message.includes("File is corrupted")) n2 = await De(n2), s2 = (0, D$1.untar)(n2);
    else throw l2;
  }
  for (let l2 of s2) {
    let u2 = `${t2}/${l2.name}`, d2 = u2.split("/").slice(0, -1);
    for (let c2 = 1; c2 <= d2.length; c2++) {
      let p2 = d2.slice(0, c2).join("/");
      e.analyzePath(p2).exists || e.mkdir(p2);
    }
    l2.type === D$1.REGTYPE ? (e.writeFile(u2, l2.data), e.utime(u2, Ne(l2.modifyTime), Ne(l2.modifyTime))) : l2.type === D$1.DIRTYPE && (e.analyzePath(u2).exists || e.mkdir(u2));
  }
}
function br(e, r) {
  let t2 = [], n2 = (o2) => {
    e.readdir(o2).forEach((s2) => {
      if (s2 === "." || s2 === "..") return;
      let l2 = o2 + "/" + s2, u2 = e.stat(l2), d2 = e.isFile(u2.mode) ? e.readFile(l2, { encoding: "binary" }) : new Uint8Array(0);
      t2.push({ name: l2.substring(r.length), mode: u2.mode, size: u2.size, type: e.isFile(u2.mode) ? D$1.REGTYPE : D$1.DIRTYPE, modifyTime: u2.mtime, data: d2 }), e.isDir(u2.mode) && n2(l2);
    });
  };
  return n2(r), t2;
}
function Tr(e, r) {
  let t2 = br(e, r);
  return (0, D$1.tar)(t2);
}
async function Mr(e, r = "auto") {
  if (r === "none") return [e, false];
  if (typeof CompressionStream < "u") return [await Pr(e), true];
  if (typeof process < "u" && process.versions && process.versions.node) return [await kr(e), true];
  if (r === "auto") return [e, false];
  throw new Error("Compression not supported in this environment");
}
async function Pr(e) {
  let r = new CompressionStream("gzip"), t2 = r.writable.getWriter(), n2 = r.readable.getReader();
  t2.write(e), t2.close();
  let o2 = [];
  for (; ; ) {
    let { value: l2, done: u2 } = await n2.read();
    if (u2) break;
    l2 && o2.push(l2);
  }
  let a2 = new Uint8Array(o2.reduce((l2, u2) => l2 + u2.length, 0)), s2 = 0;
  return o2.forEach((l2) => {
    a2.set(l2, s2), s2 += l2.length;
  }), a2;
}
async function kr(e) {
  let { promisify: r } = await import("util"), { gzip: t2 } = await import("zlib");
  return await r(t2)(e);
}
async function De(e) {
  if (typeof CompressionStream < "u") return await Or(e);
  if (typeof process < "u" && process.versions && process.versions.node) return await Rr(e);
  throw new Error("Unsupported environment for decompression");
}
async function Or(e) {
  let r = new DecompressionStream("gzip"), t2 = r.writable.getWriter(), n2 = r.readable.getReader();
  t2.write(e), t2.close();
  let o2 = [];
  for (; ; ) {
    let { value: l2, done: u2 } = await n2.read();
    if (u2) break;
    l2 && o2.push(l2);
  }
  let a2 = new Uint8Array(o2.reduce((l2, u2) => l2 + u2.length, 0)), s2 = 0;
  return o2.forEach((l2) => {
    a2.set(l2, s2), s2 += l2.length;
  }), a2;
}
async function Rr(e) {
  let { promisify: r } = await import("util"), { gunzip: t2 } = await import("zlib");
  return await r(t2)(e);
}
function Ne(e) {
  return e ? typeof e == "number" ? e : Math.floor(e.getTime() / 1e3) : Math.floor(Date.now() / 1e3);
}
u$1();
u$1();
u$1();
var Dr = (() => {
  var _scriptName = import.meta.url;
  return async function(moduleArg = {}) {
    var moduleRtn, Module = moduleArg, readyPromiseResolve, readyPromiseReject, readyPromise = new Promise((e, r) => {
      readyPromiseResolve = e, readyPromiseReject = r;
    }), ENVIRONMENT_IS_WEB = typeof window == "object", ENVIRONMENT_IS_WORKER = typeof WorkerGlobalScope < "u", ENVIRONMENT_IS_NODE = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string" && process.type != "renderer";
    if (ENVIRONMENT_IS_NODE) {
      let { createRequire: e } = await import("module"), r = import.meta.url;
      r.startsWith("data:") && (r = "/");
      var require = e(r);
    }
    var moduleOverrides = Object.assign({}, Module), arguments_ = [], thisProgram = "./this.program", quit_ = (e, r) => {
      throw r;
    }, scriptDirectory = "";
    function locateFile(e) {
      return Module.locateFile ? Module.locateFile(e, scriptDirectory) : scriptDirectory + e;
    }
    var readAsync, readBinary;
    if (ENVIRONMENT_IS_NODE) {
      var fs = require("fs"), nodePath = require("path");
      import.meta.url.startsWith("data:") || (scriptDirectory = nodePath.dirname(require("url").fileURLToPath(import.meta.url)) + "/"), readBinary = (e) => {
        e = isFileURI(e) ? new URL(e) : e;
        var r = fs.readFileSync(e);
        return r;
      }, readAsync = async (e, r = true) => {
        e = isFileURI(e) ? new URL(e) : e;
        var t2 = fs.readFileSync(e, r ? void 0 : "utf8");
        return t2;
      }, !Module.thisProgram && process.argv.length > 1 && (thisProgram = process.argv[1].replace(/\\/g, "/")), arguments_ = process.argv.slice(2), quit_ = (e, r) => {
        throw process.exitCode = e, r;
      };
    } else (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && (ENVIRONMENT_IS_WORKER ? scriptDirectory = self.location.href : typeof document < "u" && document.currentScript && (scriptDirectory = document.currentScript.src), _scriptName && (scriptDirectory = _scriptName), scriptDirectory.startsWith("blob:") ? scriptDirectory = "" : scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1), ENVIRONMENT_IS_WORKER && (readBinary = (e) => {
      var r = new XMLHttpRequest();
      return r.open("GET", e, false), r.responseType = "arraybuffer", r.send(null), new Uint8Array(r.response);
    }), readAsync = async (e) => {
      var r = await fetch(e, { credentials: "same-origin" });
      if (r.ok) return r.arrayBuffer();
      throw new Error(r.status + " : " + r.url);
    });
    var out = Module.print || console.log.bind(console), err = Module.printErr || console.error.bind(console);
    Object.assign(Module, moduleOverrides), moduleOverrides = null, Module.arguments && (arguments_ = Module.arguments), Module.thisProgram && (thisProgram = Module.thisProgram);
    var dynamicLibraries = Module.dynamicLibraries || [], wasmBinary = Module.wasmBinary;
    var wasmMemory, ABORT = false, EXITSTATUS;
    function assert(e, r) {
      e || abort(r);
    }
    var HEAP8, HEAPU8, HEAP16, HEAP32, HEAPU32, HEAP64;
    function updateMemoryViews() {
      var e = wasmMemory.buffer;
      Module.HEAP8 = HEAP8 = new Int8Array(e), Module.HEAP16 = HEAP16 = new Int16Array(e), Module.HEAPU8 = HEAPU8 = new Uint8Array(e), Module.HEAPU16 = new Uint16Array(e), Module.HEAP32 = HEAP32 = new Int32Array(e), Module.HEAPU32 = HEAPU32 = new Uint32Array(e), Module.HEAPF32 = new Float32Array(e), Module.HEAPF64 = new Float64Array(e), Module.HEAP64 = HEAP64 = new BigInt64Array(e), Module.HEAPU64 = new BigUint64Array(e);
    }
    if (Module.wasmMemory) wasmMemory = Module.wasmMemory;
    else {
      var INITIAL_MEMORY = Module.INITIAL_MEMORY || 67108864;
      wasmMemory = new WebAssembly.Memory({ initial: INITIAL_MEMORY / 65536, maximum: 32768 });
    }
    updateMemoryViews();
    var __ATPRERUN__ = [], __ATINIT__ = [], __ATMAIN__ = [], __ATEXIT__ = [], __ATPOSTRUN__ = [], __RELOC_FUNCS__ = [], runtimeInitialized = false, runtimeExited = false;
    function preRun() {
      if (Module.preRun) for (typeof Module.preRun == "function" && (Module.preRun = [Module.preRun]); Module.preRun.length; ) addOnPreRun(Module.preRun.shift());
      callRuntimeCallbacks(__ATPRERUN__);
    }
    function initRuntime() {
      runtimeInitialized = true, callRuntimeCallbacks(__RELOC_FUNCS__), !Module.noFSInit && !FS.initialized && FS.init(), FS.ignorePermissions = false, callRuntimeCallbacks(__ATINIT__);
    }
    function preMain() {
      callRuntimeCallbacks(__ATMAIN__);
    }
    function exitRuntime() {
      ___funcs_on_exit(), callRuntimeCallbacks(__ATEXIT__), FS.quit(), runtimeExited = true;
    }
    function postRun() {
      if (Module.postRun) for (typeof Module.postRun == "function" && (Module.postRun = [Module.postRun]); Module.postRun.length; ) addOnPostRun(Module.postRun.shift());
      callRuntimeCallbacks(__ATPOSTRUN__);
    }
    function addOnPreRun(e) {
      __ATPRERUN__.unshift(e);
    }
    function addOnInit(e) {
      __ATINIT__.unshift(e);
    }
    function addOnPostRun(e) {
      __ATPOSTRUN__.unshift(e);
    }
    var runDependencies = 0, dependenciesFulfilled = null;
    function addRunDependency(e) {
      runDependencies++, Module.monitorRunDependencies?.(runDependencies);
    }
    function removeRunDependency(e) {
      if (runDependencies--, Module.monitorRunDependencies?.(runDependencies), runDependencies == 0 && dependenciesFulfilled) {
        var r = dependenciesFulfilled;
        dependenciesFulfilled = null, r();
      }
    }
    function abort(e) {
      Module.onAbort?.(e), e = "Aborted(" + e + ")", err(e), ABORT = true, e += ". Build with -sASSERTIONS for more info.";
      var r = new WebAssembly.RuntimeError(e);
      throw readyPromiseReject(r), r;
    }
    var dataURIPrefix = "data:application/octet-stream;base64,", isDataURI = (e) => e.startsWith(dataURIPrefix), isFileURI = (e) => e.startsWith("file://");
    function findWasmBinary() {
      if (Module.locateFile) {
        var e = "initdb.wasm";
        return isDataURI(e) ? e : locateFile(e);
      }
      return new URL("initdb.wasm", import.meta.url).href;
    }
    var wasmBinaryFile;
    function getBinarySync(e) {
      if (e == wasmBinaryFile && wasmBinary) return new Uint8Array(wasmBinary);
      if (readBinary) return readBinary(e);
      throw "both async and sync fetching of the wasm failed";
    }
    async function getWasmBinary(e) {
      if (!wasmBinary) try {
        var r = await readAsync(e);
        return new Uint8Array(r);
      } catch {
      }
      return getBinarySync(e);
    }
    async function instantiateArrayBuffer(e, r) {
      try {
        var t2 = await getWasmBinary(e), n2 = await WebAssembly.instantiate(t2, r);
        return n2;
      } catch (o2) {
        err(`failed to asynchronously prepare wasm: ${o2}`), abort(o2);
      }
    }
    async function instantiateAsync(e, r, t2) {
      if (!e && typeof WebAssembly.instantiateStreaming == "function" && !isDataURI(r) && !ENVIRONMENT_IS_NODE && typeof fetch == "function") try {
        var n2 = fetch(r, { credentials: "same-origin" }), o2 = await WebAssembly.instantiateStreaming(n2, t2);
        return o2;
      } catch (a2) {
        err(`wasm streaming compile failed: ${a2}`), err("falling back to ArrayBuffer instantiation");
      }
      return instantiateArrayBuffer(r, t2);
    }
    function getWasmImports() {
      return { env: wasmImports, wasi_snapshot_preview1: wasmImports, "GOT.mem": new Proxy(wasmImports, GOTHandler), "GOT.func": new Proxy(wasmImports, GOTHandler) };
    }
    async function createWasm() {
      function e(o2, a2) {
        wasmExports = o2.exports, wasmExports = relocateExports(wasmExports, 1024);
        var s2 = getDylinkMetadata(a2);
        return s2.neededDynlibs && (dynamicLibraries = s2.neededDynlibs.concat(dynamicLibraries)), mergeLibSymbols(wasmExports), LDSO.init(), loadDylibs(), addOnInit(wasmExports.__wasm_call_ctors), __RELOC_FUNCS__.push(wasmExports.__wasm_apply_data_relocs), removeRunDependency(), wasmExports;
      }
      addRunDependency();
      function r(o2) {
        e(o2.instance, o2.module);
      }
      var t2 = getWasmImports();
      if (Module.instantiateWasm) try {
        return Module.instantiateWasm(t2, e);
      } catch (o2) {
        err(`Module.instantiateWasm callback failed with error: ${o2}`), readyPromiseReject(o2);
      }
      wasmBinaryFile ?? (wasmBinaryFile = findWasmBinary());
      try {
        var n2 = await instantiateAsync(wasmBinary, wasmBinaryFile, t2);
        return r(n2), n2;
      } catch (o2) {
        readyPromiseReject(o2);
        return;
      }
    }
    class ExitStatus {
      constructor(r) {
        P$2(this, "name", "ExitStatus");
        this.message = `Program terminated with exit(${r})`, this.status = r;
      }
    }
    var GOT = {}, currentModuleWeakSymbols = /* @__PURE__ */ new Set([]), GOTHandler = { get(e, r) {
      var t2 = GOT[r];
      return t2 || (t2 = GOT[r] = new WebAssembly.Global({ value: "i32", mutable: true })), currentModuleWeakSymbols.has(r) || (t2.required = true), t2;
    } }, callRuntimeCallbacks = (e) => {
      for (; e.length > 0; ) e.shift()(Module);
    }, UTF8Decoder = typeof TextDecoder < "u" ? new TextDecoder() : void 0, UTF8ArrayToString = (e, r = 0, t2 = NaN) => {
      for (var n2 = r + t2, o2 = r; e[o2] && !(o2 >= n2); ) ++o2;
      if (o2 - r > 16 && e.buffer && UTF8Decoder) return UTF8Decoder.decode(e.subarray(r, o2));
      for (var a2 = ""; r < o2; ) {
        var s2 = e[r++];
        if (!(s2 & 128)) {
          a2 += String.fromCharCode(s2);
          continue;
        }
        var l2 = e[r++] & 63;
        if ((s2 & 224) == 192) {
          a2 += String.fromCharCode((s2 & 31) << 6 | l2);
          continue;
        }
        var u2 = e[r++] & 63;
        if ((s2 & 240) == 224 ? s2 = (s2 & 15) << 12 | l2 << 6 | u2 : s2 = (s2 & 7) << 18 | l2 << 12 | u2 << 6 | e[r++] & 63, s2 < 65536) a2 += String.fromCharCode(s2);
        else {
          var d2 = s2 - 65536;
          a2 += String.fromCharCode(55296 | d2 >> 10, 56320 | d2 & 1023);
        }
      }
      return a2;
    }, getDylinkMetadata = (e) => {
      var r = 0, t2 = 0;
      function n2() {
        return e[r++];
      }
      function o2() {
        for (var U2 = 0, X2 = 1; ; ) {
          var _e2 = e[r++];
          if (U2 += (_e2 & 127) * X2, X2 *= 128, !(_e2 & 128)) break;
        }
        return U2;
      }
      function a2() {
        var U2 = o2();
        return r += U2, UTF8ArrayToString(e, r - U2, U2);
      }
      function s2(U2, X2) {
        if (U2) throw new Error(X2);
      }
      var l2 = "dylink.0";
      if (e instanceof WebAssembly.Module) {
        var u2 = WebAssembly.Module.customSections(e, l2);
        u2.length === 0 && (l2 = "dylink", u2 = WebAssembly.Module.customSections(e, l2)), s2(u2.length === 0, "need dylink section"), e = new Uint8Array(u2[0]), t2 = e.length;
      } else {
        var d2 = new Uint32Array(new Uint8Array(e.subarray(0, 24)).buffer), c2 = d2[0] == 1836278016;
        s2(!c2, "need to see wasm magic number"), s2(e[8] !== 0, "need the dylink section to be first"), r = 9;
        var p2 = o2();
        t2 = r + p2, l2 = a2();
      }
      var f2 = { neededDynlibs: [], tlsExports: /* @__PURE__ */ new Set(), weakImports: /* @__PURE__ */ new Set() };
      if (l2 == "dylink") {
        f2.memorySize = o2(), f2.memoryAlign = o2(), f2.tableSize = o2(), f2.tableAlign = o2();
        for (var m2 = o2(), _3 = 0; _3 < m2; ++_3) {
          var g2 = a2();
          f2.neededDynlibs.push(g2);
        }
      } else {
        s2(l2 !== "dylink.0");
        for (var E2 = 1, y2 = 2, A2 = 3, S2 = 4, v3 = 256, h2 = 3, b2 = 1; r < t2; ) {
          var F2 = n2(), Xe2 = o2();
          if (F2 === E2) f2.memorySize = o2(), f2.memoryAlign = o2(), f2.tableSize = o2(), f2.tableAlign = o2();
          else if (F2 === y2) for (var m2 = o2(), _3 = 0; _3 < m2; ++_3) g2 = a2(), f2.neededDynlibs.push(g2);
          else if (F2 === A2) for (var Z2 = o2(); Z2--; ) {
            var ee3 = a2(), re = o2();
            re & v3 && f2.tlsExports.add(ee3);
          }
          else if (F2 === S2) for (var Z2 = o2(); Z2--; ) {
            a2();
            var ee3 = a2(), re = o2();
            (re & h2) == b2 && f2.weakImports.add(ee3);
          }
          else r += Xe2;
        }
      }
      return f2;
    }, newDSO = (e, r, t2) => {
      var n2 = { refcount: 1 / 0, name: e, exports: t2, global: true };
      return LDSO.loadedLibsByName[e] = n2, r != null && (LDSO.loadedLibsByHandle[r] = n2), n2;
    }, LDSO = { loadedLibsByName: {}, loadedLibsByHandle: {}, init() {
      newDSO("__main__", 0, wasmImports);
    } }, ___heap_base = 205904, alignMemory = (e, r) => Math.ceil(e / r) * r, getMemory = (e) => {
      if (runtimeInitialized) return _calloc(e, 1);
      var r = ___heap_base, t2 = r + alignMemory(e, 16);
      return ___heap_base = t2, GOT.__heap_base.value = t2, r;
    }, isInternalSym = (e) => ["__cpp_exception", "__c_longjmp", "__wasm_apply_data_relocs", "__dso_handle", "__tls_size", "__tls_align", "__set_stack_limits", "_emscripten_tls_init", "__wasm_init_tls", "__wasm_call_ctors", "__start_em_asm", "__stop_em_asm", "__start_em_js", "__stop_em_js"].includes(e) || e.startsWith("__em_js__"), uleb128Encode = (e, r) => {
      e < 128 ? r.push(e) : r.push(e % 128 | 128, e >> 7);
    }, sigToWasmTypes = (e) => {
      for (var r = { i: "i32", j: "i64", f: "f32", d: "f64", e: "externref", p: "i32" }, t2 = { parameters: [], results: e[0] == "v" ? [] : [r[e[0]]] }, n2 = 1; n2 < e.length; ++n2) t2.parameters.push(r[e[n2]]);
      return t2;
    }, generateFuncType = (e, r) => {
      var t2 = e.slice(0, 1), n2 = e.slice(1), o2 = { i: 127, p: 127, j: 126, f: 125, d: 124, e: 111 };
      r.push(96), uleb128Encode(n2.length, r);
      for (var a2 = 0; a2 < n2.length; ++a2) r.push(o2[n2[a2]]);
      t2 == "v" ? r.push(0) : r.push(1, o2[t2]);
    }, convertJsFunctionToWasm = (e, r) => {
      if (typeof WebAssembly.Function == "function") return new WebAssembly.Function(sigToWasmTypes(r), e);
      var t2 = [1];
      generateFuncType(r, t2);
      var n2 = [0, 97, 115, 109, 1, 0, 0, 0, 1];
      uleb128Encode(t2.length, n2), n2.push(...t2), n2.push(2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0);
      var o2 = new WebAssembly.Module(new Uint8Array(n2)), a2 = new WebAssembly.Instance(o2, { e: { f: e } }), s2 = a2.exports.f;
      return s2;
    }, wasmTableMirror = [], wasmTable = new WebAssembly.Table({ initial: 144, element: "anyfunc" }), getWasmTableEntry = (e) => {
      var r = wasmTableMirror[e];
      return r || (e >= wasmTableMirror.length && (wasmTableMirror.length = e + 1), wasmTableMirror[e] = r = wasmTable.get(e)), r;
    }, updateTableMap = (e, r) => {
      if (functionsInTableMap) for (var t2 = e; t2 < e + r; t2++) {
        var n2 = getWasmTableEntry(t2);
        n2 && functionsInTableMap.set(n2, t2);
      }
    }, functionsInTableMap, getFunctionAddress = (e) => (functionsInTableMap || (functionsInTableMap = /* @__PURE__ */ new WeakMap(), updateTableMap(0, wasmTable.length)), functionsInTableMap.get(e) || 0), freeTableIndexes = [], getEmptyTableSlot = () => {
      if (freeTableIndexes.length) return freeTableIndexes.pop();
      try {
        wasmTable.grow(1);
      } catch (e) {
        throw e instanceof RangeError ? "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH." : e;
      }
      return wasmTable.length - 1;
    }, setWasmTableEntry = (e, r) => {
      wasmTable.set(e, r), wasmTableMirror[e] = wasmTable.get(e);
    }, addFunction = (e, r) => {
      var t2 = getFunctionAddress(e);
      if (t2) return t2;
      var n2 = getEmptyTableSlot();
      try {
        setWasmTableEntry(n2, e);
      } catch (a2) {
        if (!(a2 instanceof TypeError)) throw a2;
        var o2 = convertJsFunctionToWasm(e, r);
        setWasmTableEntry(n2, o2);
      }
      return functionsInTableMap.set(e, n2), n2;
    }, updateGOT = (e, r) => {
      for (var t2 in e) if (!isInternalSym(t2)) {
        var n2 = e[t2];
        GOT[t2] || (GOT[t2] = new WebAssembly.Global({ value: "i32", mutable: true })), GOT[t2].value == 0 && (typeof n2 == "function" ? GOT[t2].value = addFunction(n2) : typeof n2 == "number" ? GOT[t2].value = n2 : err(`unhandled export type for '${t2}': ${typeof n2}`));
      }
    }, relocateExports = (e, r, t2) => {
      var n2 = {};
      for (var o2 in e) {
        var a2 = e[o2];
        typeof a2 == "object" && (a2 = a2.value), typeof a2 == "number" && (a2 += r), n2[o2] = a2;
      }
      return updateGOT(n2), n2;
    }, isSymbolDefined = (e) => {
      var r = wasmImports[e];
      return !(!r || r.stub);
    }, dynCall = (e, r, t2 = []) => {
      var n2 = getWasmTableEntry(r)(...t2);
      return n2;
    }, stackSave = () => _emscripten_stack_get_current(), stackRestore = (e) => __emscripten_stack_restore(e), createInvokeFunction = (e) => (r, ...t2) => {
      var n2 = stackSave();
      try {
        return dynCall(e, r, t2);
      } catch (o2) {
        if (stackRestore(n2), o2 !== o2 + 0) throw o2;
        if (_setThrew(1, 0), e[0] == "j") return 0n;
      }
    }, resolveGlobalSymbol = (e, r = false) => {
      var t2;
      return isSymbolDefined(e) ? t2 = wasmImports[e] : e.startsWith("invoke_") && (t2 = wasmImports[e] = createInvokeFunction(e.split("_")[1])), { sym: t2, name: e };
    }, UTF8ToString = (e, r) => e ? UTF8ArrayToString(HEAPU8, e, r) : "", loadWebAssemblyModule = (binary, flags, libName, localScope, handle) => {
      var metadata = getDylinkMetadata(binary);
      currentModuleWeakSymbols = metadata.weakImports;
      function loadModule() {
        {
          var memAlign = Math.pow(2, metadata.memoryAlign), memoryBase = metadata.memorySize ? alignMemory(getMemory(metadata.memorySize + memAlign), memAlign) : 0, tableBase = metadata.tableSize ? wasmTable.length : 0;
        }
        var tableGrowthNeeded = tableBase + metadata.tableSize - wasmTable.length;
        tableGrowthNeeded > 0 && wasmTable.grow(tableGrowthNeeded);
        var moduleExports;
        function resolveSymbol(e) {
          var r = resolveGlobalSymbol(e).sym;
          return !r && localScope && (r = localScope[e]), r || (r = moduleExports[e]), r;
        }
        var proxyHandler = { get(e, r) {
          switch (r) {
            case "__memory_base":
              return memoryBase;
            case "__table_base":
              return tableBase;
          }
          if (r in wasmImports && !wasmImports[r].stub) return wasmImports[r];
          if (!(r in e)) {
            var t2;
            e[r] = (...n2) => (t2 || (t2 = resolveSymbol(r)), t2(...n2));
          }
          return e[r];
        } }, proxy = new Proxy({}, proxyHandler), info = { "GOT.mem": new Proxy({}, GOTHandler), "GOT.func": new Proxy({}, GOTHandler), env: proxy, wasi_snapshot_preview1: proxy };
        function postInstantiation(module, instance) {
          updateTableMap(tableBase, metadata.tableSize), moduleExports = relocateExports(instance.exports, memoryBase), flags.allowUndefined || reportUndefinedSymbols();
          function addEmAsm(addr, body) {
            for (var args = [], arity = 0; arity < 16 && body.indexOf("$" + arity) != -1; arity++) args.push("$" + arity);
            args = args.join(",");
            var func = `(${args}) => { ${body} };`;
            eval(func);
          }
          if ("__start_em_asm" in moduleExports) for (var start = moduleExports.__start_em_asm, stop = moduleExports.__stop_em_asm; start < stop; ) {
            var jsString = UTF8ToString(start);
            addEmAsm(start, jsString), start = HEAPU8.indexOf(0, start) + 1;
          }
          function addEmJs(name, cSig, body) {
            var jsArgs = [];
            if (cSig = cSig.slice(1, -1), cSig != "void") {
              cSig = cSig.split(",");
              for (var i in cSig) {
                var jsArg = cSig[i].split(" ").pop();
                jsArgs.push(jsArg.replace("*", ""));
              }
            }
            var func = `(${jsArgs}) => ${body};`;
            moduleExports[name] = eval(func);
          }
          for (var name in moduleExports) if (name.startsWith("__em_js__")) {
            var start = moduleExports[name], jsString = UTF8ToString(start), parts = jsString.split("<::>");
            addEmJs(name.replace("__em_js__", ""), parts[0], parts[1]), delete moduleExports[name];
          }
          var applyRelocs = moduleExports.__wasm_apply_data_relocs;
          applyRelocs && (runtimeInitialized ? applyRelocs() : __RELOC_FUNCS__.push(applyRelocs));
          var init = moduleExports.__wasm_call_ctors;
          return init && (runtimeInitialized ? init() : __ATINIT__.push(init)), moduleExports;
        }
        if (flags.loadAsync) {
          if (binary instanceof WebAssembly.Module) {
            var instance = new WebAssembly.Instance(binary, info);
            return Promise.resolve(postInstantiation(binary, instance));
          }
          return WebAssembly.instantiate(binary, info).then((e) => postInstantiation(e.module, e.instance));
        }
        var module = binary instanceof WebAssembly.Module ? binary : new WebAssembly.Module(binary), instance = new WebAssembly.Instance(module, info);
        return postInstantiation(module, instance);
      }
      return flags.loadAsync ? metadata.neededDynlibs.reduce((e, r) => e.then(() => loadDynamicLibrary(r, flags, localScope)), Promise.resolve()).then(loadModule) : (metadata.neededDynlibs.forEach((e) => loadDynamicLibrary(e, flags, localScope)), loadModule());
    }, mergeLibSymbols = (e, r) => {
      for (var [t2, n2] of Object.entries(e)) {
        let o2 = (s2) => {
          isSymbolDefined(s2) || (wasmImports[s2] = n2);
        };
        o2(t2);
        let a2 = "__main_argc_argv";
        t2 == "main" && o2(a2), t2 == a2 && o2("main");
      }
    }, asyncLoad = async (e) => {
      var r = await readAsync(e);
      return new Uint8Array(r);
    }, preloadPlugins = Module.preloadPlugins || [], registerWasmPlugin = () => {
      var e = { promiseChainEnd: Promise.resolve(), canHandle: (r) => !Module.noWasmDecoding && r.endsWith(".so"), handle: (r, t2, n2, o2) => {
        e.promiseChainEnd = e.promiseChainEnd.then(() => loadWebAssemblyModule(r, { loadAsync: true, nodelete: true }, t2, {})).then((a2) => {
          preloadedWasm[t2] = a2, n2(r);
        }, (a2) => {
          err(`failed to instantiate wasm: ${t2}: ${a2}`), o2();
        });
      } };
      preloadPlugins.push(e);
    }, preloadedWasm = {};
    function loadDynamicLibrary(e, r = { global: true, nodelete: true }, t2, n2) {
      var o2 = LDSO.loadedLibsByName[e];
      if (o2) return r.global ? o2.global || (o2.global = true, mergeLibSymbols(o2.exports)) : t2 && Object.assign(t2, o2.exports), r.nodelete && o2.refcount !== 1 / 0 && (o2.refcount = 1 / 0), o2.refcount++, r.loadAsync ? Promise.resolve(true) : true;
      o2 = newDSO(e, n2, "loading"), o2.refcount = r.nodelete ? 1 / 0 : 1, o2.global = r.global;
      function a2() {
        var p2 = locateFile(e);
        if (r.loadAsync) return asyncLoad(p2);
        if (!readBinary) throw new Error(`${p2}: file not found, and synchronous loading of external files is not available`);
        return readBinary(p2);
      }
      function s2() {
        var u2 = preloadedWasm[e];
        return u2 ? r.loadAsync ? Promise.resolve(u2) : u2 : r.loadAsync ? a2().then((d2) => loadWebAssemblyModule(d2, r, e, t2)) : loadWebAssemblyModule(a2(), r, e, t2);
      }
      function l2(u2) {
        o2.global ? mergeLibSymbols(u2) : t2 && Object.assign(t2, u2), o2.exports = u2;
      }
      return r.loadAsync ? s2().then((u2) => (l2(u2), true)) : (l2(s2()), true);
    }
    var reportUndefinedSymbols = () => {
      for (var [e, r] of Object.entries(GOT)) if (r.value == 0) {
        var t2 = resolveGlobalSymbol(e, true).sym;
        if (!t2 && !r.required) continue;
        if (typeof t2 == "function") r.value = addFunction(t2, t2.sig);
        else if (typeof t2 == "number") r.value = t2;
        else throw new Error(`bad export type for '${e}': ${typeof t2}`);
      }
    }, loadDylibs = () => {
      if (!dynamicLibraries.length) {
        reportUndefinedSymbols();
        return;
      }
      addRunDependency(), dynamicLibraries.reduce((e, r) => e.then(() => loadDynamicLibrary(r, { loadAsync: true, global: true, nodelete: true, allowUndefined: true })), Promise.resolve()).then(() => {
        reportUndefinedSymbols(), removeRunDependency();
      });
    }, noExitRuntime = Module.noExitRuntime || false, ___call_sighandler = (e, r) => getWasmTableEntry(e)(r);
    ___call_sighandler.sig = "vpi";
    var ___memory_base = new WebAssembly.Global({ value: "i32", mutable: false }, 1024), ___stack_pointer = new WebAssembly.Global({ value: "i32", mutable: true }, 205904), PATH = { isAbs: (e) => e.charAt(0) === "/", splitPath: (e) => {
      var r = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
      return r.exec(e).slice(1);
    }, normalizeArray: (e, r) => {
      for (var t2 = 0, n2 = e.length - 1; n2 >= 0; n2--) {
        var o2 = e[n2];
        o2 === "." ? e.splice(n2, 1) : o2 === ".." ? (e.splice(n2, 1), t2++) : t2 && (e.splice(n2, 1), t2--);
      }
      if (r) for (; t2; t2--) e.unshift("..");
      return e;
    }, normalize: (e) => {
      var r = PATH.isAbs(e), t2 = e.substr(-1) === "/";
      return e = PATH.normalizeArray(e.split("/").filter((n2) => !!n2), !r).join("/"), !e && !r && (e = "."), e && t2 && (e += "/"), (r ? "/" : "") + e;
    }, dirname: (e) => {
      var r = PATH.splitPath(e), t2 = r[0], n2 = r[1];
      return !t2 && !n2 ? "." : (n2 && (n2 = n2.substr(0, n2.length - 1)), t2 + n2);
    }, basename: (e) => {
      if (e === "/") return "/";
      e = PATH.normalize(e), e = e.replace(/\/$/, "");
      var r = e.lastIndexOf("/");
      return r === -1 ? e : e.substr(r + 1);
    }, join: (...e) => PATH.normalize(e.join("/")), join2: (e, r) => PATH.normalize(e + "/" + r) }, initRandomFill = () => {
      if (typeof crypto == "object" && typeof crypto.getRandomValues == "function") return (n2) => crypto.getRandomValues(n2);
      if (ENVIRONMENT_IS_NODE) try {
        var e = require("crypto"), r = e.randomFillSync;
        if (r) return (n2) => e.randomFillSync(n2);
        var t2 = e.randomBytes;
        return (n2) => (n2.set(t2(n2.byteLength)), n2);
      } catch {
      }
      abort("initRandomDevice");
    }, randomFill = (e) => (randomFill = initRandomFill())(e), PATH_FS = { resolve: (...e) => {
      for (var r = "", t2 = false, n2 = e.length - 1; n2 >= -1 && !t2; n2--) {
        var o2 = n2 >= 0 ? e[n2] : FS.cwd();
        if (typeof o2 != "string") throw new TypeError("Arguments to path.resolve must be strings");
        if (!o2) return "";
        r = o2 + "/" + r, t2 = PATH.isAbs(o2);
      }
      return r = PATH.normalizeArray(r.split("/").filter((a2) => !!a2), !t2).join("/"), (t2 ? "/" : "") + r || ".";
    }, relative: (e, r) => {
      e = PATH_FS.resolve(e).substr(1), r = PATH_FS.resolve(r).substr(1);
      function t2(d2) {
        for (var c2 = 0; c2 < d2.length && d2[c2] === ""; c2++) ;
        for (var p2 = d2.length - 1; p2 >= 0 && d2[p2] === ""; p2--) ;
        return c2 > p2 ? [] : d2.slice(c2, p2 - c2 + 1);
      }
      for (var n2 = t2(e.split("/")), o2 = t2(r.split("/")), a2 = Math.min(n2.length, o2.length), s2 = a2, l2 = 0; l2 < a2; l2++) if (n2[l2] !== o2[l2]) {
        s2 = l2;
        break;
      }
      for (var u2 = [], l2 = s2; l2 < n2.length; l2++) u2.push("..");
      return u2 = u2.concat(o2.slice(s2)), u2.join("/");
    } }, FS_stdin_getChar_buffer = [], lengthBytesUTF8 = (e) => {
      for (var r = 0, t2 = 0; t2 < e.length; ++t2) {
        var n2 = e.charCodeAt(t2);
        n2 <= 127 ? r++ : n2 <= 2047 ? r += 2 : n2 >= 55296 && n2 <= 57343 ? (r += 4, ++t2) : r += 3;
      }
      return r;
    }, stringToUTF8Array = (e, r, t2, n2) => {
      if (!(n2 > 0)) return 0;
      for (var o2 = t2, a2 = t2 + n2 - 1, s2 = 0; s2 < e.length; ++s2) {
        var l2 = e.charCodeAt(s2);
        if (l2 >= 55296 && l2 <= 57343) {
          var u2 = e.charCodeAt(++s2);
          l2 = 65536 + ((l2 & 1023) << 10) | u2 & 1023;
        }
        if (l2 <= 127) {
          if (t2 >= a2) break;
          r[t2++] = l2;
        } else if (l2 <= 2047) {
          if (t2 + 1 >= a2) break;
          r[t2++] = 192 | l2 >> 6, r[t2++] = 128 | l2 & 63;
        } else if (l2 <= 65535) {
          if (t2 + 2 >= a2) break;
          r[t2++] = 224 | l2 >> 12, r[t2++] = 128 | l2 >> 6 & 63, r[t2++] = 128 | l2 & 63;
        } else {
          if (t2 + 3 >= a2) break;
          r[t2++] = 240 | l2 >> 18, r[t2++] = 128 | l2 >> 12 & 63, r[t2++] = 128 | l2 >> 6 & 63, r[t2++] = 128 | l2 & 63;
        }
      }
      return r[t2] = 0, t2 - o2;
    };
    function intArrayFromString(e, r, t2) {
      var n2 = lengthBytesUTF8(e) + 1, o2 = new Array(n2), a2 = stringToUTF8Array(e, o2, 0, o2.length);
      return o2.length = a2, o2;
    }
    var FS_stdin_getChar = () => {
      if (!FS_stdin_getChar_buffer.length) {
        var e = null;
        if (ENVIRONMENT_IS_NODE) {
          var r = 256, t2 = Buffer.alloc(r), n2 = 0, o2 = process.stdin.fd;
          try {
            n2 = fs.readSync(o2, t2, 0, r);
          } catch (a2) {
            if (a2.toString().includes("EOF")) n2 = 0;
            else throw a2;
          }
          n2 > 0 && (e = t2.slice(0, n2).toString("utf-8"));
        } else typeof window < "u" && typeof window.prompt == "function" && (e = window.prompt("Input: "), e !== null && (e += `
`));
        if (!e) return null;
        FS_stdin_getChar_buffer = intArrayFromString(e);
      }
      return FS_stdin_getChar_buffer.shift();
    }, TTY = { ttys: [], init() {
    }, shutdown() {
    }, register(e, r) {
      TTY.ttys[e] = { input: [], output: [], ops: r }, FS.registerDevice(e, TTY.stream_ops);
    }, stream_ops: { open(e) {
      var r = TTY.ttys[e.node.rdev];
      if (!r) throw new FS.ErrnoError(43);
      e.tty = r, e.seekable = false;
    }, close(e) {
      e.tty.ops.fsync(e.tty);
    }, fsync(e) {
      e.tty.ops.fsync(e.tty);
    }, read(e, r, t2, n2, o2) {
      if (!e.tty || !e.tty.ops.get_char) throw new FS.ErrnoError(60);
      for (var a2 = 0, s2 = 0; s2 < n2; s2++) {
        var l2;
        try {
          l2 = e.tty.ops.get_char(e.tty);
        } catch {
          throw new FS.ErrnoError(29);
        }
        if (l2 === void 0 && a2 === 0) throw new FS.ErrnoError(6);
        if (l2 == null) break;
        a2++, r[t2 + s2] = l2;
      }
      return a2 && (e.node.atime = Date.now()), a2;
    }, write(e, r, t2, n2, o2) {
      if (!e.tty || !e.tty.ops.put_char) throw new FS.ErrnoError(60);
      try {
        for (var a2 = 0; a2 < n2; a2++) e.tty.ops.put_char(e.tty, r[t2 + a2]);
      } catch {
        throw new FS.ErrnoError(29);
      }
      return n2 && (e.node.mtime = e.node.ctime = Date.now()), a2;
    } }, default_tty_ops: { get_char(e) {
      return FS_stdin_getChar();
    }, put_char(e, r) {
      r === null || r === 10 ? (out(UTF8ArrayToString(e.output)), e.output = []) : r != 0 && e.output.push(r);
    }, fsync(e) {
      e.output && e.output.length > 0 && (out(UTF8ArrayToString(e.output)), e.output = []);
    }, ioctl_tcgets(e) {
      return { c_iflag: 25856, c_oflag: 5, c_cflag: 191, c_lflag: 35387, c_cc: [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] };
    }, ioctl_tcsets(e, r, t2) {
      return 0;
    }, ioctl_tiocgwinsz(e) {
      return [24, 80];
    } }, default_tty1_ops: { put_char(e, r) {
      r === null || r === 10 ? (err(UTF8ArrayToString(e.output)), e.output = []) : r != 0 && e.output.push(r);
    }, fsync(e) {
      e.output && e.output.length > 0 && (err(UTF8ArrayToString(e.output)), e.output = []);
    } } }, zeroMemory = (e, r) => {
      HEAPU8.fill(0, e, e + r);
    }, mmapAlloc = (e) => {
      e = alignMemory(e, 65536);
      var r = _emscripten_builtin_memalign(65536, e);
      return r && zeroMemory(r, e), r;
    }, MEMFS = { ops_table: null, mount(e) {
      return MEMFS.createNode(null, "/", 16895, 0);
    }, createNode(e, r, t2, n2) {
      if (FS.isBlkdev(t2) || FS.isFIFO(t2)) throw new FS.ErrnoError(63);
      MEMFS.ops_table || (MEMFS.ops_table = { dir: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr, lookup: MEMFS.node_ops.lookup, mknod: MEMFS.node_ops.mknod, rename: MEMFS.node_ops.rename, unlink: MEMFS.node_ops.unlink, rmdir: MEMFS.node_ops.rmdir, readdir: MEMFS.node_ops.readdir, symlink: MEMFS.node_ops.symlink }, stream: { llseek: MEMFS.stream_ops.llseek } }, file: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr }, stream: { llseek: MEMFS.stream_ops.llseek, read: MEMFS.stream_ops.read, write: MEMFS.stream_ops.write, allocate: MEMFS.stream_ops.allocate, mmap: MEMFS.stream_ops.mmap, msync: MEMFS.stream_ops.msync } }, link: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr, readlink: MEMFS.node_ops.readlink }, stream: {} }, chrdev: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr }, stream: FS.chrdev_stream_ops } });
      var o2 = FS.createNode(e, r, t2, n2);
      return FS.isDir(o2.mode) ? (o2.node_ops = MEMFS.ops_table.dir.node, o2.stream_ops = MEMFS.ops_table.dir.stream, o2.contents = {}) : FS.isFile(o2.mode) ? (o2.node_ops = MEMFS.ops_table.file.node, o2.stream_ops = MEMFS.ops_table.file.stream, o2.usedBytes = 0, o2.contents = null) : FS.isLink(o2.mode) ? (o2.node_ops = MEMFS.ops_table.link.node, o2.stream_ops = MEMFS.ops_table.link.stream) : FS.isChrdev(o2.mode) && (o2.node_ops = MEMFS.ops_table.chrdev.node, o2.stream_ops = MEMFS.ops_table.chrdev.stream), o2.atime = o2.mtime = o2.ctime = Date.now(), e && (e.contents[r] = o2, e.atime = e.mtime = e.ctime = o2.atime), o2;
    }, getFileDataAsTypedArray(e) {
      return e.contents ? e.contents.subarray ? e.contents.subarray(0, e.usedBytes) : new Uint8Array(e.contents) : new Uint8Array(0);
    }, expandFileStorage(e, r) {
      var t2 = e.contents ? e.contents.length : 0;
      if (!(t2 >= r)) {
        var n2 = 1024 * 1024;
        r = Math.max(r, t2 * (t2 < n2 ? 2 : 1.125) >>> 0), t2 != 0 && (r = Math.max(r, 256));
        var o2 = e.contents;
        e.contents = new Uint8Array(r), e.usedBytes > 0 && e.contents.set(o2.subarray(0, e.usedBytes), 0);
      }
    }, resizeFileStorage(e, r) {
      if (e.usedBytes != r) if (r == 0) e.contents = null, e.usedBytes = 0;
      else {
        var t2 = e.contents;
        e.contents = new Uint8Array(r), t2 && e.contents.set(t2.subarray(0, Math.min(r, e.usedBytes))), e.usedBytes = r;
      }
    }, node_ops: { getattr(e) {
      var r = {};
      return r.dev = FS.isChrdev(e.mode) ? e.id : 1, r.ino = e.id, r.mode = e.mode, r.nlink = 1, r.uid = 0, r.gid = 0, r.rdev = e.rdev, FS.isDir(e.mode) ? r.size = 4096 : FS.isFile(e.mode) ? r.size = e.usedBytes : FS.isLink(e.mode) ? r.size = e.link.length : r.size = 0, r.atime = new Date(e.atime), r.mtime = new Date(e.mtime), r.ctime = new Date(e.ctime), r.blksize = 4096, r.blocks = Math.ceil(r.size / r.blksize), r;
    }, setattr(e, r) {
      for (let t2 of ["mode", "atime", "mtime", "ctime"]) r[t2] && (e[t2] = r[t2]);
      r.size !== void 0 && MEMFS.resizeFileStorage(e, r.size);
    }, lookup(e, r) {
      throw MEMFS.doesNotExistError;
    }, mknod(e, r, t2, n2) {
      return MEMFS.createNode(e, r, t2, n2);
    }, rename(e, r, t2) {
      var n2;
      try {
        n2 = FS.lookupNode(r, t2);
      } catch {
      }
      if (n2) {
        if (FS.isDir(e.mode)) for (var o2 in n2.contents) throw new FS.ErrnoError(55);
        FS.hashRemoveNode(n2);
      }
      delete e.parent.contents[e.name], r.contents[t2] = e, e.name = t2, r.ctime = r.mtime = e.parent.ctime = e.parent.mtime = Date.now();
    }, unlink(e, r) {
      delete e.contents[r], e.ctime = e.mtime = Date.now();
    }, rmdir(e, r) {
      var t2 = FS.lookupNode(e, r);
      for (var n2 in t2.contents) throw new FS.ErrnoError(55);
      delete e.contents[r], e.ctime = e.mtime = Date.now();
    }, readdir(e) {
      return [".", "..", ...Object.keys(e.contents)];
    }, symlink(e, r, t2) {
      var n2 = MEMFS.createNode(e, r, 41471, 0);
      return n2.link = t2, n2;
    }, readlink(e) {
      if (!FS.isLink(e.mode)) throw new FS.ErrnoError(28);
      return e.link;
    } }, stream_ops: { read(e, r, t2, n2, o2) {
      var a2 = e.node.contents;
      if (o2 >= e.node.usedBytes) return 0;
      var s2 = Math.min(e.node.usedBytes - o2, n2);
      if (s2 > 8 && a2.subarray) r.set(a2.subarray(o2, o2 + s2), t2);
      else for (var l2 = 0; l2 < s2; l2++) r[t2 + l2] = a2[o2 + l2];
      return s2;
    }, write(e, r, t2, n2, o2, a2) {
      if (r.buffer === HEAP8.buffer && (a2 = false), !n2) return 0;
      var s2 = e.node;
      if (s2.mtime = s2.ctime = Date.now(), r.subarray && (!s2.contents || s2.contents.subarray)) {
        if (a2) return s2.contents = r.subarray(t2, t2 + n2), s2.usedBytes = n2, n2;
        if (s2.usedBytes === 0 && o2 === 0) return s2.contents = r.slice(t2, t2 + n2), s2.usedBytes = n2, n2;
        if (o2 + n2 <= s2.usedBytes) return s2.contents.set(r.subarray(t2, t2 + n2), o2), n2;
      }
      if (MEMFS.expandFileStorage(s2, o2 + n2), s2.contents.subarray && r.subarray) s2.contents.set(r.subarray(t2, t2 + n2), o2);
      else for (var l2 = 0; l2 < n2; l2++) s2.contents[o2 + l2] = r[t2 + l2];
      return s2.usedBytes = Math.max(s2.usedBytes, o2 + n2), n2;
    }, llseek(e, r, t2) {
      var n2 = r;
      if (t2 === 1 ? n2 += e.position : t2 === 2 && FS.isFile(e.node.mode) && (n2 += e.node.usedBytes), n2 < 0) throw new FS.ErrnoError(28);
      return n2;
    }, allocate(e, r, t2) {
      MEMFS.expandFileStorage(e.node, r + t2), e.node.usedBytes = Math.max(e.node.usedBytes, r + t2);
    }, mmap(e, r, t2, n2, o2) {
      if (!FS.isFile(e.node.mode)) throw new FS.ErrnoError(43);
      var a2, s2, l2 = e.node.contents;
      if (!(o2 & 2) && l2 && l2.buffer === HEAP8.buffer) s2 = false, a2 = l2.byteOffset;
      else {
        if (s2 = true, a2 = mmapAlloc(r), !a2) throw new FS.ErrnoError(48);
        l2 && ((t2 > 0 || t2 + r < l2.length) && (l2.subarray ? l2 = l2.subarray(t2, t2 + r) : l2 = Array.prototype.slice.call(l2, t2, t2 + r)), HEAP8.set(l2, a2));
      }
      return { ptr: a2, allocated: s2 };
    }, msync(e, r, t2, n2, o2) {
      return MEMFS.stream_ops.write(e, r, 0, n2, t2, false), 0;
    } } }, FS_createDataFile = (e, r, t2, n2, o2, a2) => {
      FS.createDataFile(e, r, t2, n2, o2, a2);
    }, FS_handledByPreloadPlugin = (e, r, t2, n2) => {
      typeof Browser < "u" && Browser.init();
      var o2 = false;
      return preloadPlugins.forEach((a2) => {
        o2 || a2.canHandle(r) && (a2.handle(e, r, t2, n2), o2 = true);
      }), o2;
    }, FS_createPreloadedFile = (e, r, t2, n2, o2, a2, s2, l2, u2, d2) => {
      var c2 = r ? PATH_FS.resolve(PATH.join2(e, r)) : e;
      function f2(m2) {
        function _3(g2) {
          d2?.(), l2 || FS_createDataFile(e, r, g2, n2, o2, u2), a2?.(), removeRunDependency();
        }
        FS_handledByPreloadPlugin(m2, c2, _3, () => {
          s2?.(), removeRunDependency();
        }) || _3(m2);
      }
      addRunDependency(), typeof t2 == "string" ? asyncLoad(t2).then(f2, s2) : f2(t2);
    }, FS_modeStringToFlags = (e) => {
      var r = { r: 0, "r+": 2, w: 577, "w+": 578, a: 1089, "a+": 1090 }, t2 = r[e];
      if (typeof t2 > "u") throw new Error(`Unknown file open mode: ${e}`);
      return t2;
    }, FS_getMode = (e, r) => {
      var t2 = 0;
      return e && (t2 |= 365), r && (t2 |= 146), t2;
    }, ERRNO_CODES = { EPERM: 63, ENOENT: 44, ESRCH: 71, EINTR: 27, EIO: 29, ENXIO: 60, E2BIG: 1, ENOEXEC: 45, EBADF: 8, ECHILD: 12, EAGAIN: 6, EWOULDBLOCK: 6, ENOMEM: 48, EACCES: 2, EFAULT: 21, ENOTBLK: 105, EBUSY: 10, EEXIST: 20, EXDEV: 75, ENODEV: 43, ENOTDIR: 54, EISDIR: 31, EINVAL: 28, ENFILE: 41, EMFILE: 33, ENOTTY: 59, ETXTBSY: 74, EFBIG: 22, ENOSPC: 51, ESPIPE: 70, EROFS: 69, EMLINK: 34, EPIPE: 64, EDOM: 18, ERANGE: 68, ENOMSG: 49, EIDRM: 24, ECHRNG: 106, EL2NSYNC: 156, EL3HLT: 107, EL3RST: 108, ELNRNG: 109, EUNATCH: 110, ENOCSI: 111, EL2HLT: 112, EDEADLK: 16, ENOLCK: 46, EBADE: 113, EBADR: 114, EXFULL: 115, ENOANO: 104, EBADRQC: 103, EBADSLT: 102, EDEADLOCK: 16, EBFONT: 101, ENOSTR: 100, ENODATA: 116, ETIME: 117, ENOSR: 118, ENONET: 119, ENOPKG: 120, EREMOTE: 121, ENOLINK: 47, EADV: 122, ESRMNT: 123, ECOMM: 124, EPROTO: 65, EMULTIHOP: 36, EDOTDOT: 125, EBADMSG: 9, ENOTUNIQ: 126, EBADFD: 127, EREMCHG: 128, ELIBACC: 129, ELIBBAD: 130, ELIBSCN: 131, ELIBMAX: 132, ELIBEXEC: 133, ENOSYS: 52, ENOTEMPTY: 55, ENAMETOOLONG: 37, ELOOP: 32, EOPNOTSUPP: 138, EPFNOSUPPORT: 139, ECONNRESET: 15, ENOBUFS: 42, EAFNOSUPPORT: 5, EPROTOTYPE: 67, ENOTSOCK: 57, ENOPROTOOPT: 50, ESHUTDOWN: 140, ECONNREFUSED: 14, EADDRINUSE: 3, ECONNABORTED: 13, ENETUNREACH: 40, ENETDOWN: 38, ETIMEDOUT: 73, EHOSTDOWN: 142, EHOSTUNREACH: 23, EINPROGRESS: 26, EALREADY: 7, EDESTADDRREQ: 17, EMSGSIZE: 35, EPROTONOSUPPORT: 66, ESOCKTNOSUPPORT: 137, EADDRNOTAVAIL: 4, ENETRESET: 39, EISCONN: 30, ENOTCONN: 53, ETOOMANYREFS: 141, EUSERS: 136, EDQUOT: 19, ESTALE: 72, ENOTSUP: 138, ENOMEDIUM: 148, EILSEQ: 25, EOVERFLOW: 61, ECANCELED: 11, ENOTRECOVERABLE: 56, EOWNERDEAD: 62, ESTRPIPE: 135 }, PROXYFS = { mount(e) {
      return PROXYFS.createNode(null, "/", e.opts.fs.lstat(e.opts.root).mode, 0);
    }, createNode(e, r, t2, n2) {
      if (!FS.isDir(t2) && !FS.isFile(t2) && !FS.isLink(t2)) throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
      var o2 = FS.createNode(e, r, t2);
      return o2.node_ops = PROXYFS.node_ops, o2.stream_ops = PROXYFS.stream_ops, o2;
    }, realPath(e) {
      for (var r = []; e.parent !== e; ) r.push(e.name), e = e.parent;
      return r.push(e.mount.opts.root), r.reverse(), PATH.join(...r);
    }, node_ops: { getattr(e) {
      var r = PROXYFS.realPath(e), t2;
      try {
        t2 = e.mount.opts.fs.lstat(r);
      } catch (n2) {
        throw n2.code ? new FS.ErrnoError(ERRNO_CODES[n2.code]) : n2;
      }
      return { dev: t2.dev, ino: t2.ino, mode: t2.mode, nlink: t2.nlink, uid: t2.uid, gid: t2.gid, rdev: t2.rdev, size: t2.size, atime: t2.atime, mtime: t2.mtime, ctime: t2.ctime, blksize: t2.blksize, blocks: t2.blocks };
    }, setattr(e, r) {
      var t2 = PROXYFS.realPath(e);
      try {
        if (r.mode !== void 0 && (e.mount.opts.fs.chmod(t2, r.mode), e.mode = r.mode), r.atime || r.mtime) {
          var n2 = new Date(r.atime || r.mtime), o2 = new Date(r.mtime || r.atime);
          e.mount.opts.fs.utime(t2, n2, o2);
        }
        r.size !== void 0 && e.mount.opts.fs.truncate(t2, r.size);
      } catch (a2) {
        throw a2.code ? new FS.ErrnoError(ERRNO_CODES[a2.code]) : a2;
      }
    }, lookup(e, r) {
      try {
        var t2 = PATH.join2(PROXYFS.realPath(e), r), n2 = e.mount.opts.fs.lstat(t2).mode, o2 = PROXYFS.createNode(e, r, n2);
        return o2;
      } catch (a2) {
        throw a2.code ? new FS.ErrnoError(ERRNO_CODES[a2.code]) : a2;
      }
    }, mknod(e, r, t2, n2) {
      var o2 = PROXYFS.createNode(e, r, t2, n2), a2 = PROXYFS.realPath(o2);
      try {
        FS.isDir(o2.mode) ? o2.mount.opts.fs.mkdir(a2, o2.mode) : o2.mount.opts.fs.writeFile(a2, "", { mode: o2.mode });
      } catch (s2) {
        throw s2.code ? new FS.ErrnoError(ERRNO_CODES[s2.code]) : s2;
      }
      return o2;
    }, rename(e, r, t2) {
      var n2 = PROXYFS.realPath(e), o2 = PATH.join2(PROXYFS.realPath(r), t2);
      try {
        e.mount.opts.fs.rename(n2, o2), e.name = t2;
      } catch (a2) {
        throw a2.code ? new FS.ErrnoError(ERRNO_CODES[a2.code]) : a2;
      }
    }, unlink(e, r) {
      var t2 = PATH.join2(PROXYFS.realPath(e), r);
      try {
        e.mount.opts.fs.unlink(t2);
      } catch (n2) {
        throw n2.code ? new FS.ErrnoError(ERRNO_CODES[n2.code]) : n2;
      }
    }, rmdir(e, r) {
      var t2 = PATH.join2(PROXYFS.realPath(e), r);
      try {
        e.mount.opts.fs.rmdir(t2);
      } catch (n2) {
        throw n2.code ? new FS.ErrnoError(ERRNO_CODES[n2.code]) : n2;
      }
    }, readdir(e) {
      var r = PROXYFS.realPath(e);
      try {
        return e.mount.opts.fs.readdir(r);
      } catch (t2) {
        throw t2.code ? new FS.ErrnoError(ERRNO_CODES[t2.code]) : t2;
      }
    }, symlink(e, r, t2) {
      var n2 = PATH.join2(PROXYFS.realPath(e), r);
      try {
        e.mount.opts.fs.symlink(t2, n2);
      } catch (o2) {
        throw o2.code ? new FS.ErrnoError(ERRNO_CODES[o2.code]) : o2;
      }
    }, readlink(e) {
      var r = PROXYFS.realPath(e);
      try {
        return e.mount.opts.fs.readlink(r);
      } catch (t2) {
        throw t2.code ? new FS.ErrnoError(ERRNO_CODES[t2.code]) : t2;
      }
    } }, stream_ops: { open(e) {
      var r = PROXYFS.realPath(e.node);
      try {
        e.nfd = e.node.mount.opts.fs.open(r, e.flags);
      } catch (t2) {
        throw t2.code ? new FS.ErrnoError(ERRNO_CODES[t2.code]) : t2;
      }
    }, close(e) {
      try {
        e.node.mount.opts.fs.close(e.nfd);
      } catch (r) {
        throw r.code ? new FS.ErrnoError(ERRNO_CODES[r.code]) : r;
      }
    }, read(e, r, t2, n2, o2) {
      try {
        return e.node.mount.opts.fs.read(e.nfd, r, t2, n2, o2);
      } catch (a2) {
        throw a2.code ? new FS.ErrnoError(ERRNO_CODES[a2.code]) : a2;
      }
    }, write(e, r, t2, n2, o2) {
      try {
        return e.node.mount.opts.fs.write(e.nfd, r, t2, n2, o2);
      } catch (a2) {
        throw a2.code ? new FS.ErrnoError(ERRNO_CODES[a2.code]) : a2;
      }
    }, llseek(e, r, t2) {
      var n2 = r;
      if (t2 === 1) n2 += e.position;
      else if (t2 === 2 && FS.isFile(e.node.mode)) try {
        var o2 = e.node.node_ops.getattr(e.node);
        n2 += o2.size;
      } catch (a2) {
        throw new FS.ErrnoError(ERRNO_CODES[a2.code]);
      }
      if (n2 < 0) throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
      return n2;
    } } }, FS = { root: null, mounts: [], devices: {}, streams: [], nextInode: 1, nameTable: null, currentPath: "/", initialized: false, ignorePermissions: true, ErrnoError: class {
      constructor(e) {
        P$2(this, "name", "ErrnoError");
        this.errno = e;
      }
    }, filesystems: null, syncFSRequests: 0, readFiles: {}, FSStream: class {
      constructor() {
        P$2(this, "shared", {});
      }
      get object() {
        return this.node;
      }
      set object(e) {
        this.node = e;
      }
      get isRead() {
        return (this.flags & 2097155) !== 1;
      }
      get isWrite() {
        return (this.flags & 2097155) !== 0;
      }
      get isAppend() {
        return this.flags & 1024;
      }
      get flags() {
        return this.shared.flags;
      }
      set flags(e) {
        this.shared.flags = e;
      }
      get position() {
        return this.shared.position;
      }
      set position(e) {
        this.shared.position = e;
      }
    }, FSNode: class {
      constructor(e, r, t2, n2) {
        P$2(this, "node_ops", {});
        P$2(this, "stream_ops", {});
        P$2(this, "readMode", 365);
        P$2(this, "writeMode", 146);
        P$2(this, "mounted", null);
        e || (e = this), this.parent = e, this.mount = e.mount, this.id = FS.nextInode++, this.name = r, this.mode = t2, this.rdev = n2, this.atime = this.mtime = this.ctime = Date.now();
      }
      get read() {
        return (this.mode & this.readMode) === this.readMode;
      }
      set read(e) {
        e ? this.mode |= this.readMode : this.mode &= ~this.readMode;
      }
      get write() {
        return (this.mode & this.writeMode) === this.writeMode;
      }
      set write(e) {
        e ? this.mode |= this.writeMode : this.mode &= ~this.writeMode;
      }
      get isFolder() {
        return FS.isDir(this.mode);
      }
      get isDevice() {
        return FS.isChrdev(this.mode);
      }
    }, lookupPath(e, r = {}) {
      if (!e) return { path: "", node: null };
      r.follow_mount ?? (r.follow_mount = true), PATH.isAbs(e) || (e = FS.cwd() + "/" + e);
      e: for (var t2 = 0; t2 < 40; t2++) {
        for (var n2 = e.split("/").filter((d2) => !!d2 && d2 !== "."), o2 = FS.root, a2 = "/", s2 = 0; s2 < n2.length; s2++) {
          var l2 = s2 === n2.length - 1;
          if (l2 && r.parent) break;
          if (n2[s2] === "..") {
            a2 = PATH.dirname(a2), o2 = o2.parent;
            continue;
          }
          a2 = PATH.join2(a2, n2[s2]);
          try {
            o2 = FS.lookupNode(o2, n2[s2]);
          } catch (d2) {
            if (d2?.errno === 44 && l2 && r.noent_okay) return { path: a2 };
            throw d2;
          }
          if (FS.isMountpoint(o2) && (!l2 || r.follow_mount) && (o2 = o2.mounted.root), FS.isLink(o2.mode) && (!l2 || r.follow)) {
            if (!o2.node_ops.readlink) throw new FS.ErrnoError(52);
            var u2 = o2.node_ops.readlink(o2);
            PATH.isAbs(u2) || (u2 = PATH.dirname(a2) + "/" + u2), e = u2 + "/" + n2.slice(s2 + 1).join("/");
            continue e;
          }
        }
        return { path: a2, node: o2 };
      }
      throw new FS.ErrnoError(32);
    }, getPath(e) {
      for (var r; ; ) {
        if (FS.isRoot(e)) {
          var t2 = e.mount.mountpoint;
          return r ? t2[t2.length - 1] !== "/" ? `${t2}/${r}` : t2 + r : t2;
        }
        r = r ? `${e.name}/${r}` : e.name, e = e.parent;
      }
    }, hashName(e, r) {
      for (var t2 = 0, n2 = 0; n2 < r.length; n2++) t2 = (t2 << 5) - t2 + r.charCodeAt(n2) | 0;
      return (e + t2 >>> 0) % FS.nameTable.length;
    }, hashAddNode(e) {
      var r = FS.hashName(e.parent.id, e.name);
      e.name_next = FS.nameTable[r], FS.nameTable[r] = e;
    }, hashRemoveNode(e) {
      var r = FS.hashName(e.parent.id, e.name);
      if (FS.nameTable[r] === e) FS.nameTable[r] = e.name_next;
      else for (var t2 = FS.nameTable[r]; t2; ) {
        if (t2.name_next === e) {
          t2.name_next = e.name_next;
          break;
        }
        t2 = t2.name_next;
      }
    }, lookupNode(e, r) {
      var t2 = FS.mayLookup(e);
      if (t2) throw new FS.ErrnoError(t2);
      for (var n2 = FS.hashName(e.id, r), o2 = FS.nameTable[n2]; o2; o2 = o2.name_next) {
        var a2 = o2.name;
        if (o2.parent.id === e.id && a2 === r) return o2;
      }
      return FS.lookup(e, r);
    }, createNode(e, r, t2, n2) {
      var o2 = new FS.FSNode(e, r, t2, n2);
      return FS.hashAddNode(o2), o2;
    }, destroyNode(e) {
      FS.hashRemoveNode(e);
    }, isRoot(e) {
      return e === e.parent;
    }, isMountpoint(e) {
      return !!e.mounted;
    }, isFile(e) {
      return (e & 61440) === 32768;
    }, isDir(e) {
      return (e & 61440) === 16384;
    }, isLink(e) {
      return (e & 61440) === 40960;
    }, isChrdev(e) {
      return (e & 61440) === 8192;
    }, isBlkdev(e) {
      return (e & 61440) === 24576;
    }, isFIFO(e) {
      return (e & 61440) === 4096;
    }, isSocket(e) {
      return (e & 49152) === 49152;
    }, flagsToPermissionString(e) {
      var r = ["r", "w", "rw"][e & 3];
      return e & 512 && (r += "w"), r;
    }, nodePermissions(e, r) {
      return FS.ignorePermissions ? 0 : r.includes("r") && !(e.mode & 292) || r.includes("w") && !(e.mode & 146) || r.includes("x") && !(e.mode & 73) ? 2 : 0;
    }, mayLookup(e) {
      if (!FS.isDir(e.mode)) return 54;
      var r = FS.nodePermissions(e, "x");
      return r || (e.node_ops.lookup ? 0 : 2);
    }, mayCreate(e, r) {
      if (!FS.isDir(e.mode)) return 54;
      try {
        var t2 = FS.lookupNode(e, r);
        return 20;
      } catch {
      }
      return FS.nodePermissions(e, "wx");
    }, mayDelete(e, r, t2) {
      var n2;
      try {
        n2 = FS.lookupNode(e, r);
      } catch (a2) {
        return a2.errno;
      }
      var o2 = FS.nodePermissions(e, "wx");
      if (o2) return o2;
      if (t2) {
        if (!FS.isDir(n2.mode)) return 54;
        if (FS.isRoot(n2) || FS.getPath(n2) === FS.cwd()) return 10;
      } else if (FS.isDir(n2.mode)) return 31;
      return 0;
    }, mayOpen(e, r) {
      return e ? FS.isLink(e.mode) ? 32 : FS.isDir(e.mode) && (FS.flagsToPermissionString(r) !== "r" || r & 512) ? 31 : FS.nodePermissions(e, FS.flagsToPermissionString(r)) : 44;
    }, MAX_OPEN_FDS: 4096, nextfd() {
      for (var e = 0; e <= FS.MAX_OPEN_FDS; e++) if (!FS.streams[e]) return e;
      throw new FS.ErrnoError(33);
    }, getStreamChecked(e) {
      var r = FS.getStream(e);
      if (!r) throw new FS.ErrnoError(8);
      return r;
    }, getStream: (e) => FS.streams[e], createStream(e, r = -1) {
      return e = Object.assign(new FS.FSStream(), e), r == -1 && (r = FS.nextfd()), e.fd = r, FS.streams[r] = e, e;
    }, closeStream(e) {
      FS.streams[e] = null;
    }, dupStream(e, r = -1) {
      var t2 = FS.createStream(e, r);
      return t2.stream_ops?.dup?.(t2), t2;
    }, chrdev_stream_ops: { open(e) {
      var r = FS.getDevice(e.node.rdev);
      e.stream_ops = r.stream_ops, e.stream_ops.open?.(e);
    }, llseek() {
      throw new FS.ErrnoError(70);
    } }, major: (e) => e >> 8, minor: (e) => e & 255, makedev: (e, r) => e << 8 | r, registerDevice(e, r) {
      FS.devices[e] = { stream_ops: r };
    }, getDevice: (e) => FS.devices[e], getMounts(e) {
      for (var r = [], t2 = [e]; t2.length; ) {
        var n2 = t2.pop();
        r.push(n2), t2.push(...n2.mounts);
      }
      return r;
    }, syncfs(e, r) {
      typeof e == "function" && (r = e, e = false), FS.syncFSRequests++, FS.syncFSRequests > 1 && err(`warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
      var t2 = FS.getMounts(FS.root.mount), n2 = 0;
      function o2(s2) {
        return FS.syncFSRequests--, r(s2);
      }
      function a2(s2) {
        if (s2) return a2.errored ? void 0 : (a2.errored = true, o2(s2));
        ++n2 >= t2.length && o2(null);
      }
      t2.forEach((s2) => {
        if (!s2.type.syncfs) return a2(null);
        s2.type.syncfs(s2, e, a2);
      });
    }, mount(e, r, t2) {
      var n2 = t2 === "/", o2 = !t2, a2;
      if (n2 && FS.root) throw new FS.ErrnoError(10);
      if (!n2 && !o2) {
        var s2 = FS.lookupPath(t2, { follow_mount: false });
        if (t2 = s2.path, a2 = s2.node, FS.isMountpoint(a2)) throw new FS.ErrnoError(10);
        if (!FS.isDir(a2.mode)) throw new FS.ErrnoError(54);
      }
      var l2 = { type: e, opts: r, mountpoint: t2, mounts: [] }, u2 = e.mount(l2);
      return u2.mount = l2, l2.root = u2, n2 ? FS.root = u2 : a2 && (a2.mounted = l2, a2.mount && a2.mount.mounts.push(l2)), u2;
    }, unmount(e) {
      var r = FS.lookupPath(e, { follow_mount: false });
      if (!FS.isMountpoint(r.node)) throw new FS.ErrnoError(28);
      var t2 = r.node, n2 = t2.mounted, o2 = FS.getMounts(n2);
      Object.keys(FS.nameTable).forEach((s2) => {
        for (var l2 = FS.nameTable[s2]; l2; ) {
          var u2 = l2.name_next;
          o2.includes(l2.mount) && FS.destroyNode(l2), l2 = u2;
        }
      }), t2.mounted = null;
      var a2 = t2.mount.mounts.indexOf(n2);
      t2.mount.mounts.splice(a2, 1);
    }, lookup(e, r) {
      return e.node_ops.lookup(e, r);
    }, mknod(e, r, t2) {
      var n2 = FS.lookupPath(e, { parent: true }), o2 = n2.node, a2 = PATH.basename(e);
      if (!a2 || a2 === "." || a2 === "..") throw new FS.ErrnoError(28);
      var s2 = FS.mayCreate(o2, a2);
      if (s2) throw new FS.ErrnoError(s2);
      if (!o2.node_ops.mknod) throw new FS.ErrnoError(63);
      return o2.node_ops.mknod(o2, a2, r, t2);
    }, statfs(e) {
      var r = { bsize: 4096, frsize: 4096, blocks: 1e6, bfree: 5e5, bavail: 5e5, files: FS.nextInode, ffree: FS.nextInode - 1, fsid: 42, flags: 2, namelen: 255 }, t2 = FS.lookupPath(e, { follow: true }).node;
      return t2?.node_ops.statfs && Object.assign(r, t2.node_ops.statfs(t2.mount.opts.root)), r;
    }, create(e, r = 438) {
      return r &= 4095, r |= 32768, FS.mknod(e, r, 0);
    }, mkdir(e, r = 511) {
      return r &= 1023, r |= 16384, FS.mknod(e, r, 0);
    }, mkdirTree(e, r) {
      for (var t2 = e.split("/"), n2 = "", o2 = 0; o2 < t2.length; ++o2) if (t2[o2]) {
        n2 += "/" + t2[o2];
        try {
          FS.mkdir(n2, r);
        } catch (a2) {
          if (a2.errno != 20) throw a2;
        }
      }
    }, mkdev(e, r, t2) {
      return typeof t2 > "u" && (t2 = r, r = 438), r |= 8192, FS.mknod(e, r, t2);
    }, symlink(e, r) {
      if (!PATH_FS.resolve(e)) throw new FS.ErrnoError(44);
      var t2 = FS.lookupPath(r, { parent: true }), n2 = t2.node;
      if (!n2) throw new FS.ErrnoError(44);
      var o2 = PATH.basename(r), a2 = FS.mayCreate(n2, o2);
      if (a2) throw new FS.ErrnoError(a2);
      if (!n2.node_ops.symlink) throw new FS.ErrnoError(63);
      return n2.node_ops.symlink(n2, o2, e);
    }, rename(e, r) {
      var t2 = PATH.dirname(e), n2 = PATH.dirname(r), o2 = PATH.basename(e), a2 = PATH.basename(r), s2, l2, u2;
      if (s2 = FS.lookupPath(e, { parent: true }), l2 = s2.node, s2 = FS.lookupPath(r, { parent: true }), u2 = s2.node, !l2 || !u2) throw new FS.ErrnoError(44);
      if (l2.mount !== u2.mount) throw new FS.ErrnoError(75);
      var d2 = FS.lookupNode(l2, o2), c2 = PATH_FS.relative(e, n2);
      if (c2.charAt(0) !== ".") throw new FS.ErrnoError(28);
      if (c2 = PATH_FS.relative(r, t2), c2.charAt(0) !== ".") throw new FS.ErrnoError(55);
      var p2;
      try {
        p2 = FS.lookupNode(u2, a2);
      } catch {
      }
      if (d2 !== p2) {
        var f2 = FS.isDir(d2.mode), m2 = FS.mayDelete(l2, o2, f2);
        if (m2) throw new FS.ErrnoError(m2);
        if (m2 = p2 ? FS.mayDelete(u2, a2, f2) : FS.mayCreate(u2, a2), m2) throw new FS.ErrnoError(m2);
        if (!l2.node_ops.rename) throw new FS.ErrnoError(63);
        if (FS.isMountpoint(d2) || p2 && FS.isMountpoint(p2)) throw new FS.ErrnoError(10);
        if (u2 !== l2 && (m2 = FS.nodePermissions(l2, "w"), m2)) throw new FS.ErrnoError(m2);
        FS.hashRemoveNode(d2);
        try {
          l2.node_ops.rename(d2, u2, a2), d2.parent = u2;
        } catch (_3) {
          throw _3;
        } finally {
          FS.hashAddNode(d2);
        }
      }
    }, rmdir(e) {
      var r = FS.lookupPath(e, { parent: true }), t2 = r.node, n2 = PATH.basename(e), o2 = FS.lookupNode(t2, n2), a2 = FS.mayDelete(t2, n2, true);
      if (a2) throw new FS.ErrnoError(a2);
      if (!t2.node_ops.rmdir) throw new FS.ErrnoError(63);
      if (FS.isMountpoint(o2)) throw new FS.ErrnoError(10);
      t2.node_ops.rmdir(t2, n2), FS.destroyNode(o2);
    }, readdir(e) {
      var r = FS.lookupPath(e, { follow: true }), t2 = r.node;
      if (!t2.node_ops.readdir) throw new FS.ErrnoError(54);
      return t2.node_ops.readdir(t2);
    }, unlink(e) {
      var r = FS.lookupPath(e, { parent: true }), t2 = r.node;
      if (!t2) throw new FS.ErrnoError(44);
      var n2 = PATH.basename(e), o2 = FS.lookupNode(t2, n2), a2 = FS.mayDelete(t2, n2, false);
      if (a2) throw new FS.ErrnoError(a2);
      if (!t2.node_ops.unlink) throw new FS.ErrnoError(63);
      if (FS.isMountpoint(o2)) throw new FS.ErrnoError(10);
      t2.node_ops.unlink(t2, n2), FS.destroyNode(o2);
    }, readlink(e) {
      var r = FS.lookupPath(e), t2 = r.node;
      if (!t2) throw new FS.ErrnoError(44);
      if (!t2.node_ops.readlink) throw new FS.ErrnoError(28);
      return t2.node_ops.readlink(t2);
    }, stat(e, r) {
      var t2 = FS.lookupPath(e, { follow: !r }), n2 = t2.node;
      if (!n2) throw new FS.ErrnoError(44);
      if (!n2.node_ops.getattr) throw new FS.ErrnoError(63);
      return n2.node_ops.getattr(n2);
    }, lstat(e) {
      return FS.stat(e, true);
    }, chmod(e, r, t2) {
      var n2;
      if (typeof e == "string") {
        var o2 = FS.lookupPath(e, { follow: !t2 });
        n2 = o2.node;
      } else n2 = e;
      if (!n2.node_ops.setattr) throw new FS.ErrnoError(63);
      n2.node_ops.setattr(n2, { mode: r & 4095 | n2.mode & -4096, ctime: Date.now() });
    }, lchmod(e, r) {
      FS.chmod(e, r, true);
    }, fchmod(e, r) {
      var t2 = FS.getStreamChecked(e);
      FS.chmod(t2.node, r);
    }, chown(e, r, t2, n2) {
      var o2;
      if (typeof e == "string") {
        var a2 = FS.lookupPath(e, { follow: !n2 });
        o2 = a2.node;
      } else o2 = e;
      if (!o2.node_ops.setattr) throw new FS.ErrnoError(63);
      o2.node_ops.setattr(o2, { timestamp: Date.now() });
    }, lchown(e, r, t2) {
      FS.chown(e, r, t2, true);
    }, fchown(e, r, t2) {
      var n2 = FS.getStreamChecked(e);
      FS.chown(n2.node, r, t2);
    }, truncate(e, r) {
      if (r < 0) throw new FS.ErrnoError(28);
      var t2;
      if (typeof e == "string") {
        var n2 = FS.lookupPath(e, { follow: true });
        t2 = n2.node;
      } else t2 = e;
      if (!t2.node_ops.setattr) throw new FS.ErrnoError(63);
      if (FS.isDir(t2.mode)) throw new FS.ErrnoError(31);
      if (!FS.isFile(t2.mode)) throw new FS.ErrnoError(28);
      var o2 = FS.nodePermissions(t2, "w");
      if (o2) throw new FS.ErrnoError(o2);
      t2.node_ops.setattr(t2, { size: r, timestamp: Date.now() });
    }, ftruncate(e, r) {
      var t2 = FS.getStreamChecked(e);
      if (!(t2.flags & 2097155)) throw new FS.ErrnoError(28);
      FS.truncate(t2.node, r);
    }, utime(e, r, t2) {
      var n2 = FS.lookupPath(e, { follow: true }), o2 = n2.node;
      o2.node_ops.setattr(o2, { atime: r, mtime: t2 });
    }, open(e, r, t2 = 438) {
      if (e === "") throw new FS.ErrnoError(44);
      r = typeof r == "string" ? FS_modeStringToFlags(r) : r, r & 64 ? t2 = t2 & 4095 | 32768 : t2 = 0;
      var n2;
      if (typeof e == "object") n2 = e;
      else {
        var o2 = FS.lookupPath(e, { follow: !(r & 131072), noent_okay: true });
        n2 = o2.node, e = o2.path;
      }
      var a2 = false;
      if (r & 64) if (n2) {
        if (r & 128) throw new FS.ErrnoError(20);
      } else n2 = FS.mknod(e, t2, 0), a2 = true;
      if (!n2) throw new FS.ErrnoError(44);
      if (FS.isChrdev(n2.mode) && (r &= -513), r & 65536 && !FS.isDir(n2.mode)) throw new FS.ErrnoError(54);
      if (!a2) {
        var s2 = FS.mayOpen(n2, r);
        if (s2) throw new FS.ErrnoError(s2);
      }
      r & 512 && !a2 && FS.truncate(n2, 0), r &= -131713;
      var l2 = FS.createStream({ node: n2, path: FS.getPath(n2), flags: r, seekable: true, position: 0, stream_ops: n2.stream_ops, ungotten: [], error: false });
      return l2.stream_ops.open && l2.stream_ops.open(l2), Module.logReadFiles && !(r & 1) && (e in FS.readFiles || (FS.readFiles[e] = 1)), l2;
    }, close(e) {
      if (FS.isClosed(e)) throw new FS.ErrnoError(8);
      e.getdents && (e.getdents = null);
      try {
        e.stream_ops.close && e.stream_ops.close(e);
      } catch (r) {
        throw r;
      } finally {
        FS.closeStream(e.fd);
      }
      e.fd = null;
    }, isClosed(e) {
      return e.fd === null;
    }, llseek(e, r, t2) {
      if (FS.isClosed(e)) throw new FS.ErrnoError(8);
      if (!e.seekable || !e.stream_ops.llseek) throw new FS.ErrnoError(70);
      if (t2 != 0 && t2 != 1 && t2 != 2) throw new FS.ErrnoError(28);
      return e.position = e.stream_ops.llseek(e, r, t2), e.ungotten = [], e.position;
    }, read(e, r, t2, n2, o2) {
      if (n2 < 0 || o2 < 0) throw new FS.ErrnoError(28);
      if (FS.isClosed(e)) throw new FS.ErrnoError(8);
      if ((e.flags & 2097155) === 1) throw new FS.ErrnoError(8);
      if (FS.isDir(e.node.mode)) throw new FS.ErrnoError(31);
      if (!e.stream_ops.read) throw new FS.ErrnoError(28);
      var a2 = typeof o2 < "u";
      if (!a2) o2 = e.position;
      else if (!e.seekable) throw new FS.ErrnoError(70);
      var s2 = e.stream_ops.read(e, r, t2, n2, o2);
      return a2 || (e.position += s2), s2;
    }, write(e, r, t2, n2, o2, a2) {
      if (n2 < 0 || o2 < 0) throw new FS.ErrnoError(28);
      if (FS.isClosed(e)) throw new FS.ErrnoError(8);
      if (!(e.flags & 2097155)) throw new FS.ErrnoError(8);
      if (FS.isDir(e.node.mode)) throw new FS.ErrnoError(31);
      if (!e.stream_ops.write) throw new FS.ErrnoError(28);
      e.seekable && e.flags & 1024 && FS.llseek(e, 0, 2);
      var s2 = typeof o2 < "u";
      if (!s2) o2 = e.position;
      else if (!e.seekable) throw new FS.ErrnoError(70);
      var l2 = e.stream_ops.write(e, r, t2, n2, o2, a2);
      return s2 || (e.position += l2), l2;
    }, allocate(e, r, t2) {
      if (FS.isClosed(e)) throw new FS.ErrnoError(8);
      if (r < 0 || t2 <= 0) throw new FS.ErrnoError(28);
      if (!(e.flags & 2097155)) throw new FS.ErrnoError(8);
      if (!FS.isFile(e.node.mode) && !FS.isDir(e.node.mode)) throw new FS.ErrnoError(43);
      if (!e.stream_ops.allocate) throw new FS.ErrnoError(138);
      e.stream_ops.allocate(e, r, t2);
    }, mmap(e, r, t2, n2, o2) {
      if (n2 & 2 && !(o2 & 2) && (e.flags & 2097155) !== 2) throw new FS.ErrnoError(2);
      if ((e.flags & 2097155) === 1) throw new FS.ErrnoError(2);
      if (!e.stream_ops.mmap) throw new FS.ErrnoError(43);
      if (!r) throw new FS.ErrnoError(28);
      return e.stream_ops.mmap(e, r, t2, n2, o2);
    }, msync(e, r, t2, n2, o2) {
      return e.stream_ops.msync ? e.stream_ops.msync(e, r, t2, n2, o2) : 0;
    }, ioctl(e, r, t2) {
      if (!e.stream_ops.ioctl) throw new FS.ErrnoError(59);
      return e.stream_ops.ioctl(e, r, t2);
    }, readFile(e, r = {}) {
      if (r.flags = r.flags || 0, r.encoding = r.encoding || "binary", r.encoding !== "utf8" && r.encoding !== "binary") throw new Error(`Invalid encoding type "${r.encoding}"`);
      var t2, n2 = FS.open(e, r.flags), o2 = FS.stat(e), a2 = o2.size, s2 = new Uint8Array(a2);
      return FS.read(n2, s2, 0, a2, 0), r.encoding === "utf8" ? t2 = UTF8ArrayToString(s2) : r.encoding === "binary" && (t2 = s2), FS.close(n2), t2;
    }, writeFile(e, r, t2 = {}) {
      t2.flags = t2.flags || 577;
      var n2 = FS.open(e, t2.flags, t2.mode);
      if (typeof r == "string") {
        var o2 = new Uint8Array(lengthBytesUTF8(r) + 1), a2 = stringToUTF8Array(r, o2, 0, o2.length);
        FS.write(n2, o2, 0, a2, void 0, t2.canOwn);
      } else if (ArrayBuffer.isView(r)) FS.write(n2, r, 0, r.byteLength, void 0, t2.canOwn);
      else throw new Error("Unsupported data type");
      FS.close(n2);
    }, cwd: () => FS.currentPath, chdir(e) {
      var r = FS.lookupPath(e, { follow: true });
      if (r.node === null) throw new FS.ErrnoError(44);
      if (!FS.isDir(r.node.mode)) throw new FS.ErrnoError(54);
      var t2 = FS.nodePermissions(r.node, "x");
      if (t2) throw new FS.ErrnoError(t2);
      FS.currentPath = r.path;
    }, createDefaultDirectories() {
      FS.mkdir("/tmp"), FS.mkdir("/home"), FS.mkdir("/home/web_user");
    }, createDefaultDevices() {
      FS.mkdir("/dev"), FS.registerDevice(FS.makedev(1, 3), { read: () => 0, write: (n2, o2, a2, s2, l2) => s2, llseek: () => 0 }), FS.mkdev("/dev/null", FS.makedev(1, 3)), TTY.register(FS.makedev(5, 0), TTY.default_tty_ops), TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops), FS.mkdev("/dev/tty", FS.makedev(5, 0)), FS.mkdev("/dev/tty1", FS.makedev(6, 0));
      var e = new Uint8Array(1024), r = 0, t2 = () => (r === 0 && (r = randomFill(e).byteLength), e[--r]);
      FS.createDevice("/dev", "random", t2), FS.createDevice("/dev", "urandom", t2), FS.mkdir("/dev/shm"), FS.mkdir("/dev/shm/tmp");
    }, createSpecialDirectories() {
      FS.mkdir("/proc");
      var e = FS.mkdir("/proc/self");
      FS.mkdir("/proc/self/fd"), FS.mount({ mount() {
        var r = FS.createNode(e, "fd", 16895, 73);
        return r.stream_ops = { llseek: MEMFS.stream_ops.llseek }, r.node_ops = { lookup(t2, n2) {
          var o2 = +n2, a2 = FS.getStreamChecked(o2), s2 = { parent: null, mount: { mountpoint: "fake" }, node_ops: { readlink: () => a2.path }, id: o2 + 1 };
          return s2.parent = s2, s2;
        }, readdir() {
          return Array.from(FS.streams.entries()).filter(([t2, n2]) => n2).map(([t2, n2]) => t2.toString());
        } }, r;
      } }, {}, "/proc/self/fd");
    }, createStandardStreams(e, r, t2) {
      e ? FS.createDevice("/dev", "stdin", e) : FS.symlink("/dev/tty", "/dev/stdin"), r ? FS.createDevice("/dev", "stdout", null, r) : FS.symlink("/dev/tty", "/dev/stdout"), t2 ? FS.createDevice("/dev", "stderr", null, t2) : FS.symlink("/dev/tty1", "/dev/stderr");
      FS.open("/dev/stdin", 0);
      FS.open("/dev/stdout", 1);
      FS.open("/dev/stderr", 1);
    }, staticInit() {
      FS.nameTable = new Array(4096), FS.mount(MEMFS, {}, "/"), FS.createDefaultDirectories(), FS.createDefaultDevices(), FS.createSpecialDirectories(), FS.filesystems = { MEMFS, PROXYFS };
    }, init(e, r, t2) {
      FS.initialized = true, e ?? (e = Module.stdin), r ?? (r = Module.stdout), t2 ?? (t2 = Module.stderr), FS.createStandardStreams(e, r, t2);
    }, quit() {
      FS.initialized = false, _fflush(0);
      for (var e = 0; e < FS.streams.length; e++) {
        var r = FS.streams[e];
        r && FS.close(r);
      }
    }, findObject(e, r) {
      var t2 = FS.analyzePath(e, r);
      return t2.exists ? t2.object : null;
    }, analyzePath(e, r) {
      try {
        var t2 = FS.lookupPath(e, { follow: !r });
        e = t2.path;
      } catch {
      }
      var n2 = { isRoot: false, exists: false, error: 0, name: null, path: null, object: null, parentExists: false, parentPath: null, parentObject: null };
      try {
        var t2 = FS.lookupPath(e, { parent: true });
        n2.parentExists = true, n2.parentPath = t2.path, n2.parentObject = t2.node, n2.name = PATH.basename(e), t2 = FS.lookupPath(e, { follow: !r }), n2.exists = true, n2.path = t2.path, n2.object = t2.node, n2.name = t2.node.name, n2.isRoot = t2.path === "/";
      } catch (o2) {
        n2.error = o2.errno;
      }
      return n2;
    }, createPath(e, r, t2, n2) {
      e = typeof e == "string" ? e : FS.getPath(e);
      for (var o2 = r.split("/").reverse(); o2.length; ) {
        var a2 = o2.pop();
        if (a2) {
          var s2 = PATH.join2(e, a2);
          try {
            FS.mkdir(s2);
          } catch {
          }
          e = s2;
        }
      }
      return s2;
    }, createFile(e, r, t2, n2, o2) {
      var a2 = PATH.join2(typeof e == "string" ? e : FS.getPath(e), r), s2 = FS_getMode(n2, o2);
      return FS.create(a2, s2);
    }, createDataFile(e, r, t2, n2, o2, a2) {
      var s2 = r;
      e && (e = typeof e == "string" ? e : FS.getPath(e), s2 = r ? PATH.join2(e, r) : e);
      var l2 = FS_getMode(n2, o2), u2 = FS.create(s2, l2);
      if (t2) {
        if (typeof t2 == "string") {
          for (var d2 = new Array(t2.length), c2 = 0, p2 = t2.length; c2 < p2; ++c2) d2[c2] = t2.charCodeAt(c2);
          t2 = d2;
        }
        FS.chmod(u2, l2 | 146);
        var f2 = FS.open(u2, 577);
        FS.write(f2, t2, 0, t2.length, 0, a2), FS.close(f2), FS.chmod(u2, l2);
      }
    }, createDevice(e, r, t2, n2) {
      var l2;
      var o2 = PATH.join2(typeof e == "string" ? e : FS.getPath(e), r), a2 = FS_getMode(!!t2, !!n2);
      (l2 = FS.createDevice).major ?? (l2.major = 64);
      var s2 = FS.makedev(FS.createDevice.major++, 0);
      return FS.registerDevice(s2, { open(u2) {
        u2.seekable = false;
      }, close(u2) {
        n2?.buffer?.length && n2(10);
      }, read(u2, d2, c2, p2, f2) {
        for (var m2 = 0, _3 = 0; _3 < p2; _3++) {
          var g2;
          try {
            g2 = t2();
          } catch {
            throw new FS.ErrnoError(29);
          }
          if (g2 === void 0 && m2 === 0) throw new FS.ErrnoError(6);
          if (g2 == null) break;
          m2++, d2[c2 + _3] = g2;
        }
        return m2 && (u2.node.atime = Date.now()), m2;
      }, write(u2, d2, c2, p2, f2) {
        for (var m2 = 0; m2 < p2; m2++) try {
          n2(d2[c2 + m2]);
        } catch {
          throw new FS.ErrnoError(29);
        }
        return p2 && (u2.node.mtime = u2.node.ctime = Date.now()), m2;
      } }), FS.mkdev(o2, a2, s2);
    }, forceLoadFile(e) {
      if (e.isDevice || e.isFolder || e.link || e.contents) return true;
      if (typeof XMLHttpRequest < "u") throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
      try {
        e.contents = readBinary(e.url), e.usedBytes = e.contents.length;
      } catch {
        throw new FS.ErrnoError(29);
      }
    }, createLazyFile(e, r, t2, n2, o2) {
      class a2 {
        constructor() {
          P$2(this, "lengthKnown", false);
          P$2(this, "chunks", []);
        }
        get(m2) {
          if (!(m2 > this.length - 1 || m2 < 0)) {
            var _3 = m2 % this.chunkSize, g2 = m2 / this.chunkSize | 0;
            return this.getter(g2)[_3];
          }
        }
        setDataGetter(m2) {
          this.getter = m2;
        }
        cacheLength() {
          var m2 = new XMLHttpRequest();
          if (m2.open("HEAD", t2, false), m2.send(null), !(m2.status >= 200 && m2.status < 300 || m2.status === 304)) throw new Error("Couldn't load " + t2 + ". Status: " + m2.status);
          var _3 = Number(m2.getResponseHeader("Content-length")), g2, E2 = (g2 = m2.getResponseHeader("Accept-Ranges")) && g2 === "bytes", y2 = (g2 = m2.getResponseHeader("Content-Encoding")) && g2 === "gzip", A2 = 1024 * 1024;
          E2 || (A2 = _3);
          var S2 = (h2, b2) => {
            if (h2 > b2) throw new Error("invalid range (" + h2 + ", " + b2 + ") or no bytes requested!");
            if (b2 > _3 - 1) throw new Error("only " + _3 + " bytes available! programmer error!");
            var F2 = new XMLHttpRequest();
            if (F2.open("GET", t2, false), _3 !== A2 && F2.setRequestHeader("Range", "bytes=" + h2 + "-" + b2), F2.responseType = "arraybuffer", F2.overrideMimeType && F2.overrideMimeType("text/plain; charset=x-user-defined"), F2.send(null), !(F2.status >= 200 && F2.status < 300 || F2.status === 304)) throw new Error("Couldn't load " + t2 + ". Status: " + F2.status);
            return F2.response !== void 0 ? new Uint8Array(F2.response || []) : intArrayFromString(F2.responseText || "");
          }, v3 = this;
          v3.setDataGetter((h2) => {
            var b2 = h2 * A2, F2 = (h2 + 1) * A2 - 1;
            if (F2 = Math.min(F2, _3 - 1), typeof v3.chunks[h2] > "u" && (v3.chunks[h2] = S2(b2, F2)), typeof v3.chunks[h2] > "u") throw new Error("doXHR failed!");
            return v3.chunks[h2];
          }), (y2 || !_3) && (A2 = _3 = 1, _3 = this.getter(0).length, A2 = _3, out("LazyFiles on gzip forces download of the whole file when length is accessed")), this._length = _3, this._chunkSize = A2, this.lengthKnown = true;
        }
        get length() {
          return this.lengthKnown || this.cacheLength(), this._length;
        }
        get chunkSize() {
          return this.lengthKnown || this.cacheLength(), this._chunkSize;
        }
      }
      if (typeof XMLHttpRequest < "u") {
        if (!ENVIRONMENT_IS_WORKER) throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
        var s2 = new a2(), l2 = { isDevice: false, contents: s2 };
      } else var l2 = { isDevice: false, url: t2 };
      var u2 = FS.createFile(e, r, l2, n2, o2);
      l2.contents ? u2.contents = l2.contents : l2.url && (u2.contents = null, u2.url = l2.url), Object.defineProperties(u2, { usedBytes: { get: function() {
        return this.contents.length;
      } } });
      var d2 = {}, c2 = Object.keys(u2.stream_ops);
      c2.forEach((f2) => {
        var m2 = u2.stream_ops[f2];
        d2[f2] = (..._3) => (FS.forceLoadFile(u2), m2(..._3));
      });
      function p2(f2, m2, _3, g2, E2) {
        var y2 = f2.node.contents;
        if (E2 >= y2.length) return 0;
        var A2 = Math.min(y2.length - E2, g2);
        if (y2.slice) for (var S2 = 0; S2 < A2; S2++) m2[_3 + S2] = y2[E2 + S2];
        else for (var S2 = 0; S2 < A2; S2++) m2[_3 + S2] = y2.get(E2 + S2);
        return A2;
      }
      return d2.read = (f2, m2, _3, g2, E2) => (FS.forceLoadFile(u2), p2(f2, m2, _3, g2, E2)), d2.mmap = (f2, m2, _3, g2, E2) => {
        FS.forceLoadFile(u2);
        var y2 = mmapAlloc(m2);
        if (!y2) throw new FS.ErrnoError(48);
        return p2(f2, HEAP8, y2, m2, _3), { ptr: y2, allocated: true };
      }, u2.stream_ops = d2, u2;
    } }, SYSCALLS = { DEFAULT_POLLMASK: 5, calculateAt(e, r, t2) {
      if (PATH.isAbs(r)) return r;
      var n2;
      if (e === -100) n2 = FS.cwd();
      else {
        var o2 = SYSCALLS.getStreamFromFD(e);
        n2 = o2.path;
      }
      if (r.length == 0) {
        if (!t2) throw new FS.ErrnoError(44);
        return n2;
      }
      return n2 + "/" + r;
    }, doStat(e, r, t2) {
      var n2 = e(r);
      HEAP32[t2 >> 2] = n2.dev, HEAP32[t2 + 4 >> 2] = n2.mode, HEAPU32[t2 + 8 >> 2] = n2.nlink, HEAP32[t2 + 12 >> 2] = n2.uid, HEAP32[t2 + 16 >> 2] = n2.gid, HEAP32[t2 + 20 >> 2] = n2.rdev, HEAP64[t2 + 24 >> 3] = BigInt(n2.size), HEAP32[t2 + 32 >> 2] = 4096, HEAP32[t2 + 36 >> 2] = n2.blocks;
      var o2 = n2.atime.getTime(), a2 = n2.mtime.getTime(), s2 = n2.ctime.getTime();
      return HEAP64[t2 + 40 >> 3] = BigInt(Math.floor(o2 / 1e3)), HEAPU32[t2 + 48 >> 2] = o2 % 1e3 * 1e3 * 1e3, HEAP64[t2 + 56 >> 3] = BigInt(Math.floor(a2 / 1e3)), HEAPU32[t2 + 64 >> 2] = a2 % 1e3 * 1e3 * 1e3, HEAP64[t2 + 72 >> 3] = BigInt(Math.floor(s2 / 1e3)), HEAPU32[t2 + 80 >> 2] = s2 % 1e3 * 1e3 * 1e3, HEAP64[t2 + 88 >> 3] = BigInt(n2.ino), 0;
    }, doMsync(e, r, t2, n2, o2) {
      if (!FS.isFile(r.node.mode)) throw new FS.ErrnoError(43);
      if (n2 & 2) return 0;
      var a2 = HEAPU8.slice(e, e + t2);
      FS.msync(r, a2, o2, t2, n2);
    }, getStreamFromFD(e) {
      var r = FS.getStreamChecked(e);
      return r;
    }, varargs: void 0, getStr(e) {
      var r = UTF8ToString(e);
      return r;
    } };
    function ___syscall_chmod(e, r) {
      try {
        return e = SYSCALLS.getStr(e), FS.chmod(e, r), 0;
      } catch (t2) {
        if (typeof FS > "u" || t2.name !== "ErrnoError") throw t2;
        return -t2.errno;
      }
    }
    ___syscall_chmod.sig = "ipi";
    function ___syscall_dup3(e, r, t2) {
      try {
        var n2 = SYSCALLS.getStreamFromFD(e);
        if (n2.fd === r) return -28;
        if (r < 0 || r >= FS.MAX_OPEN_FDS) return -8;
        var o2 = FS.getStream(r);
        return o2 && FS.close(o2), FS.dupStream(n2, r).fd;
      } catch (a2) {
        if (typeof FS > "u" || a2.name !== "ErrnoError") throw a2;
        return -a2.errno;
      }
    }
    ___syscall_dup3.sig = "iiii";
    function ___syscall_faccessat(e, r, t2, n2) {
      try {
        if (r = SYSCALLS.getStr(r), r = SYSCALLS.calculateAt(e, r), t2 & -8) return -28;
        var o2 = FS.lookupPath(r, { follow: true }), a2 = o2.node;
        if (!a2) return -44;
        var s2 = "";
        return t2 & 4 && (s2 += "r"), t2 & 2 && (s2 += "w"), t2 & 1 && (s2 += "x"), s2 && FS.nodePermissions(a2, s2) ? -2 : 0;
      } catch (l2) {
        if (typeof FS > "u" || l2.name !== "ErrnoError") throw l2;
        return -l2.errno;
      }
    }
    ___syscall_faccessat.sig = "iipii";
    var ___syscall_fadvise64 = (e, r, t2, n2) => 0;
    ___syscall_fadvise64.sig = "iijji";
    var syscallGetVarargI = () => {
      var e = HEAP32[+SYSCALLS.varargs >> 2];
      return SYSCALLS.varargs += 4, e;
    }, syscallGetVarargP = syscallGetVarargI;
    function ___syscall_fcntl64(e, r, t2) {
      SYSCALLS.varargs = t2;
      try {
        var n2 = SYSCALLS.getStreamFromFD(e);
        switch (r) {
          case 0: {
            var o2 = syscallGetVarargI();
            if (o2 < 0) return -28;
            for (; FS.streams[o2]; ) o2++;
            var a2;
            return a2 = FS.dupStream(n2, o2), a2.fd;
          }
          case 1:
          case 2:
            return 0;
          case 3:
            return n2.flags;
          case 4: {
            var o2 = syscallGetVarargI();
            return n2.flags |= o2, 0;
          }
          case 12: {
            var o2 = syscallGetVarargP(), s2 = 0;
            return HEAP16[o2 + s2 >> 1] = 2, 0;
          }
          case 13:
          case 14:
            return 0;
        }
        return -28;
      } catch (l2) {
        if (typeof FS > "u" || l2.name !== "ErrnoError") throw l2;
        return -l2.errno;
      }
    }
    ___syscall_fcntl64.sig = "iiip";
    function ___syscall_fstat64(e, r) {
      try {
        var t2 = SYSCALLS.getStreamFromFD(e);
        return SYSCALLS.doStat(FS.stat, t2.path, r);
      } catch (n2) {
        if (typeof FS > "u" || n2.name !== "ErrnoError") throw n2;
        return -n2.errno;
      }
    }
    ___syscall_fstat64.sig = "iip";
    var stringToUTF8 = (e, r, t2) => stringToUTF8Array(e, HEAPU8, r, t2);
    function ___syscall_getcwd(e, r) {
      try {
        if (r === 0) return -28;
        var t2 = FS.cwd(), n2 = lengthBytesUTF8(t2) + 1;
        return r < n2 ? -68 : (stringToUTF8(t2, e, r), n2);
      } catch (o2) {
        if (typeof FS > "u" || o2.name !== "ErrnoError") throw o2;
        return -o2.errno;
      }
    }
    ___syscall_getcwd.sig = "ipp";
    function ___syscall_getdents64(e, r, t2) {
      try {
        var n2 = SYSCALLS.getStreamFromFD(e);
        n2.getdents || (n2.getdents = FS.readdir(n2.path));
        for (var o2 = 280, a2 = 0, s2 = FS.llseek(n2, 0, 1), l2 = Math.floor(s2 / o2), u2 = Math.min(n2.getdents.length, l2 + Math.floor(t2 / o2)), d2 = l2; d2 < u2; d2++) {
          var c2, p2, f2 = n2.getdents[d2];
          if (f2 === ".") c2 = n2.node.id, p2 = 4;
          else if (f2 === "..") {
            var m2 = FS.lookupPath(n2.path, { parent: true });
            c2 = m2.node.id, p2 = 4;
          } else {
            var _3;
            try {
              _3 = FS.lookupNode(n2.node, f2);
            } catch (g2) {
              if (g2?.errno === 28) continue;
              throw g2;
            }
            c2 = _3.id, p2 = FS.isChrdev(_3.mode) ? 2 : FS.isDir(_3.mode) ? 4 : FS.isLink(_3.mode) ? 10 : 8;
          }
          HEAP64[r + a2 >> 3] = BigInt(c2), HEAP64[r + a2 + 8 >> 3] = BigInt((d2 + 1) * o2), HEAP16[r + a2 + 16 >> 1] = 280, HEAP8[r + a2 + 18] = p2, stringToUTF8(f2, r + a2 + 19, 256), a2 += o2;
        }
        return FS.llseek(n2, d2 * o2, 0), a2;
      } catch (g2) {
        if (typeof FS > "u" || g2.name !== "ErrnoError") throw g2;
        return -g2.errno;
      }
    }
    ___syscall_getdents64.sig = "iipp";
    function ___syscall_ioctl(e, r, t2) {
      SYSCALLS.varargs = t2;
      try {
        var n2 = SYSCALLS.getStreamFromFD(e);
        switch (r) {
          case 21509:
            return n2.tty ? 0 : -59;
          case 21505: {
            if (!n2.tty) return -59;
            if (n2.tty.ops.ioctl_tcgets) {
              var o2 = n2.tty.ops.ioctl_tcgets(n2), a2 = syscallGetVarargP();
              HEAP32[a2 >> 2] = o2.c_iflag || 0, HEAP32[a2 + 4 >> 2] = o2.c_oflag || 0, HEAP32[a2 + 8 >> 2] = o2.c_cflag || 0, HEAP32[a2 + 12 >> 2] = o2.c_lflag || 0;
              for (var s2 = 0; s2 < 32; s2++) HEAP8[a2 + s2 + 17] = o2.c_cc[s2] || 0;
              return 0;
            }
            return 0;
          }
          case 21510:
          case 21511:
          case 21512:
            return n2.tty ? 0 : -59;
          case 21506:
          case 21507:
          case 21508: {
            if (!n2.tty) return -59;
            if (n2.tty.ops.ioctl_tcsets) {
              for (var a2 = syscallGetVarargP(), l2 = HEAP32[a2 >> 2], u2 = HEAP32[a2 + 4 >> 2], d2 = HEAP32[a2 + 8 >> 2], c2 = HEAP32[a2 + 12 >> 2], p2 = [], s2 = 0; s2 < 32; s2++) p2.push(HEAP8[a2 + s2 + 17]);
              return n2.tty.ops.ioctl_tcsets(n2.tty, r, { c_iflag: l2, c_oflag: u2, c_cflag: d2, c_lflag: c2, c_cc: p2 });
            }
            return 0;
          }
          case 21519: {
            if (!n2.tty) return -59;
            var a2 = syscallGetVarargP();
            return HEAP32[a2 >> 2] = 0, 0;
          }
          case 21520:
            return n2.tty ? -28 : -59;
          case 21531: {
            var a2 = syscallGetVarargP();
            return FS.ioctl(n2, r, a2);
          }
          case 21523: {
            if (!n2.tty) return -59;
            if (n2.tty.ops.ioctl_tiocgwinsz) {
              var f2 = n2.tty.ops.ioctl_tiocgwinsz(n2.tty), a2 = syscallGetVarargP();
              HEAP16[a2 >> 1] = f2[0], HEAP16[a2 + 2 >> 1] = f2[1];
            }
            return 0;
          }
          case 21524:
            return n2.tty ? 0 : -59;
          case 21515:
            return n2.tty ? 0 : -59;
          default:
            return -28;
        }
      } catch (m2) {
        if (typeof FS > "u" || m2.name !== "ErrnoError") throw m2;
        return -m2.errno;
      }
    }
    ___syscall_ioctl.sig = "iiip";
    function ___syscall_lstat64(e, r) {
      try {
        return e = SYSCALLS.getStr(e), SYSCALLS.doStat(FS.lstat, e, r);
      } catch (t2) {
        if (typeof FS > "u" || t2.name !== "ErrnoError") throw t2;
        return -t2.errno;
      }
    }
    ___syscall_lstat64.sig = "ipp";
    function ___syscall_mkdirat(e, r, t2) {
      try {
        return r = SYSCALLS.getStr(r), r = SYSCALLS.calculateAt(e, r), FS.mkdir(r, t2, 0), 0;
      } catch (n2) {
        if (typeof FS > "u" || n2.name !== "ErrnoError") throw n2;
        return -n2.errno;
      }
    }
    ___syscall_mkdirat.sig = "iipi";
    function ___syscall_newfstatat(e, r, t2, n2) {
      try {
        r = SYSCALLS.getStr(r);
        var o2 = n2 & 256, a2 = n2 & 4096;
        return n2 = n2 & -6401, r = SYSCALLS.calculateAt(e, r, a2), SYSCALLS.doStat(o2 ? FS.lstat : FS.stat, r, t2);
      } catch (s2) {
        if (typeof FS > "u" || s2.name !== "ErrnoError") throw s2;
        return -s2.errno;
      }
    }
    ___syscall_newfstatat.sig = "iippi";
    function ___syscall_openat(e, r, t2, n2) {
      SYSCALLS.varargs = n2;
      try {
        r = SYSCALLS.getStr(r), r = SYSCALLS.calculateAt(e, r);
        var o2 = n2 ? syscallGetVarargI() : 0;
        return FS.open(r, t2, o2).fd;
      } catch (a2) {
        if (typeof FS > "u" || a2.name !== "ErrnoError") throw a2;
        return -a2.errno;
      }
    }
    ___syscall_openat.sig = "iipip";
    function ___syscall_readlinkat(e, r, t2, n2) {
      try {
        if (r = SYSCALLS.getStr(r), r = SYSCALLS.calculateAt(e, r), n2 <= 0) return -28;
        var o2 = FS.readlink(r), a2 = Math.min(n2, lengthBytesUTF8(o2)), s2 = HEAP8[t2 + a2];
        return stringToUTF8(o2, t2, n2 + 1), HEAP8[t2 + a2] = s2, a2;
      } catch (l2) {
        if (typeof FS > "u" || l2.name !== "ErrnoError") throw l2;
        return -l2.errno;
      }
    }
    ___syscall_readlinkat.sig = "iippp";
    function ___syscall_rmdir(e) {
      try {
        return e = SYSCALLS.getStr(e), FS.rmdir(e), 0;
      } catch (r) {
        if (typeof FS > "u" || r.name !== "ErrnoError") throw r;
        return -r.errno;
      }
    }
    ___syscall_rmdir.sig = "ip";
    function ___syscall_stat64(e, r) {
      try {
        return e = SYSCALLS.getStr(e), SYSCALLS.doStat(FS.stat, e, r);
      } catch (t2) {
        if (typeof FS > "u" || t2.name !== "ErrnoError") throw t2;
        return -t2.errno;
      }
    }
    ___syscall_stat64.sig = "ipp";
    function ___syscall_symlinkat(e, r, t2) {
      try {
        return e = SYSCALLS.getStr(e), t2 = SYSCALLS.getStr(t2), t2 = SYSCALLS.calculateAt(r, t2), FS.symlink(e, t2), 0;
      } catch (n2) {
        if (typeof FS > "u" || n2.name !== "ErrnoError") throw n2;
        return -n2.errno;
      }
    }
    ___syscall_symlinkat.sig = "ipip";
    function ___syscall_unlinkat(e, r, t2) {
      try {
        return r = SYSCALLS.getStr(r), r = SYSCALLS.calculateAt(e, r), t2 === 0 ? FS.unlink(r) : t2 === 512 ? FS.rmdir(r) : abort("Invalid flags passed to unlinkat"), 0;
      } catch (n2) {
        if (typeof FS > "u" || n2.name !== "ErrnoError") throw n2;
        return -n2.errno;
      }
    }
    ___syscall_unlinkat.sig = "iipi";
    var ___table_base = new WebAssembly.Global({ value: "i32", mutable: false }, 1), __abort_js = () => abort("");
    __abort_js.sig = "v";
    var runtimeKeepaliveCounter = 0, __emscripten_runtime_keepalive_clear = () => {
      noExitRuntime = false, runtimeKeepaliveCounter = 0;
    };
    __emscripten_runtime_keepalive_clear.sig = "v";
    var __emscripten_throw_longjmp = () => {
      throw 1 / 0;
    };
    __emscripten_throw_longjmp.sig = "v";
    var isLeapYear = (e) => e % 4 === 0 && (e % 100 !== 0 || e % 400 === 0), MONTH_DAYS_LEAP_CUMULATIVE = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], MONTH_DAYS_REGULAR_CUMULATIVE = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], ydayFromDate = (e) => {
      var r = isLeapYear(e.getFullYear()), t2 = r ? MONTH_DAYS_LEAP_CUMULATIVE : MONTH_DAYS_REGULAR_CUMULATIVE, n2 = t2[e.getMonth()] + e.getDate() - 1;
      return n2;
    }, INT53_MAX = 9007199254740992, INT53_MIN = -9007199254740992, bigintToI53Checked = (e) => e < INT53_MIN || e > INT53_MAX ? NaN : Number(e);
    function __localtime_js(e, r) {
      e = bigintToI53Checked(e);
      var t2 = new Date(e * 1e3);
      HEAP32[r >> 2] = t2.getSeconds(), HEAP32[r + 4 >> 2] = t2.getMinutes(), HEAP32[r + 8 >> 2] = t2.getHours(), HEAP32[r + 12 >> 2] = t2.getDate(), HEAP32[r + 16 >> 2] = t2.getMonth(), HEAP32[r + 20 >> 2] = t2.getFullYear() - 1900, HEAP32[r + 24 >> 2] = t2.getDay();
      var n2 = ydayFromDate(t2) | 0;
      HEAP32[r + 28 >> 2] = n2, HEAP32[r + 36 >> 2] = -(t2.getTimezoneOffset() * 60);
      var o2 = new Date(t2.getFullYear(), 0, 1), a2 = new Date(t2.getFullYear(), 6, 1).getTimezoneOffset(), s2 = o2.getTimezoneOffset(), l2 = (a2 != s2 && t2.getTimezoneOffset() == Math.min(s2, a2)) | 0;
      HEAP32[r + 32 >> 2] = l2;
    }
    __localtime_js.sig = "vjp";
    var __mktime_js = function(e) {
      var r = (() => {
        var t2 = new Date(HEAP32[e + 20 >> 2] + 1900, HEAP32[e + 16 >> 2], HEAP32[e + 12 >> 2], HEAP32[e + 8 >> 2], HEAP32[e + 4 >> 2], HEAP32[e >> 2], 0), n2 = HEAP32[e + 32 >> 2], o2 = t2.getTimezoneOffset(), a2 = new Date(t2.getFullYear(), 0, 1), s2 = new Date(t2.getFullYear(), 6, 1).getTimezoneOffset(), l2 = a2.getTimezoneOffset(), u2 = Math.min(l2, s2);
        if (n2 < 0) HEAP32[e + 32 >> 2] = +(s2 != l2 && u2 == o2);
        else if (n2 > 0 != (u2 == o2)) {
          var d2 = Math.max(l2, s2), c2 = n2 > 0 ? u2 : d2;
          t2.setTime(t2.getTime() + (c2 - o2) * 6e4);
        }
        HEAP32[e + 24 >> 2] = t2.getDay();
        var p2 = ydayFromDate(t2) | 0;
        HEAP32[e + 28 >> 2] = p2, HEAP32[e >> 2] = t2.getSeconds(), HEAP32[e + 4 >> 2] = t2.getMinutes(), HEAP32[e + 8 >> 2] = t2.getHours(), HEAP32[e + 12 >> 2] = t2.getDate(), HEAP32[e + 16 >> 2] = t2.getMonth(), HEAP32[e + 20 >> 2] = t2.getYear();
        var f2 = t2.getTime();
        return isNaN(f2) ? -1 : f2 / 1e3;
      })();
      return BigInt(r);
    };
    __mktime_js.sig = "jp";
    function __mmap_js(e, r, t2, n2, o2, a2, s2) {
      o2 = bigintToI53Checked(o2);
      try {
        if (isNaN(o2)) return 61;
        var l2 = SYSCALLS.getStreamFromFD(n2), u2 = FS.mmap(l2, e, o2, r, t2), d2 = u2.ptr;
        return HEAP32[a2 >> 2] = u2.allocated, HEAPU32[s2 >> 2] = d2, 0;
      } catch (c2) {
        if (typeof FS > "u" || c2.name !== "ErrnoError") throw c2;
        return -c2.errno;
      }
    }
    __mmap_js.sig = "ipiiijpp";
    function __munmap_js(e, r, t2, n2, o2, a2) {
      a2 = bigintToI53Checked(a2);
      try {
        var s2 = SYSCALLS.getStreamFromFD(o2);
        t2 & 2 && SYSCALLS.doMsync(e, s2, r, n2, a2);
      } catch (l2) {
        if (typeof FS > "u" || l2.name !== "ErrnoError") throw l2;
        return -l2.errno;
      }
    }
    __munmap_js.sig = "ippiiij";
    var timers = {}, handleException = (e) => {
      if (e instanceof ExitStatus || e == "unwind") return EXITSTATUS;
      quit_(1, e);
    }, keepRuntimeAlive = () => noExitRuntime || runtimeKeepaliveCounter > 0, _proc_exit = (e) => {
      EXITSTATUS = e, keepRuntimeAlive() || (Module.onExit?.(e), ABORT = true), quit_(e, new ExitStatus(e));
    };
    _proc_exit.sig = "vi";
    var exitJS = (e, r) => {
      EXITSTATUS = e, keepRuntimeAlive() || exitRuntime(), _proc_exit(e);
    }, _exit = exitJS;
    _exit.sig = "vi";
    var maybeExit = () => {
      if (!runtimeExited && !keepRuntimeAlive()) try {
        _exit(EXITSTATUS);
      } catch (e) {
        handleException(e);
      }
    }, callUserCallback = (e) => {
      if (!(runtimeExited || ABORT)) try {
        e(), maybeExit();
      } catch (r) {
        handleException(r);
      }
    }, _emscripten_get_now = () => performance.now();
    _emscripten_get_now.sig = "d";
    var __setitimer_js = (e, r) => {
      if (timers[e] && (clearTimeout(timers[e].id), delete timers[e]), !r) return 0;
      var t2 = setTimeout(() => {
        delete timers[e], callUserCallback(() => __emscripten_timeout(e, _emscripten_get_now()));
      }, r);
      return timers[e] = { id: t2, timeout_ms: r }, 0;
    };
    __setitimer_js.sig = "iid";
    var __tzset_js = (e, r, t2, n2) => {
      var o2 = (/* @__PURE__ */ new Date()).getFullYear(), a2 = new Date(o2, 0, 1), s2 = new Date(o2, 6, 1), l2 = a2.getTimezoneOffset(), u2 = s2.getTimezoneOffset(), d2 = Math.max(l2, u2);
      HEAPU32[e >> 2] = d2 * 60, HEAP32[r >> 2] = +(l2 != u2);
      var c2 = (m2) => {
        var _3 = m2 >= 0 ? "-" : "+", g2 = Math.abs(m2), E2 = String(Math.floor(g2 / 60)).padStart(2, "0"), y2 = String(g2 % 60).padStart(2, "0");
        return `UTC${_3}${E2}${y2}`;
      }, p2 = c2(l2), f2 = c2(u2);
      u2 < l2 ? (stringToUTF8(p2, t2, 17), stringToUTF8(f2, n2, 17)) : (stringToUTF8(p2, n2, 17), stringToUTF8(f2, t2, 17));
    };
    __tzset_js.sig = "vpppp";
    var _emscripten_date_now = () => Date.now();
    _emscripten_date_now.sig = "d";
    var runtimeKeepalivePush = () => {
      runtimeKeepaliveCounter += 1;
    };
    runtimeKeepalivePush.sig = "v";
    var _emscripten_exit_with_live_runtime = () => {
      throw runtimeKeepalivePush(), "unwind";
    };
    _emscripten_exit_with_live_runtime.sig = "v";
    var getHeapMax = () => 2147483648, growMemory = (e) => {
      var r = wasmMemory.buffer, t2 = (e - r.byteLength + 65535) / 65536 | 0;
      try {
        return wasmMemory.grow(t2), updateMemoryViews(), 1;
      } catch {
      }
    }, _emscripten_resize_heap = (e) => {
      var r = HEAPU8.length;
      e >>>= 0;
      var t2 = getHeapMax();
      if (e > t2) return false;
      for (var n2 = 1; n2 <= 4; n2 *= 2) {
        var o2 = r * (1 + 0.2 / n2);
        o2 = Math.min(o2, e + 100663296);
        var a2 = Math.min(t2, alignMemory(Math.max(e, o2), 65536)), s2 = growMemory(a2);
        if (s2) return true;
      }
      return false;
    };
    _emscripten_resize_heap.sig = "ip";
    var ENV = {}, getExecutableName = () => thisProgram || "./this.program", getEnvStrings = () => {
      if (!getEnvStrings.strings) {
        var e = (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", r = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: e, _: getExecutableName() };
        for (var t2 in ENV) ENV[t2] === void 0 ? delete r[t2] : r[t2] = ENV[t2];
        var n2 = [];
        for (var t2 in r) n2.push(`${t2}=${r[t2]}`);
        getEnvStrings.strings = n2;
      }
      return getEnvStrings.strings;
    }, stringToAscii = (e, r) => {
      for (var t2 = 0; t2 < e.length; ++t2) HEAP8[r++] = e.charCodeAt(t2);
      HEAP8[r] = 0;
    }, _environ_get = (e, r) => {
      var t2 = 0;
      return getEnvStrings().forEach((n2, o2) => {
        var a2 = r + t2;
        HEAPU32[e + o2 * 4 >> 2] = a2, stringToAscii(n2, a2), t2 += n2.length + 1;
      }), 0;
    };
    _environ_get.sig = "ipp";
    var _environ_sizes_get = (e, r) => {
      var t2 = getEnvStrings();
      HEAPU32[e >> 2] = t2.length;
      var n2 = 0;
      return t2.forEach((o2) => n2 += o2.length + 1), HEAPU32[r >> 2] = n2, 0;
    };
    _environ_sizes_get.sig = "ipp";
    function _fd_close(e) {
      try {
        var r = SYSCALLS.getStreamFromFD(e);
        return FS.close(r), 0;
      } catch (t2) {
        if (typeof FS > "u" || t2.name !== "ErrnoError") throw t2;
        return t2.errno;
      }
    }
    _fd_close.sig = "ii";
    function _fd_fdstat_get(e, r) {
      try {
        var t2 = 0, n2 = 0, o2 = 0, a2 = SYSCALLS.getStreamFromFD(e), s2 = a2.tty ? 2 : FS.isDir(a2.mode) ? 3 : FS.isLink(a2.mode) ? 7 : 4;
        return HEAP8[r] = s2, HEAP16[r + 2 >> 1] = o2, HEAP64[r + 8 >> 3] = BigInt(t2), HEAP64[r + 16 >> 3] = BigInt(n2), 0;
      } catch (l2) {
        if (typeof FS > "u" || l2.name !== "ErrnoError") throw l2;
        return l2.errno;
      }
    }
    _fd_fdstat_get.sig = "iip";
    var doReadv = (e, r, t2, n2) => {
      for (var o2 = 0, a2 = 0; a2 < t2; a2++) {
        var s2 = HEAPU32[r >> 2], l2 = HEAPU32[r + 4 >> 2];
        r += 8;
        var u2 = FS.read(e, HEAP8, s2, l2, n2);
        if (u2 < 0) return -1;
        if (o2 += u2, u2 < l2) break;
      }
      return o2;
    };
    function _fd_read(e, r, t2, n2) {
      try {
        var o2 = SYSCALLS.getStreamFromFD(e), a2 = doReadv(o2, r, t2);
        return HEAPU32[n2 >> 2] = a2, 0;
      } catch (s2) {
        if (typeof FS > "u" || s2.name !== "ErrnoError") throw s2;
        return s2.errno;
      }
    }
    _fd_read.sig = "iippp";
    function _fd_seek(e, r, t2, n2) {
      r = bigintToI53Checked(r);
      try {
        if (isNaN(r)) return 61;
        var o2 = SYSCALLS.getStreamFromFD(e);
        return FS.llseek(o2, r, t2), HEAP64[n2 >> 3] = BigInt(o2.position), o2.getdents && r === 0 && t2 === 0 && (o2.getdents = null), 0;
      } catch (a2) {
        if (typeof FS > "u" || a2.name !== "ErrnoError") throw a2;
        return a2.errno;
      }
    }
    _fd_seek.sig = "iijip";
    function _fd_sync(e) {
      try {
        var r = SYSCALLS.getStreamFromFD(e);
        return r.stream_ops?.fsync ? r.stream_ops.fsync(r) : 0;
      } catch (t2) {
        if (typeof FS > "u" || t2.name !== "ErrnoError") throw t2;
        return t2.errno;
      }
    }
    _fd_sync.sig = "ii";
    var doWritev = (e, r, t2, n2) => {
      for (var o2 = 0, a2 = 0; a2 < t2; a2++) {
        var s2 = HEAPU32[r >> 2], l2 = HEAPU32[r + 4 >> 2];
        r += 8;
        var u2 = FS.write(e, HEAP8, s2, l2, n2);
        if (u2 < 0) return -1;
        if (o2 += u2, u2 < l2) break;
      }
      return o2;
    };
    function _fd_write(e, r, t2, n2) {
      try {
        var o2 = SYSCALLS.getStreamFromFD(e), a2 = doWritev(o2, r, t2);
        return HEAPU32[n2 >> 2] = a2, 0;
      } catch (s2) {
        if (typeof FS > "u" || s2.name !== "ErrnoError") throw s2;
        return s2.errno;
      }
    }
    _fd_write.sig = "iippp";
    var inetPton4 = (e) => {
      for (var r = e.split("."), t2 = 0; t2 < 4; t2++) {
        var n2 = Number(r[t2]);
        if (isNaN(n2)) return null;
        r[t2] = n2;
      }
      return (r[0] | r[1] << 8 | r[2] << 16 | r[3] << 24) >>> 0;
    }, jstoi_q = (e) => parseInt(e), inetPton6 = (e) => {
      var r, t2, n2, o2, a2 = /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i, s2 = [];
      if (!a2.test(e)) return null;
      if (e === "::") return [0, 0, 0, 0, 0, 0, 0, 0];
      for (e.startsWith("::") ? e = e.replace("::", "Z:") : e = e.replace("::", ":Z:"), e.indexOf(".") > 0 ? (e = e.replace(new RegExp("[.]", "g"), ":"), r = e.split(":"), r[r.length - 4] = jstoi_q(r[r.length - 4]) + jstoi_q(r[r.length - 3]) * 256, r[r.length - 3] = jstoi_q(r[r.length - 2]) + jstoi_q(r[r.length - 1]) * 256, r = r.slice(0, r.length - 2)) : r = e.split(":"), n2 = 0, o2 = 0, t2 = 0; t2 < r.length; t2++) if (typeof r[t2] == "string") if (r[t2] === "Z") {
        for (o2 = 0; o2 < 8 - r.length + 1; o2++) s2[t2 + o2] = 0;
        n2 = o2 - 1;
      } else s2[t2 + n2] = _htons(parseInt(r[t2], 16));
      else s2[t2 + n2] = r[t2];
      return [s2[1] << 16 | s2[0], s2[3] << 16 | s2[2], s2[5] << 16 | s2[4], s2[7] << 16 | s2[6]];
    }, DNS = { address_map: { id: 1, addrs: {}, names: {} }, lookup_name(e) {
      var r = inetPton4(e);
      if (r !== null || (r = inetPton6(e), r !== null)) return e;
      var t2;
      if (DNS.address_map.addrs[e]) t2 = DNS.address_map.addrs[e];
      else {
        var n2 = DNS.address_map.id++;
        assert(n2 < 65535, "exceeded max address mappings of 65535"), t2 = "172.29." + (n2 & 255) + "." + (n2 & 65280), DNS.address_map.names[t2] = e, DNS.address_map.addrs[e] = t2;
      }
      return t2;
    }, lookup_addr(e) {
      return DNS.address_map.names[e] ? DNS.address_map.names[e] : null;
    } }, inetNtop4 = (e) => (e & 255) + "." + (e >> 8 & 255) + "." + (e >> 16 & 255) + "." + (e >> 24 & 255), inetNtop6 = (e) => {
      var r = "", t2 = 0, n2 = 0, o2 = 0, a2 = 0, s2 = 0, l2 = 0, u2 = [e[0] & 65535, e[0] >> 16, e[1] & 65535, e[1] >> 16, e[2] & 65535, e[2] >> 16, e[3] & 65535, e[3] >> 16], d2 = true, c2 = "";
      for (l2 = 0; l2 < 5; l2++) if (u2[l2] !== 0) {
        d2 = false;
        break;
      }
      if (d2) {
        if (c2 = inetNtop4(u2[6] | u2[7] << 16), u2[5] === -1) return r = "::ffff:", r += c2, r;
        if (u2[5] === 0) return r = "::", c2 === "0.0.0.0" && (c2 = ""), c2 === "0.0.0.1" && (c2 = "1"), r += c2, r;
      }
      for (t2 = 0; t2 < 8; t2++) u2[t2] === 0 && (t2 - o2 > 1 && (s2 = 0), o2 = t2, s2++), s2 > n2 && (n2 = s2, a2 = t2 - n2 + 1);
      for (t2 = 0; t2 < 8; t2++) {
        if (n2 > 1 && u2[t2] === 0 && t2 >= a2 && t2 < a2 + n2) {
          t2 === a2 && (r += ":", a2 === 0 && (r += ":"));
          continue;
        }
        r += Number(_ntohs(u2[t2] & 65535)).toString(16), r += t2 < 7 ? ":" : "";
      }
      return r;
    }, writeSockaddr = (e, r, t2, n2, o2) => {
      switch (r) {
        case 2:
          t2 = inetPton4(t2), zeroMemory(e, 16), HEAP16[e >> 1] = r, HEAP32[e + 4 >> 2] = t2, HEAP16[e + 2 >> 1] = _htons(n2);
          break;
        case 10:
          t2 = inetPton6(t2), zeroMemory(e, 28), HEAP32[e >> 2] = r, HEAP32[e + 8 >> 2] = t2[0], HEAP32[e + 12 >> 2] = t2[1], HEAP32[e + 16 >> 2] = t2[2], HEAP32[e + 20 >> 2] = t2[3], HEAP16[e + 2 >> 1] = _htons(n2);
          break;
        default:
          return 5;
      }
      return 0;
    }, _getaddrinfo = (e, r, t2, n2) => {
      var o2 = 0, a2 = 0, s2 = 0, l2 = 0, u2 = 0, d2 = 0, c2;
      function p2(f2, m2, _3, g2, E2, y2) {
        var A2, S2, v3, h2;
        return S2 = f2 === 10 ? 28 : 16, E2 = f2 === 10 ? inetNtop6(E2) : inetNtop4(E2), A2 = _malloc(S2), h2 = writeSockaddr(A2, f2, E2, y2), assert(!h2), v3 = _malloc(32), HEAP32[v3 + 4 >> 2] = f2, HEAP32[v3 + 8 >> 2] = m2, HEAP32[v3 + 12 >> 2] = _3, HEAPU32[v3 + 24 >> 2] = g2, HEAPU32[v3 + 20 >> 2] = A2, f2 === 10 ? HEAP32[v3 + 16 >> 2] = 28 : HEAP32[v3 + 16 >> 2] = 16, HEAP32[v3 + 28 >> 2] = 0, v3;
      }
      if (t2 && (s2 = HEAP32[t2 >> 2], l2 = HEAP32[t2 + 4 >> 2], u2 = HEAP32[t2 + 8 >> 2], d2 = HEAP32[t2 + 12 >> 2]), u2 && !d2 && (d2 = u2 === 2 ? 17 : 6), !u2 && d2 && (u2 = d2 === 17 ? 2 : 1), d2 === 0 && (d2 = 6), u2 === 0 && (u2 = 1), !e && !r) return -2;
      if (s2 & -1088 || t2 !== 0 && HEAP32[t2 >> 2] & 2 && !e) return -1;
      if (s2 & 32) return -2;
      if (u2 !== 0 && u2 !== 1 && u2 !== 2) return -7;
      if (l2 !== 0 && l2 !== 2 && l2 !== 10) return -6;
      if (r && (r = UTF8ToString(r), a2 = parseInt(r, 10), isNaN(a2))) return s2 & 1024 ? -2 : -8;
      if (!e) return l2 === 0 && (l2 = 2), s2 & 1 || (l2 === 2 ? o2 = _htonl(2130706433) : o2 = [0, 0, 0, _htonl(1)]), c2 = p2(l2, u2, d2, null, o2, a2), HEAPU32[n2 >> 2] = c2, 0;
      if (e = UTF8ToString(e), o2 = inetPton4(e), o2 !== null) if (l2 === 0 || l2 === 2) l2 = 2;
      else if (l2 === 10 && s2 & 8) o2 = [0, 0, _htonl(65535), o2], l2 = 10;
      else return -2;
      else if (o2 = inetPton6(e), o2 !== null) if (l2 === 0 || l2 === 10) l2 = 10;
      else return -2;
      return o2 != null ? (c2 = p2(l2, u2, d2, e, o2, a2), HEAPU32[n2 >> 2] = c2, 0) : s2 & 4 ? -2 : (e = DNS.lookup_name(e), o2 = inetPton4(e), l2 === 0 ? l2 = 2 : l2 === 10 && (o2 = [0, 0, _htonl(65535), o2]), c2 = p2(l2, u2, d2, null, o2, a2), HEAPU32[n2 >> 2] = c2, 0);
    };
    _getaddrinfo.sig = "ipppp";
    var stackAlloc = (e) => __emscripten_stack_alloc(e), stringToUTF8OnStack = (e) => {
      var r = lengthBytesUTF8(e) + 1, t2 = stackAlloc(r);
      return stringToUTF8(e, t2, r), t2;
    }, removeFunction = (e) => {
      functionsInTableMap.delete(getWasmTableEntry(e)), setWasmTableEntry(e, null), freeTableIndexes.push(e);
    }, stringToNewUTF8 = (e) => {
      var r = lengthBytesUTF8(e) + 1, t2 = _malloc(r);
      return t2 && stringToUTF8(e, t2, r), t2;
    }, FS_createPath = FS.createPath, FS_unlink = (e) => FS.unlink(e), FS_createLazyFile = FS.createLazyFile, FS_createDevice = FS.createDevice;
    registerWasmPlugin(), FS.createPreloadedFile = FS_createPreloadedFile, FS.staticInit(), Module.FS_createPath = FS.createPath, Module.FS_createDataFile = FS.createDataFile, Module.FS_createPreloadedFile = FS.createPreloadedFile, Module.FS_unlink = FS.unlink, Module.FS_createLazyFile = FS.createLazyFile, Module.FS_createDevice = FS.createDevice, MEMFS.doesNotExistError = new FS.ErrnoError(44), MEMFS.doesNotExistError.stack = "<generic error, no stack>";
    var wasmImports = { __call_sighandler: ___call_sighandler, __heap_base: ___heap_base, __indirect_function_table: wasmTable, __memory_base: ___memory_base, __stack_pointer: ___stack_pointer, __syscall_chmod: ___syscall_chmod, __syscall_dup3: ___syscall_dup3, __syscall_faccessat: ___syscall_faccessat, __syscall_fadvise64: ___syscall_fadvise64, __syscall_fcntl64: ___syscall_fcntl64, __syscall_fstat64: ___syscall_fstat64, __syscall_getcwd: ___syscall_getcwd, __syscall_getdents64: ___syscall_getdents64, __syscall_ioctl: ___syscall_ioctl, __syscall_lstat64: ___syscall_lstat64, __syscall_mkdirat: ___syscall_mkdirat, __syscall_newfstatat: ___syscall_newfstatat, __syscall_openat: ___syscall_openat, __syscall_readlinkat: ___syscall_readlinkat, __syscall_rmdir: ___syscall_rmdir, __syscall_stat64: ___syscall_stat64, __syscall_symlinkat: ___syscall_symlinkat, __syscall_unlinkat: ___syscall_unlinkat, __table_base: ___table_base, _abort_js: __abort_js, _emscripten_runtime_keepalive_clear: __emscripten_runtime_keepalive_clear, _emscripten_throw_longjmp: __emscripten_throw_longjmp, _localtime_js: __localtime_js, _mktime_js: __mktime_js, _mmap_js: __mmap_js, _munmap_js: __munmap_js, _setitimer_js: __setitimer_js, _tzset_js: __tzset_js, emscripten_date_now: _emscripten_date_now, emscripten_exit_with_live_runtime: _emscripten_exit_with_live_runtime, emscripten_get_now: _emscripten_get_now, emscripten_resize_heap: _emscripten_resize_heap, environ_get: _environ_get, environ_sizes_get: _environ_sizes_get, exit: _exit, fd_close: _fd_close, fd_fdstat_get: _fd_fdstat_get, fd_read: _fd_read, fd_seek: _fd_seek, fd_sync: _fd_sync, fd_write: _fd_write, getaddrinfo: _getaddrinfo, invoke_ii, invoke_iiii, invoke_vii, memory: wasmMemory, proc_exit: _proc_exit }, wasmExports;
    createWasm();
    Module._pgl_exit = (e) => (Module._pgl_exit = wasmExports.pgl_exit)(e);
    Module.___errno_location = () => (Module.___errno_location = wasmExports.__errno_location)();
    var _fflush = Module._fflush = (e) => (_fflush = Module._fflush = wasmExports.fflush)(e);
    Module._fopen = (e, r) => (Module._fopen = wasmExports.fopen)(e, r);
    Module._fclose = (e) => (Module._fclose = wasmExports.fclose)(e);
    Module._pgl_popen = (e, r) => (Module._pgl_popen = wasmExports.pgl_popen)(e, r);
    Module._fputs = (e, r) => (Module._fputs = wasmExports.fputs)(e, r);
    Module._main = (e, r) => (Module._main = wasmExports.__main_argc_argv)(e, r);
    Module._pgl_atexit = (e) => (Module._pgl_atexit = wasmExports.pgl_atexit)(e);
    Module._pgl_geteuid = () => (Module._pgl_geteuid = wasmExports.pgl_geteuid)();
    Module._pgl_system = (e) => (Module._pgl_system = wasmExports.pgl_system)(e);
    var _malloc = (e) => (_malloc = wasmExports.malloc)(e), _calloc = (e, r) => (_calloc = wasmExports.calloc)(e, r);
    Module._pgl_setsockopt = (e, r, t2, n2, o2) => (Module._pgl_setsockopt = wasmExports.pgl_setsockopt)(e, r, t2, n2, o2);
    Module._pgl_connect = (e, r, t2) => (Module._pgl_connect = wasmExports.pgl_connect)(e, r, t2);
    Module._pgl_send = (e, r, t2, n2) => (Module._pgl_send = wasmExports.pgl_send)(e, r, t2, n2);
    Module._pgl_recv = (e, r, t2, n2) => (Module._pgl_recv = wasmExports.pgl_recv)(e, r, t2, n2);
    Module._fgets = (e, r, t2) => (Module._fgets = wasmExports.fgets)(e, r, t2);
    Module._pgl_getsockopt = (e, r, t2, n2, o2) => (Module._pgl_getsockopt = wasmExports.pgl_getsockopt)(e, r, t2, n2, o2);
    Module._pgl_getsockname = (e, r, t2) => (Module._pgl_getsockname = wasmExports.pgl_getsockname)(e, r, t2);
    Module._pgl_poll = (e, r, t2) => (Module._pgl_poll = wasmExports.pgl_poll)(e, r, t2);
    Module._clear_setitimer = () => (Module._clear_setitimer = wasmExports.clear_setitimer)();
    Module._pgl_getPGliteExitStatus = () => (Module._pgl_getPGliteExitStatus = wasmExports.pgl_getPGliteExitStatus)();
    Module._pgl_setPGliteExitStatus = (e) => (Module._pgl_setPGliteExitStatus = wasmExports.pgl_setPGliteExitStatus)(e);
    Module._pgl_longjmp = (e, r) => (Module._pgl_longjmp = wasmExports.pgl_longjmp)(e, r);
    Module._pgl_siglongjmp = (e, r) => (Module._pgl_siglongjmp = wasmExports.pgl_siglongjmp)(e, r);
    Module._pgl_set_system_fn = (e) => (Module._pgl_set_system_fn = wasmExports.pgl_set_system_fn)(e);
    Module._pgl_set_popen_fn = (e) => (Module._pgl_set_popen_fn = wasmExports.pgl_set_popen_fn)(e);
    Module._pgl_set_pclose_fn = (e) => (Module._pgl_set_pclose_fn = wasmExports.pgl_set_pclose_fn)(e);
    Module._pgl_pclose = (e) => (Module._pgl_pclose = wasmExports.pgl_pclose)(e);
    Module._pclose = (e) => (Module._pclose = wasmExports.pclose)(e);
    Module._pgl_getuid = () => (Module._pgl_getuid = wasmExports.pgl_getuid)();
    Module._pgl_getpwuid = (e) => (Module._pgl_getpwuid = wasmExports.pgl_getpwuid)(e);
    Module._pgl_run_atexit_funcs = () => (Module._pgl_run_atexit_funcs = wasmExports.pgl_run_atexit_funcs)();
    Module._pgl_freopen = (e, r, t2) => (Module._pgl_freopen = wasmExports.pgl_freopen)(e, r, t2);
    Module._pgl_shmget = (e, r, t2) => (Module._pgl_shmget = wasmExports.pgl_shmget)(e, r, t2);
    Module._pgl_shmat = (e, r, t2) => (Module._pgl_shmat = wasmExports.pgl_shmat)(e, r, t2);
    Module._pgl_shmdt = (e) => (Module._pgl_shmdt = wasmExports.pgl_shmdt)(e);
    Module._pgl_shmctl = (e, r, t2) => (Module._pgl_shmctl = wasmExports.pgl_shmctl)(e, r, t2);
    Module._pgl_munmap = (e, r) => (Module._pgl_munmap = wasmExports.pgl_munmap)(e, r);
    Module._pgl_set_rw_cbs = (e, r) => (Module._pgl_set_rw_cbs = wasmExports.pgl_set_rw_cbs)(e, r);
    Module._pgl_fcntl = (e, r, t2) => (Module._pgl_fcntl = wasmExports.pgl_fcntl)(e, r, t2);
    Module._strerror = (e) => (Module._strerror = wasmExports.strerror)(e);
    var ___funcs_on_exit = () => (___funcs_on_exit = wasmExports.__funcs_on_exit)(), _htonl = (e) => (_htonl = wasmExports.htonl)(e), _htons = (e) => (_htons = wasmExports.htons)(e), _emscripten_builtin_memalign = (e, r) => (_emscripten_builtin_memalign = wasmExports.emscripten_builtin_memalign)(e, r), _ntohs = (e) => (_ntohs = wasmExports.ntohs)(e), __emscripten_timeout = (e, r) => (__emscripten_timeout = wasmExports._emscripten_timeout)(e, r), _setThrew = (e, r) => (_setThrew = wasmExports.setThrew)(e, r), __emscripten_stack_restore = (e) => (__emscripten_stack_restore = wasmExports._emscripten_stack_restore)(e), __emscripten_stack_alloc = (e) => (__emscripten_stack_alloc = wasmExports._emscripten_stack_alloc)(e), _emscripten_stack_get_current = () => (_emscripten_stack_get_current = wasmExports.emscripten_stack_get_current)();
    function invoke_iiii(e, r, t2, n2) {
      var o2 = stackSave();
      try {
        return getWasmTableEntry(e)(r, t2, n2);
      } catch (a2) {
        if (stackRestore(o2), a2 !== a2 + 0) throw a2;
        _setThrew(1, 0);
      }
    }
    function invoke_ii(e, r) {
      var t2 = stackSave();
      try {
        return getWasmTableEntry(e)(r);
      } catch (n2) {
        if (stackRestore(t2), n2 !== n2 + 0) throw n2;
        _setThrew(1, 0);
      }
    }
    function invoke_vii(e, r, t2) {
      var n2 = stackSave();
      try {
        getWasmTableEntry(e)(r, t2);
      } catch (o2) {
        if (stackRestore(n2), o2 !== o2 + 0) throw o2;
        _setThrew(1, 0);
      }
    }
    Module.addRunDependency = addRunDependency, Module.removeRunDependency = removeRunDependency, Module.callMain = callMain, Module.ENV = ENV, Module.addFunction = addFunction, Module.removeFunction = removeFunction, Module.UTF8ToString = UTF8ToString, Module.stringToNewUTF8 = stringToNewUTF8, Module.stringToUTF8OnStack = stringToUTF8OnStack, Module.FS_createPreloadedFile = FS_createPreloadedFile, Module.FS_unlink = FS_unlink, Module.FS_createPath = FS_createPath, Module.FS_createDevice = FS_createDevice, Module.FS = FS, Module.FS_createDataFile = FS_createDataFile, Module.FS_createLazyFile = FS_createLazyFile, Module.MEMFS = MEMFS, Module.PROXYFS = PROXYFS;
    var calledRun;
    dependenciesFulfilled = function e() {
      calledRun || run(), calledRun || (dependenciesFulfilled = e);
    };
    function callMain(e = []) {
      var r = resolveGlobalSymbol("main").sym;
      if (r) {
        e.unshift(thisProgram);
        var t2 = e.length, n2 = stackAlloc((t2 + 1) * 4), o2 = n2;
        e.forEach((s2) => {
          HEAPU32[o2 >> 2] = stringToUTF8OnStack(s2), o2 += 4;
        }), HEAPU32[o2 >> 2] = 0;
        try {
          var a2 = r(t2, n2);
          return exitJS(a2, true), a2;
        } catch (s2) {
          return handleException(s2);
        }
      }
    }
    function run(e = arguments_) {
      if (runDependencies > 0 || (preRun(), runDependencies > 0)) return;
      function r() {
        calledRun || (calledRun = true, Module.calledRun = true, !ABORT && (initRuntime(), preMain(), readyPromiseResolve(Module), Module.onRuntimeInitialized?.(), shouldRunNow && callMain(e), postRun()));
      }
      Module.setStatus ? (Module.setStatus("Running..."), setTimeout(() => {
        setTimeout(() => Module.setStatus(""), 1), r();
      }, 1)) : r();
    }
    if (Module.preInit) for (typeof Module.preInit == "function" && (Module.preInit = [Module.preInit]); Module.preInit.length > 0; ) Module.preInit.pop()();
    var shouldRunNow = false;
    return Module.noInitialRun && (shouldRunNow = false), run(), quit_ = (e, r) => {
      throw r;
    }, moduleRtn = readyPromise, moduleRtn;
  };
})(), xe$1 = Dr;
var Ie$1 = xe$1;
u$1();
var Be$1 = "(?:" + ["\\|\\|", "\\&\\&", ";;", "\\|\\&", "\\<\\(", "\\<\\<\\<", ">>", ">\\&", "<\\&", "[&;()|<>]"].join("|") + ")", Ue$1 = new RegExp("^" + Be$1 + "$"), He$1 = "|&;()<> \\t", Nr = '"((\\\\"|[^"])*?)"', xr = "'((\\\\'|[^'])*?)'", Ir = /^#$/, Le = "'", Ce$1 = '"', de$1 = "$", C = "", Ur = 4294967296;
for (let e = 0; e < 4; e++) C += (Ur * Math.random()).toString(16);
function Lr(e, r) {
  let t2 = r.lastIndex, n2 = [], o2;
  for (; o2 = r.exec(e); ) n2.push(o2), r.lastIndex === o2.index && (r.lastIndex += 1);
  return r.lastIndex = t2, n2;
}
function Cr(e, r, t2) {
  let n2 = typeof e == "function" ? e(t2) : e[t2];
  return typeof n2 > "u" && t2 !== "" ? n2 = "" : typeof n2 > "u" && (n2 = "$"), typeof n2 == "object" ? r + C + JSON.stringify(n2) + C : r + n2;
}
function Br(e, r, t2) {
  t2 || (t2 = {});
  let n2 = t2.escape || "\\", o2 = "(\\" + n2 + `['"` + He$1 + `]|[^\\s'"` + He$1 + "])+", a2 = new RegExp(["(" + Be$1 + ")", "(" + o2 + "|" + Nr + "|" + xr + ")+"].join("|"), "g"), s2 = Lr(e, a2);
  if (s2.length === 0) return [];
  r || (r = {});
  let l2 = false;
  return s2.map(function(u2) {
    let d2 = u2[0];
    if (!d2 || l2) return;
    if (Ue$1.test(d2)) return { op: d2 };
    let c2 = false, p2 = false, f2 = "", m2 = false, _3;
    function g2() {
      _3 += 1;
      let E2, y2, A2 = d2.charAt(_3);
      if (A2 === "{") {
        if (_3 += 1, d2.charAt(_3) === "}") throw new Error("Bad substitution: " + d2.slice(_3 - 2, _3 + 1));
        if (E2 = d2.indexOf("}", _3), E2 < 0) throw new Error("Bad substitution: " + d2.slice(_3));
        y2 = d2.slice(_3, E2), _3 = E2;
      } else if (/[*@#?$!_-]/.test(A2)) y2 = A2, _3 += 1;
      else {
        let S2 = d2.slice(_3), v3 = S2.match(/[^\w\d_]/);
        v3 ? (y2 = S2.slice(0, v3.index), _3 += v3.index - 1) : (y2 = S2, _3 = d2.length);
      }
      return Cr(r, "", y2);
    }
    for (_3 = 0; _3 < d2.length; _3++) {
      let E2 = d2.charAt(_3);
      if (m2 = m2 || !c2 && (E2 === "*" || E2 === "?"), p2) f2 += E2, p2 = false;
      else if (c2) E2 === c2 ? c2 = false : c2 === Le ? f2 += E2 : E2 === n2 ? (_3 += 1, E2 = d2.charAt(_3), E2 === Ce$1 || E2 === n2 || E2 === de$1 ? f2 += E2 : f2 += n2 + E2) : E2 === de$1 ? f2 += g2() : f2 += E2;
      else if (E2 === Ce$1 || E2 === Le) c2 = E2;
      else {
        if (Ue$1.test(E2)) return { op: d2 };
        if (Ir.test(E2)) {
          l2 = true;
          let y2 = { comment: e.slice(u2.index + _3 + 1) };
          return f2.length ? [f2, y2] : [y2];
        } else E2 === n2 ? p2 = true : E2 === de$1 ? f2 += g2() : f2 += E2;
      }
    }
    return m2 ? { op: "glob", pattern: f2 } : f2;
  }).reduce(function(u2, d2) {
    return typeof d2 > "u" ? u2 : u2.concat(d2);
  }, []);
}
function ce$1(e, r, t2) {
  let n2 = Br(e, r, t2);
  return n2;
}
function zr(e, r) {
  if (!e) throw new Error(r ?? "Assertion failed");
}
var I$1 = "/pglite", B = I$1 + "/data", jr = I$1 + "/icu", Gr = I$1 + "/bin/initdb", wt = I$1 + "/bin/postgres", ze = I$1 + "/pgstdout", je$1 = I$1 + "/pgstdin";
function G$1(e, ...r) {
  e && e > 0 && console.log("initdb: ", ...r);
}
async function Yr({ pg: e, debug: r, args: t2, wasmModule: n2 }) {
  let o2, a2, s2, l2 = false, u2 = [], d2 = 0, c2 = -1, p$12 = -1, f2 = "", m2 = "", _3 = (S2) => {
    let v3 = S2.shift();
    G$1(r, "initdb: firstArg", v3), zr(v3 === "/pglite/bin/postgres", `trying to execute ${v3}`), e.Module.HEAPU8.set(g2), G$1(r, "executing pg main with", S2);
    let h2 = e.callMain(S2);
    return G$1(r, h2), u2 = [], h2;
  }, g2 = e.Module.HEAPU8.slice(), y2 = await Ie$1({ arguments: t2, noExitRuntime: false, thisProgram: Gr, stdin: () => null, print: (S2) => {
    m2 += S2, G$1(r, "initdbout", S2);
  }, printErr: (S2) => {
    f2 += S2, G$1(r, "initdberr", S2);
  }, instantiateWasm: (S2, v3) => {
    let h2 = new URL("./initdb.wasm", import.meta.url);
    return p.instantiateWasm(S2, h2, n2).then(({ instance: b2, module: F2 }) => {
      v3(b2, F2);
    }), {};
  }, preRun: [(S2) => {
    S2.ENV.PGDATA = B, S2.ENV.HOME = "/home/postgres", S2.ENV.USER = "postgres", S2.ENV.LOGNAME = "postgres", S2.ENV.ICU_DATA = jr;
  }, (S2) => {
    S2.onRuntimeInitialized = () => {
      o2 = S2.addFunction((v3) => (u2 = Ge(S2.UTF8ToString(v3)), _3(u2)), "pi"), S2._pgl_set_system_fn(o2), a2 = S2.addFunction((v3, h2) => {
        let b2 = S2.UTF8ToString(h2);
        if (u2 = Ge(S2.UTF8ToString(v3)), b2 === "r") return d2 = _3(u2), c2;
        if (b2 === "w") return l2 = true, p$12;
        throw `Unexpected popen mode value ${b2}`;
      }, "ppi"), S2._pgl_set_popen_fn(a2), s2 = S2.addFunction((v3) => v3 === c2 || v3 === p$12 ? (l2 && (l2 = false, d2 = _3(u2)), d2) : S2._pclose(v3), "pi"), S2._pgl_set_pclose_fn(s2);
      {
        let v3 = e.Module.stringToUTF8OnStack(je$1), h2 = e.Module.stringToUTF8OnStack("r");
        e.Module._pgl_freopen(v3, h2, 0);
        let b2 = e.Module.stringToUTF8OnStack(ze), F2 = e.Module.stringToUTF8OnStack("w");
        e.Module._pgl_freopen(b2, F2, 1);
      }
      {
        let v3 = S2.stringToUTF8OnStack(ze), h2 = S2.stringToUTF8OnStack("r");
        c2 = S2._fopen(v3, h2);
        let b2 = S2.stringToUTF8OnStack(je$1), F2 = S2.stringToUTF8OnStack("w");
        p$12 = S2._fopen(b2, F2);
      }
    };
  }, (S2) => {
    S2.FS.mkdir(I$1), S2.FS.mount(S2.PROXYFS, { root: I$1, fs: e.Module.FS }, I$1);
  }] });
  return G$1(r, "calling initdb.main with", t2), { exitCode: y2.callMain(t2), stderr: f2, stdout: m2, dataFolder: B };
}
function Ge(e) {
  let r = [], t2 = ce$1(e);
  for (let n2 = 0; n2 < t2.length; n2++) {
    let o2 = t2[n2];
    if (typeof o2 == "object" && "op" in o2) break;
    typeof o2 == "string" && r.push(o2);
  }
  return r;
}
async function At({ pg: e, debug: r, args: t2, wasmModule: n2 }) {
  return await Yr({ pg: e, debug: r, args: ["--allow-group-access", "--encoding", "UTF8", "--locale=C.UTF-8", "--locale-provider=libc", "--auth=trust", ...t2 ?? []], wasmModule: n2 });
}
var Ye$1 = class Ye2 {
  constructor(r) {
    this.dataDir = r;
  }
  async init(r, t2) {
    return this.pg = r, { emscriptenOpts: t2 };
  }
  async syncToFs(r) {
  }
  async initialSyncFs() {
  }
  async closeFs() {
  }
  async dumpTar(r, t2) {
    return ue$1(this.pg.Module.FS, B, r, t2);
  }
}, We$1 = class We2 {
  constructor(r, { debug: t2 = false } = {}) {
    this.dataDir = r, this.debug = t2;
  }
  async syncToFs(r) {
  }
  async initialSyncFs() {
  }
  async closeFs() {
  }
  async dumpTar(r, t2) {
    return ue$1(this.pg.Module.FS, B, r, t2);
  }
  async init(r, t2) {
    return this.pg = r, { emscriptenOpts: { ...t2, preRun: [...t2.preRun || [], (o2) => {
      let a2 = Wr(o2, this);
      o2.FS.mkdir(B), o2.FS.mount(a2, {}, B);
    }] } };
  }
}, Ve$1 = { EBADF: 8, EBADFD: 127, EEXIST: 20, EINVAL: 28, EISDIR: 31, ENODEV: 43, ENOENT: 44, ENOTDIR: 54, ENOTEMPTY: 55 }, Wr = (e, r) => {
  let t2 = e.FS, n2 = r.debug ? console.log : null, o2 = { tryFSOperation(a2) {
    try {
      return a2();
    } catch (s2) {
      throw s2.code ? s2.code === "UNKNOWN" ? new t2.ErrnoError(Ve$1.EINVAL) : new t2.ErrnoError(s2.code) : s2;
    }
  }, mount(a2) {
    return o2.createNode(null, "/", 16895, 0);
  }, syncfs(a2, s2, l2) {
  }, createNode(a2, s2, l2, u2) {
    if (!t2.isDir(l2) && !t2.isFile(l2)) throw new t2.ErrnoError(28);
    let d2 = t2.createNode(a2, s2, l2);
    return d2.node_ops = o2.node_ops, d2.stream_ops = o2.stream_ops, d2;
  }, getMode: function(a2) {
    return n2?.("getMode", a2), o2.tryFSOperation(() => r.lstat(a2).mode);
  }, realPath: function(a2) {
    let s2 = [];
    for (; a2.parent !== a2; ) s2.push(a2.name), a2 = a2.parent;
    return s2.push(a2.mount.opts.root), s2.reverse(), s2.join("/");
  }, node_ops: { getattr(a2) {
    n2?.("getattr", o2.realPath(a2));
    let s2 = o2.realPath(a2);
    return o2.tryFSOperation(() => {
      let l2 = r.lstat(s2);
      return { ...l2, dev: 0, ino: a2.id, nlink: 1, rdev: a2.rdev, atime: new Date(l2.atime), mtime: new Date(l2.mtime), ctime: new Date(l2.ctime) };
    });
  }, setattr(a2, s2) {
    n2?.("setattr", o2.realPath(a2), s2);
    let l2 = o2.realPath(a2);
    o2.tryFSOperation(() => {
      s2.mode !== void 0 && r.chmod(l2, s2.mode), s2.size !== void 0 && r.truncate(l2, s2.size), s2.timestamp !== void 0 && r.utimes(l2, s2.timestamp, s2.timestamp), s2.size !== void 0 && r.truncate(l2, s2.size);
    });
  }, lookup(a2, s2) {
    n2?.("lookup", o2.realPath(a2), s2);
    let l2 = [o2.realPath(a2), s2].join("/"), u2 = o2.getMode(l2);
    return o2.createNode(a2, s2, u2);
  }, mknod(a2, s2, l2, u2) {
    n2?.("mknod", o2.realPath(a2), s2, l2, u2);
    let d2 = o2.createNode(a2, s2, l2, u2), c2 = o2.realPath(d2);
    return o2.tryFSOperation(() => (t2.isDir(d2.mode) ? r.mkdir(c2, { mode: l2 }) : r.writeFile(c2, "", { mode: l2 }), d2));
  }, rename(a2, s2, l2) {
    n2?.("rename", o2.realPath(a2), o2.realPath(s2), l2);
    let u2 = o2.realPath(a2), d2 = [o2.realPath(s2), l2].join("/");
    o2.tryFSOperation(() => {
      r.rename(u2, d2);
    }), a2.name = l2;
  }, unlink(a2, s2) {
    n2?.("unlink", o2.realPath(a2), s2);
    let l2 = [o2.realPath(a2), s2].join("/");
    try {
      r.unlink(l2);
    } catch {
    }
  }, rmdir(a2, s2) {
    n2?.("rmdir", o2.realPath(a2), s2);
    let l2 = [o2.realPath(a2), s2].join("/");
    return o2.tryFSOperation(() => {
      r.rmdir(l2);
    });
  }, readdir(a2) {
    n2?.("readdir", o2.realPath(a2));
    let s2 = o2.realPath(a2);
    return o2.tryFSOperation(() => r.readdir(s2));
  }, symlink(a2, s2, l2) {
    throw n2?.("symlink", o2.realPath(a2), s2, l2), new t2.ErrnoError(63);
  }, readlink(a2) {
    throw n2?.("readlink", o2.realPath(a2)), new t2.ErrnoError(63);
  } }, stream_ops: { open(a2) {
    n2?.("open stream", o2.realPath(a2.node));
    let s2 = o2.realPath(a2.node);
    return o2.tryFSOperation(() => {
      t2.isFile(a2.node.mode) && (a2.shared.refcount = 1, a2.nfd = r.open(s2));
    });
  }, close(a2) {
    return n2?.("close stream", o2.realPath(a2.node)), o2.tryFSOperation(() => {
      t2.isFile(a2.node.mode) && a2.nfd && --a2.shared.refcount === 0 && r.close(a2.nfd);
    });
  }, dup(a2) {
    n2?.("dup stream", o2.realPath(a2.node)), a2.shared.refcount++;
  }, read(a2, s2, l2, u2, d2) {
    return n2?.("read stream", o2.realPath(a2.node), l2, u2, d2), u2 === 0 ? 0 : o2.tryFSOperation(() => r.read(a2.nfd, s2, l2, u2, d2));
  }, write(a2, s2, l2, u2, d2) {
    return n2?.("write stream", o2.realPath(a2.node), l2, u2, d2), o2.tryFSOperation(() => r.write(a2.nfd, s2.buffer, l2, u2, d2));
  }, llseek(a2, s2, l2) {
    n2?.("llseek stream", o2.realPath(a2.node), s2, l2);
    let u2 = s2;
    if (l2 === 1 ? u2 += a2.position : l2 === 2 && t2.isFile(a2.node.mode) && o2.tryFSOperation(() => {
      let d2 = r.fstat(a2.nfd);
      u2 += d2.size;
    }), u2 < 0) throw new t2.ErrnoError(28);
    return u2;
  }, mmap(a2, s2, l2, u2, d2) {
    if (n2?.("mmap stream", o2.realPath(a2.node), s2, l2, u2, d2), !t2.isFile(a2.node.mode)) throw new t2.ErrnoError(Ve$1.ENODEV);
    let c2 = e.mmapAlloc(s2);
    return o2.stream_ops.read(a2, e.HEAP8, c2, s2, l2), { ptr: c2, allocated: true };
  }, msync(a2, s2, l2, u2, d2) {
    return n2?.("msync stream", o2.realPath(a2.node), l2, u2, d2), o2.stream_ops.write(a2, s2, 0, u2, l2), 0;
  } } };
  return o2;
};
u$1();
async function v(s2, e, r, n2) {
  if (!r || r.length === 0) return e;
  n2 = n2 ?? s2;
  let t2 = [];
  try {
    await s2.execProtocol($e$1.parse({ text: e }), { syncToFs: false }), t2.push(...(await s2.execProtocol($e$1.describe({ type: "S" }), { syncToFs: false })).messages);
  } finally {
    t2.push(...(await s2.execProtocol($e$1.sync(), { syncToFs: false })).messages);
  }
  let a2 = bn(t2), i2 = e.replace(/\$([0-9]+)/g, (d2, l2) => "%" + l2 + "$L");
  return (await n2.query(`SELECT format($1, ${r.map((d2, l2) => `$${l2 + 2}`).join(", ")}) as query`, [i2, ...r], { paramTypes: [ge$1, ...a2] })).rows[0].query;
}
u$1();
u$1();
u$1();
var gt = new Error("request for lock canceled"), ft = function(e, t2, r, a2) {
  function o2(_3) {
    return _3 instanceof r ? _3 : new r(function(s2) {
      s2(_3);
    });
  }
  return new (r || (r = Promise))(function(_3, s2) {
    function n2(p2) {
      try {
        d2(a2.next(p2));
      } catch (m2) {
        s2(m2);
      }
    }
    function l2(p2) {
      try {
        d2(a2.throw(p2));
      } catch (m2) {
        s2(m2);
      }
    }
    function d2(p2) {
      p2.done ? _3(p2.value) : o2(p2.value).then(n2, l2);
    }
    d2((a2 = a2.apply(e, [])).next());
  });
}, Ie = class {
  constructor(t2, r = gt) {
    this._value = t2, this._cancelError = r, this._weightedQueues = [], this._weightedWaiters = [];
  }
  acquire(t2 = 1) {
    if (t2 <= 0) throw new Error(`invalid weight ${t2}: must be positive`);
    return new Promise((r, a2) => {
      this._weightedQueues[t2 - 1] || (this._weightedQueues[t2 - 1] = []), this._weightedQueues[t2 - 1].push({ resolve: r, reject: a2 }), this._dispatch();
    });
  }
  runExclusive(t2, r = 1) {
    return ft(this, void 0, void 0, function* () {
      let [a2, o2] = yield this.acquire(r);
      try {
        return yield t2(a2);
      } finally {
        o2();
      }
    });
  }
  waitForUnlock(t2 = 1) {
    if (t2 <= 0) throw new Error(`invalid weight ${t2}: must be positive`);
    return new Promise((r) => {
      this._weightedWaiters[t2 - 1] || (this._weightedWaiters[t2 - 1] = []), this._weightedWaiters[t2 - 1].push(r), this._dispatch();
    });
  }
  isLocked() {
    return this._value <= 0;
  }
  getValue() {
    return this._value;
  }
  setValue(t2) {
    this._value = t2, this._dispatch();
  }
  release(t2 = 1) {
    if (t2 <= 0) throw new Error(`invalid weight ${t2}: must be positive`);
    this._value += t2, this._dispatch();
  }
  cancel() {
    this._weightedQueues.forEach((t2) => t2.forEach((r) => r.reject(this._cancelError))), this._weightedQueues = [];
  }
  _dispatch() {
    var t2;
    for (let r = this._value; r > 0; r--) {
      let a2 = (t2 = this._weightedQueues[r - 1]) === null || t2 === void 0 ? void 0 : t2.shift();
      if (!a2) continue;
      let o2 = this._value, _3 = r;
      this._value -= r, r = this._value + 1, a2.resolve([o2, this._newReleaser(_3)]);
    }
    this._drainUnlockWaiters();
  }
  _newReleaser(t2) {
    let r = false;
    return () => {
      r || (r = true, this.release(t2));
    };
  }
  _drainUnlockWaiters() {
    for (let t2 = this._value; t2 > 0; t2--) this._weightedWaiters[t2 - 1] && (this._weightedWaiters[t2 - 1].forEach((r) => r()), this._weightedWaiters[t2 - 1] = []);
  }
}, vt = function(e, t2, r, a2) {
  function o2(_3) {
    return _3 instanceof r ? _3 : new r(function(s2) {
      s2(_3);
    });
  }
  return new (r || (r = Promise))(function(_3, s2) {
    function n2(p2) {
      try {
        d2(a2.next(p2));
      } catch (m2) {
        s2(m2);
      }
    }
    function l2(p2) {
      try {
        d2(a2.throw(p2));
      } catch (m2) {
        s2(m2);
      }
    }
    function d2(p2) {
      p2.done ? _3(p2.value) : o2(p2.value).then(n2, l2);
    }
    d2((a2 = a2.apply(e, [])).next());
  });
}, J = class {
  constructor(t2) {
    this._semaphore = new Ie(1, t2);
  }
  acquire() {
    return vt(this, void 0, void 0, function* () {
      let [, t2] = yield this._semaphore.acquire();
      return t2;
    });
  }
  runExclusive(t2) {
    return this._semaphore.runExclusive(() => t2());
  }
  isLocked() {
    return this._semaphore.isLocked();
  }
  waitForUnlock() {
    return this._semaphore.waitForUnlock();
  }
  release() {
    this._semaphore.isLocked() && this._semaphore.release();
  }
  cancel() {
    return this._semaphore.cancel();
  }
};
u$1();
var Be = L$1(Re$1());
async function Re(e) {
  if (p.IN_NODE) {
    let t2 = await import("fs"), r = await import("zlib"), { Writable: a2 } = await import("stream"), { pipeline: o2 } = await import("stream/promises");
    if (!t2.existsSync(e)) throw new Error(`Extension bundle not found: ${e}`);
    let _3 = r.createGunzip(), s2 = [];
    return await o2(t2.createReadStream(e), _3, new a2({ write(n2, l2, d2) {
      s2.push(n2), d2();
    } })), new Blob(s2);
  } else {
    let t2 = await fetch(e.toString());
    if (!t2.ok || !t2.body) return null;
    if (t2.headers.get("Content-Encoding") === "gzip") return t2.blob();
    {
      let r = new DecompressionStream("gzip");
      return new Response(t2.body.pipeThrough(r)).blob();
    }
  }
}
async function Ue(e, t2) {
  let r = new Array();
  for (let a2 in e.pg_extensions) {
    let o2;
    try {
      o2 = await e.pg_extensions[a2];
    } catch (_3) {
      console.error("Failed to fetch extension:", a2, _3);
      continue;
    }
    if (o2) {
      let _3 = new Uint8Array(await o2.arrayBuffer());
      r.push(...Et(e, a2, _3, t2));
    } else console.error("Could not get binary data for extension:", a2);
  }
  return Promise.all(r);
}
function Et(e, t2, r, a2) {
  let o2 = [];
  return Be.default.untar(r).sort((s2, n2) => s2.name > n2.name ? 1 : s2.name < n2.name ? -1 : 0).forEach((s2) => {
    if (s2.name.endsWith("/")) {
      let n2 = `${e.WASM_PREFIX}/${s2.name}`;
      e.FS.analyzePath(n2).exists === false && e.FS.mkdirTree(n2);
    } else if (!s2.name.startsWith(".")) {
      let n2 = e.WASM_PREFIX + "/" + s2.name;
      if (s2.name.endsWith(".so")) {
        a2(`pgfs:ext preloading ${n2}`);
        let l2 = s2.name.split("/").pop(), d2 = Mt(n2), p2 = new Promise((m2, g2) => {
          let u2 = (...c2) => {
            a2("pgfs:ext OK", n2, c2), m2();
          }, f2 = (...c2) => {
            a2("pgfs:ext FAIL", n2, c2), fe(e.FS, n2, s2.data), m2();
          };
          e.FS.createPreloadedFile(d2, l2, s2.data, true, true, u2, f2, false);
        });
        o2.push(p2);
      } else fe(e.FS, n2, s2.data);
    }
  }), o2;
}
function fe(e, t2, r, a2) {
  try {
    let o2 = t2.substring(0, t2.lastIndexOf("/"));
    e.analyzePath(o2).exists === false && e.mkdirTree(o2), e.writeFile(t2, r), a2 && e.chmod(t2, a2);
  } catch (o2) {
    throw console.error(`Error writing file ${t2}`, o2), o2;
  }
}
function Mt(e) {
  let t2 = e.lastIndexOf("/");
  return t2 > 0 ? e.slice(0, t2) : e;
}
u$1();
u$1();
var ve = class extends Ye$1 {
  async init(t2, r) {
    return this.pg = t2, { emscriptenOpts: { ...r, preRun: [...r.preRun || [], (o2) => {
      let _3 = o2.FS.filesystems.IDBFS;
      o2.FS.analyzePath(I$1).exists || o2.FS.mkdir(I$1), o2.FS.analyzePath(`${I$1}/${this.dataDir}`).exists || o2.FS.mkdir(`${I$1}/${this.dataDir}`), o2.FS.mount(_3, {}, `${I$1}/${this.dataDir}`), o2.FS.symlink(`${I$1}/${this.dataDir}`, B);
    }] } };
  }
  initialSyncFs() {
    return new Promise((t2, r) => {
      this.pg.Module.FS.syncfs(true, (a2) => {
        a2 ? r(a2) : t2();
      });
    });
  }
  syncToFs(t2) {
    return new Promise((r, a2) => {
      this.pg.Module.FS.syncfs(false, (o2) => {
        o2 ? a2(o2) : r();
      });
    });
  }
  async closeFs() {
    let t2 = this.pg.Module.FS.filesystems.IDBFS.dbs[this.dataDir];
    t2 && t2.close(), this.pg.Module.FS.quit();
  }
};
u$1();
var Ee = class extends Ye$1 {
  async closeFs() {
    this.pg.Module.FS.quit();
  }
};
function Ze(e) {
  let t2;
  if (e?.startsWith("file://")) {
    if (e = e.slice(7), !e) throw new Error("Invalid dataDir, must be a valid path");
    t2 = "nodefs";
  } else e?.startsWith("idb://") ? (e = e.slice(6), t2 = "idbfs") : e?.startsWith("opfs-ahp://") ? (e = e.slice(11), t2 = "opfs-ahp") : !e || e?.startsWith("memory://") ? t2 = "memoryfs" : t2 = "nodefs";
  return { dataDir: e, fsType: t2 };
}
async function je(e, t2) {
  let r;
  if (e && t2 === "nodefs") {
    let { NodeFS: a2 } = await import("./nodefs-BRSDOmys.js");
    r = new a2(e);
  } else if (e && t2 === "idbfs") r = new ve(e);
  else if (e && t2 === "opfs-ahp") {
    let { OpfsAhpFS: a2 } = await import("./opfs-ahp-Dkh4zbn3.js");
    r = new a2(e);
  } else r = new Ee();
  return r;
}
u$1();
u$1();
var ht = (() => {
  var _scriptName = import.meta.url;
  return async function(moduleArg = {}) {
    var moduleRtn, Module = moduleArg, readyPromiseResolve, readyPromiseReject, readyPromise = new Promise((e, t2) => {
      readyPromiseResolve = e, readyPromiseReject = t2;
    }), ENVIRONMENT_IS_WEB = typeof window == "object", ENVIRONMENT_IS_WORKER = typeof WorkerGlobalScope < "u", ENVIRONMENT_IS_NODE = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string" && process.type != "renderer";
    if (ENVIRONMENT_IS_NODE) {
      let { createRequire: e } = await import("module"), t2 = import.meta.url;
      t2.startsWith("data:") && (t2 = "/");
      var require = e(t2);
    }
    Module.expectedDataFileDownloads ?? (Module.expectedDataFileDownloads = 0), Module.expectedDataFileDownloads++, (() => {
      var e = typeof ENVIRONMENT_IS_PTHREAD < "u" && ENVIRONMENT_IS_PTHREAD, t2 = typeof ENVIRONMENT_IS_WASM_WORKER < "u" && ENVIRONMENT_IS_WASM_WORKER;
      if (e || t2) return;
      var r = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string";
      function a2(o2) {
        typeof window == "object" ? window.encodeURIComponent(window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/")) + "/") : typeof process > "u" && typeof location < "u" && encodeURIComponent(location.pathname.substring(0, location.pathname.lastIndexOf("/")) + "/");
        var s2 = "pglite.data", n2 = "pglite.data", l2 = Module.locateFile ? Module.locateFile(n2, "") : n2, d2 = o2.remote_package_size;
        function p2(c2, w2, S2, k2) {
          if (r) {
            require("fs").readFile(c2, (E2, y2) => {
              E2 ? k2(E2) : S2(y2.buffer);
            });
            return;
          }
          Module.dataFileDownloads ?? (Module.dataFileDownloads = {}), fetch(c2).catch((E2) => Promise.reject(new Error(`Network Error: ${c2}`, { cause: E2 }))).then((E2) => {
            if (!E2.ok) return Promise.reject(new Error(`${E2.status}: ${E2.url}`));
            if (!E2.body && E2.arrayBuffer) return E2.arrayBuffer().then(S2);
            let y2 = E2.body.getReader(), M = () => y2.read().then(te2).catch((j2) => Promise.reject(new Error(`Unexpected error while handling : ${E2.url} ${j2}`, { cause: j2 }))), b2 = [], F2 = E2.headers, A2 = Number(F2.get("Content-Length") ?? w2), V2 = 0, te2 = ({ done: j2, value: X2 }) => {
              if (j2) {
                let R2 = new Uint8Array(b2.map((q2) => q2.length).reduce((q2, nt2) => q2 + nt2, 0)), L2 = 0;
                for (let q2 of b2) R2.set(q2, L2), L2 += q2.length;
                S2(R2.buffer);
              } else {
                b2.push(X2), V2 += X2.length, Module.dataFileDownloads[c2] = { loaded: V2, total: A2 };
                let R2 = 0, L2 = 0;
                for (let q2 of Object.values(Module.dataFileDownloads)) R2 += q2.loaded, L2 += q2.total;
                return Module.setStatus?.(`Downloading data... (${R2}/${L2})`), M();
              }
            };
            return Module.setStatus?.("Downloading data..."), M();
          });
        }
        function m2(c2) {
          console.error("package error:", c2);
        }
        var g2 = null, u2 = Module.getPreloadedPackage ? Module.getPreloadedPackage(l2, d2) : null;
        u2 || p2(l2, d2, (c2) => {
          g2 ? (g2(c2), g2 = null) : u2 = c2;
        }, m2);
        function f2(c2) {
          function w2(M, b2) {
            if (!M) throw b2 + new Error().stack;
          }
          c2.FS_createPath("/", "home", true, true), c2.FS_createPath("/home", "postgres", true, true), c2.FS_createPath("/", "pglite", true, true), c2.FS_createPath("/pglite", "bin", true, true), c2.FS_createPath("/pglite", "icu", true, true), c2.FS_createPath("/pglite/icu", "icudt76l", true, true), c2.FS_createPath("/pglite/icu/icudt76l", "coll", true, true), c2.FS_createPath("/pglite", "lib", true, true), c2.FS_createPath("/pglite/lib", "postgresql", true, true), c2.FS_createPath("/pglite/lib/postgresql", "pgxs", true, true), c2.FS_createPath("/pglite/lib/postgresql/pgxs", "config", true, true), c2.FS_createPath("/pglite/lib/postgresql/pgxs", "src", true, true), c2.FS_createPath("/pglite/lib/postgresql/pgxs/src", "makefiles", true, true), c2.FS_createPath("/pglite/lib/postgresql/pgxs/src", "test", true, true), c2.FS_createPath("/pglite/lib/postgresql/pgxs/src/test", "isolation", true, true), c2.FS_createPath("/pglite/lib/postgresql/pgxs/src/test", "regress", true, true), c2.FS_createPath("/pglite", "share", true, true), c2.FS_createPath("/pglite/share", "postgresql", true, true), c2.FS_createPath("/pglite/share/postgresql", "extension", true, true), c2.FS_createPath("/pglite/share/postgresql", "timezone", true, true), c2.FS_createPath("/pglite/share/postgresql/timezone", "Africa", true, true), c2.FS_createPath("/pglite/share/postgresql/timezone", "America", true, true), c2.FS_createPath("/pglite/share/postgresql/timezone/America", "Argentina", true, true), c2.FS_createPath("/pglite/share/postgresql/timezone/America", "Indiana", true, true), c2.FS_createPath("/pglite/share/postgresql/timezone/America", "Kentucky", true, true), c2.FS_createPath("/pglite/share/postgresql/timezone/America", "North_Dakota", true, true), c2.FS_createPath("/pglite/share/postgresql/timezone", "Antarctica", true, true), c2.FS_createPath("/pglite/share/postgresql/timezone", "Arctic", true, true), c2.FS_createPath("/pglite/share/postgresql/timezone", "Asia", true, true), c2.FS_createPath("/pglite/share/postgresql/timezone", "Atlantic", true, true), c2.FS_createPath("/pglite/share/postgresql/timezone", "Australia", true, true), c2.FS_createPath("/pglite/share/postgresql/timezone", "Brazil", true, true), c2.FS_createPath("/pglite/share/postgresql/timezone", "Canada", true, true), c2.FS_createPath("/pglite/share/postgresql/timezone", "Chile", true, true), c2.FS_createPath("/pglite/share/postgresql/timezone", "Etc", true, true), c2.FS_createPath("/pglite/share/postgresql/timezone", "Europe", true, true), c2.FS_createPath("/pglite/share/postgresql/timezone", "Indian", true, true), c2.FS_createPath("/pglite/share/postgresql/timezone", "Mexico", true, true), c2.FS_createPath("/pglite/share/postgresql/timezone", "Pacific", true, true), c2.FS_createPath("/pglite/share/postgresql/timezone", "US", true, true), c2.FS_createPath("/pglite/share/postgresql", "timezonesets", true, true), c2.FS_createPath("/pglite/share/postgresql", "tsearch_data", true, true);
          function S2(M, b2, F2) {
            this.start = M, this.end = b2, this.audio = F2;
          }
          S2.prototype = { requests: {}, open: function(M, b2) {
            this.name = b2, this.requests[b2] = this, c2.addRunDependency(`fp ${this.name}`);
          }, send: function() {
          }, onload: function() {
            var M = this.byteArray.subarray(this.start, this.end);
            this.finish(M);
          }, finish: function(M) {
            var b2 = this;
            c2.FS_createDataFile(this.name, null, M, true, true, true), c2.removeRunDependency(`fp ${b2.name}`), this.requests[this.name] = null;
          } };
          for (var k2 = o2.files, E2 = 0; E2 < k2.length; ++E2) new S2(k2[E2].start, k2[E2].end, k2[E2].audio || 0).open("GET", k2[E2].filename);
          function y2(M) {
            w2(M, "Loading data file failed."), w2(M.constructor.name === ArrayBuffer.name, "bad input to processPackageData");
            var b2 = new Uint8Array(M);
            S2.prototype.byteArray = b2;
            for (var F2 = o2.files, A2 = 0; A2 < F2.length; ++A2) S2.prototype.requests[F2[A2].filename].onload();
            c2.removeRunDependency("datafile_pglite.data");
          }
          c2.addRunDependency("datafile_pglite.data"), c2.preloadResults ?? (c2.preloadResults = {}), c2.preloadResults[s2] = { fromCache: false }, u2 ? (y2(u2), u2 = null) : g2 = y2;
        }
        Module.calledRun ? f2(Module) : (Module.preRun ?? (Module.preRun = [])).push(f2);
      }
      a2({ files: [{ filename: "/home/postgres/.pgpass", start: 0, end: 204 }, { filename: "/pglite/bin/initdb", start: 204, end: 223 }, { filename: "/pglite/bin/pg_dump", start: 223, end: 242 }, { filename: "/pglite/bin/postgres", start: 242, end: 261 }, { filename: "/pglite/icu/LICENSE", start: 261, end: 26748 }, { filename: "/pglite/icu/icudt76l/coll/root.res", start: 26748, end: 365756 }, { filename: "/pglite/icu/icudt76l/coll/ucadata.icu", start: 365756, end: 943260 }, { filename: "/pglite/lib/postgresql/cyrillic_and_mic.so", start: 943260, end: 947838 }, { filename: "/pglite/lib/postgresql/dict_snowball.so", start: 947838, end: 1529830 }, { filename: "/pglite/lib/postgresql/euc2004_sjis2004.so", start: 1529830, end: 1531986 }, { filename: "/pglite/lib/postgresql/euc_cn_and_mic.so", start: 1531986, end: 1533007 }, { filename: "/pglite/lib/postgresql/euc_jp_and_sjis.so", start: 1533007, end: 1540344 }, { filename: "/pglite/lib/postgresql/euc_kr_and_mic.so", start: 1540344, end: 1541375 }, { filename: "/pglite/lib/postgresql/euc_tw_and_big5.so", start: 1541375, end: 1546020 }, { filename: "/pglite/lib/postgresql/latin2_and_win1250.so", start: 1546020, end: 1547507 }, { filename: "/pglite/lib/postgresql/latin_and_mic.so", start: 1547507, end: 1548604 }, { filename: "/pglite/lib/postgresql/libpqwalreceiver.so", start: 1548604, end: 1686859 }, { filename: "/pglite/lib/postgresql/pgoutput.so", start: 1686859, end: 1700882 }, { filename: "/pglite/lib/postgresql/pgxs/config/install-sh", start: 1700882, end: 1714879 }, { filename: "/pglite/lib/postgresql/pgxs/config/missing", start: 1714879, end: 1716227 }, { filename: "/pglite/lib/postgresql/pgxs/src/Makefile.global", start: 1716227, end: 1754229 }, { filename: "/pglite/lib/postgresql/pgxs/src/Makefile.port", start: 1754229, end: 1755075 }, { filename: "/pglite/lib/postgresql/pgxs/src/Makefile.shlib", start: 1755075, end: 1769903 }, { filename: "/pglite/lib/postgresql/pgxs/src/makefiles/pgxs.mk", start: 1769903, end: 1786050 }, { filename: "/pglite/lib/postgresql/pgxs/src/nls-global.mk", start: 1786050, end: 1793114 }, { filename: "/pglite/lib/postgresql/pgxs/src/test/isolation/isolationtester.js", start: 1793114, end: 1909312 }, { filename: "/pglite/lib/postgresql/pgxs/src/test/isolation/pg_isolation_regress.js", start: 1909312, end: 2027947 }, { filename: "/pglite/lib/postgresql/pgxs/src/test/regress/pg_regress.js", start: 2027947, end: 2146068 }, { filename: "/pglite/lib/postgresql/plpgsql.so", start: 2146068, end: 2301538 }, { filename: "/pglite/lib/postgresql/utf8_and_big5.so", start: 2301538, end: 2416350 }, { filename: "/pglite/lib/postgresql/utf8_and_cyrillic.so", start: 2416350, end: 2422383 }, { filename: "/pglite/lib/postgresql/utf8_and_euc2004.so", start: 2422383, end: 2627379 }, { filename: "/pglite/lib/postgresql/utf8_and_euc_cn.so", start: 2627379, end: 2702623 }, { filename: "/pglite/lib/postgresql/utf8_and_euc_jp.so", start: 2702623, end: 2853915 }, { filename: "/pglite/lib/postgresql/utf8_and_euc_kr.so", start: 2853915, end: 2956835 }, { filename: "/pglite/lib/postgresql/utf8_and_euc_tw.so", start: 2956835, end: 3156455 }, { filename: "/pglite/lib/postgresql/utf8_and_gb18030.so", start: 3156455, end: 3418896 }, { filename: "/pglite/lib/postgresql/utf8_and_gbk.so", start: 3418896, end: 3565492 }, { filename: "/pglite/lib/postgresql/utf8_and_iso8859.so", start: 3565492, end: 3589083 }, { filename: "/pglite/lib/postgresql/utf8_and_iso8859_1.so", start: 3589083, end: 3590138 }, { filename: "/pglite/lib/postgresql/utf8_and_johab.so", start: 3590138, end: 3751906 }, { filename: "/pglite/lib/postgresql/utf8_and_sjis.so", start: 3751906, end: 3833630 }, { filename: "/pglite/lib/postgresql/utf8_and_sjis2004.so", start: 3833630, end: 3960326 }, { filename: "/pglite/lib/postgresql/utf8_and_uhc.so", start: 3960326, end: 4127662 }, { filename: "/pglite/lib/postgresql/utf8_and_win.so", start: 4127662, end: 4154180 }, { filename: "/pglite/locale-a", start: 4154180, end: 4154205 }, { filename: "/pglite/password", start: 4154205, end: 4154213 }, { filename: "/pglite/pgstdin", start: 4154213, end: 4154232 }, { filename: "/pglite/pgstdout", start: 4154232, end: 4154251 }, { filename: "/pglite/share/postgresql/errcodes.txt", start: 4154251, end: 4187990 }, { filename: "/pglite/share/postgresql/extension/plpgsql--1.0.sql", start: 4187990, end: 4188648 }, { filename: "/pglite/share/postgresql/extension/plpgsql.control", start: 4188648, end: 4188841 }, { filename: "/pglite/share/postgresql/information_schema.sql", start: 4188841, end: 4302838 }, { filename: "/pglite/share/postgresql/pg_hba.conf.sample", start: 4302838, end: 4308473 }, { filename: "/pglite/share/postgresql/pg_ident.conf.sample", start: 4308473, end: 4311154 }, { filename: "/pglite/share/postgresql/pg_service.conf.sample", start: 4311154, end: 4311758 }, { filename: "/pglite/share/postgresql/postgres.bki", start: 4311758, end: 5285527 }, { filename: "/pglite/share/postgresql/postgresql.conf.sample", start: 5285527, end: 5318079 }, { filename: "/pglite/share/postgresql/psqlrc.sample", start: 5318079, end: 5318357 }, { filename: "/pglite/share/postgresql/snowball_create.sql", start: 5318357, end: 5364067 }, { filename: "/pglite/share/postgresql/sql_features.txt", start: 5364067, end: 5399828 }, { filename: "/pglite/share/postgresql/system_constraints.sql", start: 5399828, end: 5408723 }, { filename: "/pglite/share/postgresql/system_functions.sql", start: 5408723, end: 5433602 }, { filename: "/pglite/share/postgresql/system_views.sql", start: 5433602, end: 5486966 }, { filename: "/pglite/share/postgresql/timezone/Africa/Abidjan", start: 5486966, end: 5487114 }, { filename: "/pglite/share/postgresql/timezone/Africa/Accra", start: 5487114, end: 5487262 }, { filename: "/pglite/share/postgresql/timezone/Africa/Addis_Ababa", start: 5487262, end: 5487527 }, { filename: "/pglite/share/postgresql/timezone/Africa/Algiers", start: 5487527, end: 5488262 }, { filename: "/pglite/share/postgresql/timezone/Africa/Asmara", start: 5488262, end: 5488527 }, { filename: "/pglite/share/postgresql/timezone/Africa/Asmera", start: 5488527, end: 5488792 }, { filename: "/pglite/share/postgresql/timezone/Africa/Bamako", start: 5488792, end: 5488940 }, { filename: "/pglite/share/postgresql/timezone/Africa/Bangui", start: 5488940, end: 5489175 }, { filename: "/pglite/share/postgresql/timezone/Africa/Banjul", start: 5489175, end: 5489323 }, { filename: "/pglite/share/postgresql/timezone/Africa/Bissau", start: 5489323, end: 5489517 }, { filename: "/pglite/share/postgresql/timezone/Africa/Blantyre", start: 5489517, end: 5489666 }, { filename: "/pglite/share/postgresql/timezone/Africa/Brazzaville", start: 5489666, end: 5489901 }, { filename: "/pglite/share/postgresql/timezone/Africa/Bujumbura", start: 5489901, end: 5490050 }, { filename: "/pglite/share/postgresql/timezone/Africa/Cairo", start: 5490050, end: 5492449 }, { filename: "/pglite/share/postgresql/timezone/Africa/Casablanca", start: 5492449, end: 5494878 }, { filename: "/pglite/share/postgresql/timezone/Africa/Ceuta", start: 5494878, end: 5496930 }, { filename: "/pglite/share/postgresql/timezone/Africa/Conakry", start: 5496930, end: 5497078 }, { filename: "/pglite/share/postgresql/timezone/Africa/Dakar", start: 5497078, end: 5497226 }, { filename: "/pglite/share/postgresql/timezone/Africa/Dar_es_Salaam", start: 5497226, end: 5497491 }, { filename: "/pglite/share/postgresql/timezone/Africa/Djibouti", start: 5497491, end: 5497756 }, { filename: "/pglite/share/postgresql/timezone/Africa/Douala", start: 5497756, end: 5497991 }, { filename: "/pglite/share/postgresql/timezone/Africa/El_Aaiun", start: 5497991, end: 5500286 }, { filename: "/pglite/share/postgresql/timezone/Africa/Freetown", start: 5500286, end: 5500434 }, { filename: "/pglite/share/postgresql/timezone/Africa/Gaborone", start: 5500434, end: 5500583 }, { filename: "/pglite/share/postgresql/timezone/Africa/Harare", start: 5500583, end: 5500732 }, { filename: "/pglite/share/postgresql/timezone/Africa/Johannesburg", start: 5500732, end: 5500978 }, { filename: "/pglite/share/postgresql/timezone/Africa/Juba", start: 5500978, end: 5501657 }, { filename: "/pglite/share/postgresql/timezone/Africa/Kampala", start: 5501657, end: 5501922 }, { filename: "/pglite/share/postgresql/timezone/Africa/Khartoum", start: 5501922, end: 5502601 }, { filename: "/pglite/share/postgresql/timezone/Africa/Kigali", start: 5502601, end: 5502750 }, { filename: "/pglite/share/postgresql/timezone/Africa/Kinshasa", start: 5502750, end: 5502985 }, { filename: "/pglite/share/postgresql/timezone/Africa/Lagos", start: 5502985, end: 5503220 }, { filename: "/pglite/share/postgresql/timezone/Africa/Libreville", start: 5503220, end: 5503455 }, { filename: "/pglite/share/postgresql/timezone/Africa/Lome", start: 5503455, end: 5503603 }, { filename: "/pglite/share/postgresql/timezone/Africa/Luanda", start: 5503603, end: 5503838 }, { filename: "/pglite/share/postgresql/timezone/Africa/Lubumbashi", start: 5503838, end: 5503987 }, { filename: "/pglite/share/postgresql/timezone/Africa/Lusaka", start: 5503987, end: 5504136 }, { filename: "/pglite/share/postgresql/timezone/Africa/Malabo", start: 5504136, end: 5504371 }, { filename: "/pglite/share/postgresql/timezone/Africa/Maputo", start: 5504371, end: 5504520 }, { filename: "/pglite/share/postgresql/timezone/Africa/Maseru", start: 5504520, end: 5504766 }, { filename: "/pglite/share/postgresql/timezone/Africa/Mbabane", start: 5504766, end: 5505012 }, { filename: "/pglite/share/postgresql/timezone/Africa/Mogadishu", start: 5505012, end: 5505277 }, { filename: "/pglite/share/postgresql/timezone/Africa/Monrovia", start: 5505277, end: 5505485 }, { filename: "/pglite/share/postgresql/timezone/Africa/Nairobi", start: 5505485, end: 5505750 }, { filename: "/pglite/share/postgresql/timezone/Africa/Ndjamena", start: 5505750, end: 5505949 }, { filename: "/pglite/share/postgresql/timezone/Africa/Niamey", start: 5505949, end: 5506184 }, { filename: "/pglite/share/postgresql/timezone/Africa/Nouakchott", start: 5506184, end: 5506332 }, { filename: "/pglite/share/postgresql/timezone/Africa/Ouagadougou", start: 5506332, end: 5506480 }, { filename: "/pglite/share/postgresql/timezone/Africa/Porto-Novo", start: 5506480, end: 5506715 }, { filename: "/pglite/share/postgresql/timezone/Africa/Sao_Tome", start: 5506715, end: 5506969 }, { filename: "/pglite/share/postgresql/timezone/Africa/Timbuktu", start: 5506969, end: 5507117 }, { filename: "/pglite/share/postgresql/timezone/Africa/Tripoli", start: 5507117, end: 5507742 }, { filename: "/pglite/share/postgresql/timezone/Africa/Tunis", start: 5507742, end: 5508431 }, { filename: "/pglite/share/postgresql/timezone/Africa/Windhoek", start: 5508431, end: 5509386 }, { filename: "/pglite/share/postgresql/timezone/America/Adak", start: 5509386, end: 5511742 }, { filename: "/pglite/share/postgresql/timezone/America/Anchorage", start: 5511742, end: 5514113 }, { filename: "/pglite/share/postgresql/timezone/America/Anguilla", start: 5514113, end: 5514359 }, { filename: "/pglite/share/postgresql/timezone/America/Antigua", start: 5514359, end: 5514605 }, { filename: "/pglite/share/postgresql/timezone/America/Araguaina", start: 5514605, end: 5515489 }, { filename: "/pglite/share/postgresql/timezone/America/Argentina/Buenos_Aires", start: 5515489, end: 5516565 }, { filename: "/pglite/share/postgresql/timezone/America/Argentina/Catamarca", start: 5516565, end: 5517641 }, { filename: "/pglite/share/postgresql/timezone/America/Argentina/ComodRivadavia", start: 5517641, end: 5518717 }, { filename: "/pglite/share/postgresql/timezone/America/Argentina/Cordoba", start: 5518717, end: 5519793 }, { filename: "/pglite/share/postgresql/timezone/America/Argentina/Jujuy", start: 5519793, end: 5520841 }, { filename: "/pglite/share/postgresql/timezone/America/Argentina/La_Rioja", start: 5520841, end: 5521931 }, { filename: "/pglite/share/postgresql/timezone/America/Argentina/Mendoza", start: 5521931, end: 5523007 }, { filename: "/pglite/share/postgresql/timezone/America/Argentina/Rio_Gallegos", start: 5523007, end: 5524083 }, { filename: "/pglite/share/postgresql/timezone/America/Argentina/Salta", start: 5524083, end: 5525131 }, { filename: "/pglite/share/postgresql/timezone/America/Argentina/San_Juan", start: 5525131, end: 5526221 }, { filename: "/pglite/share/postgresql/timezone/America/Argentina/San_Luis", start: 5526221, end: 5527323 }, { filename: "/pglite/share/postgresql/timezone/America/Argentina/Tucuman", start: 5527323, end: 5528427 }, { filename: "/pglite/share/postgresql/timezone/America/Argentina/Ushuaia", start: 5528427, end: 5529503 }, { filename: "/pglite/share/postgresql/timezone/America/Aruba", start: 5529503, end: 5529749 }, { filename: "/pglite/share/postgresql/timezone/America/Asuncion", start: 5529749, end: 5531407 }, { filename: "/pglite/share/postgresql/timezone/America/Atikokan", start: 5531407, end: 5531589 }, { filename: "/pglite/share/postgresql/timezone/America/Atka", start: 5531589, end: 5533945 }, { filename: "/pglite/share/postgresql/timezone/America/Bahia", start: 5533945, end: 5534969 }, { filename: "/pglite/share/postgresql/timezone/America/Bahia_Banderas", start: 5534969, end: 5536069 }, { filename: "/pglite/share/postgresql/timezone/America/Barbados", start: 5536069, end: 5536505 }, { filename: "/pglite/share/postgresql/timezone/America/Belem", start: 5536505, end: 5537081 }, { filename: "/pglite/share/postgresql/timezone/America/Belize", start: 5537081, end: 5538695 }, { filename: "/pglite/share/postgresql/timezone/America/Blanc-Sablon", start: 5538695, end: 5538941 }, { filename: "/pglite/share/postgresql/timezone/America/Boa_Vista", start: 5538941, end: 5539573 }, { filename: "/pglite/share/postgresql/timezone/America/Bogota", start: 5539573, end: 5539819 }, { filename: "/pglite/share/postgresql/timezone/America/Boise", start: 5539819, end: 5542229 }, { filename: "/pglite/share/postgresql/timezone/America/Buenos_Aires", start: 5542229, end: 5543305 }, { filename: "/pglite/share/postgresql/timezone/America/Cambridge_Bay", start: 5543305, end: 5545559 }, { filename: "/pglite/share/postgresql/timezone/America/Campo_Grande", start: 5545559, end: 5547003 }, { filename: "/pglite/share/postgresql/timezone/America/Cancun", start: 5547003, end: 5547867 }, { filename: "/pglite/share/postgresql/timezone/America/Caracas", start: 5547867, end: 5548131 }, { filename: "/pglite/share/postgresql/timezone/America/Catamarca", start: 5548131, end: 5549207 }, { filename: "/pglite/share/postgresql/timezone/America/Cayenne", start: 5549207, end: 5549405 }, { filename: "/pglite/share/postgresql/timezone/America/Cayman", start: 5549405, end: 5549587 }, { filename: "/pglite/share/postgresql/timezone/America/Chicago", start: 5549587, end: 5553179 }, { filename: "/pglite/share/postgresql/timezone/America/Chihuahua", start: 5553179, end: 5554281 }, { filename: "/pglite/share/postgresql/timezone/America/Ciudad_Juarez", start: 5554281, end: 5555819 }, { filename: "/pglite/share/postgresql/timezone/America/Coral_Harbour", start: 5555819, end: 5556001 }, { filename: "/pglite/share/postgresql/timezone/America/Cordoba", start: 5556001, end: 5557077 }, { filename: "/pglite/share/postgresql/timezone/America/Costa_Rica", start: 5557077, end: 5557393 }, { filename: "/pglite/share/postgresql/timezone/America/Coyhaique", start: 5557393, end: 5559533 }, { filename: "/pglite/share/postgresql/timezone/America/Creston", start: 5559533, end: 5559893 }, { filename: "/pglite/share/postgresql/timezone/America/Cuiaba", start: 5559893, end: 5561309 }, { filename: "/pglite/share/postgresql/timezone/America/Curacao", start: 5561309, end: 5561555 }, { filename: "/pglite/share/postgresql/timezone/America/Danmarkshavn", start: 5561555, end: 5562253 }, { filename: "/pglite/share/postgresql/timezone/America/Dawson", start: 5562253, end: 5563867 }, { filename: "/pglite/share/postgresql/timezone/America/Dawson_Creek", start: 5563867, end: 5564917 }, { filename: "/pglite/share/postgresql/timezone/America/Denver", start: 5564917, end: 5567377 }, { filename: "/pglite/share/postgresql/timezone/America/Detroit", start: 5567377, end: 5569607 }, { filename: "/pglite/share/postgresql/timezone/America/Dominica", start: 5569607, end: 5569853 }, { filename: "/pglite/share/postgresql/timezone/America/Edmonton", start: 5569853, end: 5572185 }, { filename: "/pglite/share/postgresql/timezone/America/Eirunepe", start: 5572185, end: 5572841 }, { filename: "/pglite/share/postgresql/timezone/America/El_Salvador", start: 5572841, end: 5573065 }, { filename: "/pglite/share/postgresql/timezone/America/Ensenada", start: 5573065, end: 5575971 }, { filename: "/pglite/share/postgresql/timezone/America/Fort_Nelson", start: 5575971, end: 5578211 }, { filename: "/pglite/share/postgresql/timezone/America/Fort_Wayne", start: 5578211, end: 5579893 }, { filename: "/pglite/share/postgresql/timezone/America/Fortaleza", start: 5579893, end: 5580609 }, { filename: "/pglite/share/postgresql/timezone/America/Glace_Bay", start: 5580609, end: 5582801 }, { filename: "/pglite/share/postgresql/timezone/America/Godthab", start: 5582801, end: 5584704 }, { filename: "/pglite/share/postgresql/timezone/America/Goose_Bay", start: 5584704, end: 5587914 }, { filename: "/pglite/share/postgresql/timezone/America/Grand_Turk", start: 5587914, end: 5589748 }, { filename: "/pglite/share/postgresql/timezone/America/Grenada", start: 5589748, end: 5589994 }, { filename: "/pglite/share/postgresql/timezone/America/Guadeloupe", start: 5589994, end: 5590240 }, { filename: "/pglite/share/postgresql/timezone/America/Guatemala", start: 5590240, end: 5590520 }, { filename: "/pglite/share/postgresql/timezone/America/Guayaquil", start: 5590520, end: 5590766 }, { filename: "/pglite/share/postgresql/timezone/America/Guyana", start: 5590766, end: 5591028 }, { filename: "/pglite/share/postgresql/timezone/America/Halifax", start: 5591028, end: 5594452 }, { filename: "/pglite/share/postgresql/timezone/America/Havana", start: 5594452, end: 5596868 }, { filename: "/pglite/share/postgresql/timezone/America/Hermosillo", start: 5596868, end: 5597256 }, { filename: "/pglite/share/postgresql/timezone/America/Indiana/Indianapolis", start: 5597256, end: 5598938 }, { filename: "/pglite/share/postgresql/timezone/America/Indiana/Knox", start: 5598938, end: 5601382 }, { filename: "/pglite/share/postgresql/timezone/America/Indiana/Marengo", start: 5601382, end: 5603120 }, { filename: "/pglite/share/postgresql/timezone/America/Indiana/Petersburg", start: 5603120, end: 5605040 }, { filename: "/pglite/share/postgresql/timezone/America/Indiana/Tell_City", start: 5605040, end: 5606740 }, { filename: "/pglite/share/postgresql/timezone/America/Indiana/Vevay", start: 5606740, end: 5608170 }, { filename: "/pglite/share/postgresql/timezone/America/Indiana/Vincennes", start: 5608170, end: 5609880 }, { filename: "/pglite/share/postgresql/timezone/America/Indiana/Winamac", start: 5609880, end: 5611674 }, { filename: "/pglite/share/postgresql/timezone/America/Indianapolis", start: 5611674, end: 5613356 }, { filename: "/pglite/share/postgresql/timezone/America/Inuvik", start: 5613356, end: 5615430 }, { filename: "/pglite/share/postgresql/timezone/America/Iqaluit", start: 5615430, end: 5617632 }, { filename: "/pglite/share/postgresql/timezone/America/Jamaica", start: 5617632, end: 5618114 }, { filename: "/pglite/share/postgresql/timezone/America/Jujuy", start: 5618114, end: 5619162 }, { filename: "/pglite/share/postgresql/timezone/America/Juneau", start: 5619162, end: 5621515 }, { filename: "/pglite/share/postgresql/timezone/America/Kentucky/Louisville", start: 5621515, end: 5624303 }, { filename: "/pglite/share/postgresql/timezone/America/Kentucky/Monticello", start: 5624303, end: 5626671 }, { filename: "/pglite/share/postgresql/timezone/America/Knox_IN", start: 5626671, end: 5629115 }, { filename: "/pglite/share/postgresql/timezone/America/Kralendijk", start: 5629115, end: 5629361 }, { filename: "/pglite/share/postgresql/timezone/America/La_Paz", start: 5629361, end: 5629593 }, { filename: "/pglite/share/postgresql/timezone/America/Lima", start: 5629593, end: 5629999 }, { filename: "/pglite/share/postgresql/timezone/America/Los_Angeles", start: 5629999, end: 5632851 }, { filename: "/pglite/share/postgresql/timezone/America/Louisville", start: 5632851, end: 5635639 }, { filename: "/pglite/share/postgresql/timezone/America/Lower_Princes", start: 5635639, end: 5635885 }, { filename: "/pglite/share/postgresql/timezone/America/Maceio", start: 5635885, end: 5636629 }, { filename: "/pglite/share/postgresql/timezone/America/Managua", start: 5636629, end: 5637059 }, { filename: "/pglite/share/postgresql/timezone/America/Manaus", start: 5637059, end: 5637663 }, { filename: "/pglite/share/postgresql/timezone/America/Marigot", start: 5637663, end: 5637909 }, { filename: "/pglite/share/postgresql/timezone/America/Martinique", start: 5637909, end: 5638141 }, { filename: "/pglite/share/postgresql/timezone/America/Matamoros", start: 5638141, end: 5639559 }, { filename: "/pglite/share/postgresql/timezone/America/Mazatlan", start: 5639559, end: 5640619 }, { filename: "/pglite/share/postgresql/timezone/America/Mendoza", start: 5640619, end: 5641695 }, { filename: "/pglite/share/postgresql/timezone/America/Menominee", start: 5641695, end: 5643969 }, { filename: "/pglite/share/postgresql/timezone/America/Merida", start: 5643969, end: 5644973 }, { filename: "/pglite/share/postgresql/timezone/America/Metlakatla", start: 5644973, end: 5646396 }, { filename: "/pglite/share/postgresql/timezone/America/Mexico_City", start: 5646396, end: 5647618 }, { filename: "/pglite/share/postgresql/timezone/America/Miquelon", start: 5647618, end: 5649284 }, { filename: "/pglite/share/postgresql/timezone/America/Moncton", start: 5649284, end: 5652438 }, { filename: "/pglite/share/postgresql/timezone/America/Monterrey", start: 5652438, end: 5653552 }, { filename: "/pglite/share/postgresql/timezone/America/Montevideo", start: 5653552, end: 5655062 }, { filename: "/pglite/share/postgresql/timezone/America/Montreal", start: 5655062, end: 5658556 }, { filename: "/pglite/share/postgresql/timezone/America/Montserrat", start: 5658556, end: 5658802 }, { filename: "/pglite/share/postgresql/timezone/America/Nassau", start: 5658802, end: 5662296 }, { filename: "/pglite/share/postgresql/timezone/America/New_York", start: 5662296, end: 5665848 }, { filename: "/pglite/share/postgresql/timezone/America/Nipigon", start: 5665848, end: 5669342 }, { filename: "/pglite/share/postgresql/timezone/America/Nome", start: 5669342, end: 5671709 }, { filename: "/pglite/share/postgresql/timezone/America/Noronha", start: 5671709, end: 5672425 }, { filename: "/pglite/share/postgresql/timezone/America/North_Dakota/Beulah", start: 5672425, end: 5674821 }, { filename: "/pglite/share/postgresql/timezone/America/North_Dakota/Center", start: 5674821, end: 5677217 }, { filename: "/pglite/share/postgresql/timezone/America/North_Dakota/New_Salem", start: 5677217, end: 5679613 }, { filename: "/pglite/share/postgresql/timezone/America/Nuuk", start: 5679613, end: 5681516 }, { filename: "/pglite/share/postgresql/timezone/America/Ojinaga", start: 5681516, end: 5683040 }, { filename: "/pglite/share/postgresql/timezone/America/Panama", start: 5683040, end: 5683222 }, { filename: "/pglite/share/postgresql/timezone/America/Pangnirtung", start: 5683222, end: 5685424 }, { filename: "/pglite/share/postgresql/timezone/America/Paramaribo", start: 5685424, end: 5685686 }, { filename: "/pglite/share/postgresql/timezone/America/Phoenix", start: 5685686, end: 5686046 }, { filename: "/pglite/share/postgresql/timezone/America/Port-au-Prince", start: 5686046, end: 5687480 }, { filename: "/pglite/share/postgresql/timezone/America/Port_of_Spain", start: 5687480, end: 5687726 }, { filename: "/pglite/share/postgresql/timezone/America/Porto_Acre", start: 5687726, end: 5688354 }, { filename: "/pglite/share/postgresql/timezone/America/Porto_Velho", start: 5688354, end: 5688930 }, { filename: "/pglite/share/postgresql/timezone/America/Puerto_Rico", start: 5688930, end: 5689176 }, { filename: "/pglite/share/postgresql/timezone/America/Punta_Arenas", start: 5689176, end: 5691092 }, { filename: "/pglite/share/postgresql/timezone/America/Rainy_River", start: 5691092, end: 5693960 }, { filename: "/pglite/share/postgresql/timezone/America/Rankin_Inlet", start: 5693960, end: 5696026 }, { filename: "/pglite/share/postgresql/timezone/America/Recife", start: 5696026, end: 5696742 }, { filename: "/pglite/share/postgresql/timezone/America/Regina", start: 5696742, end: 5697722 }, { filename: "/pglite/share/postgresql/timezone/America/Resolute", start: 5697722, end: 5699788 }, { filename: "/pglite/share/postgresql/timezone/America/Rio_Branco", start: 5699788, end: 5700416 }, { filename: "/pglite/share/postgresql/timezone/America/Rosario", start: 5700416, end: 5701492 }, { filename: "/pglite/share/postgresql/timezone/America/Santa_Isabel", start: 5701492, end: 5704398 }, { filename: "/pglite/share/postgresql/timezone/America/Santarem", start: 5704398, end: 5705e3 }, { filename: "/pglite/share/postgresql/timezone/America/Santiago", start: 5705e3, end: 5707529 }, { filename: "/pglite/share/postgresql/timezone/America/Santo_Domingo", start: 5707529, end: 5707987 }, { filename: "/pglite/share/postgresql/timezone/America/Sao_Paulo", start: 5707987, end: 5709431 }, { filename: "/pglite/share/postgresql/timezone/America/Scoresbysund", start: 5709431, end: 5711380 }, { filename: "/pglite/share/postgresql/timezone/America/Shiprock", start: 5711380, end: 5713840 }, { filename: "/pglite/share/postgresql/timezone/America/Sitka", start: 5713840, end: 5716169 }, { filename: "/pglite/share/postgresql/timezone/America/St_Barthelemy", start: 5716169, end: 5716415 }, { filename: "/pglite/share/postgresql/timezone/America/St_Johns", start: 5716415, end: 5720070 }, { filename: "/pglite/share/postgresql/timezone/America/St_Kitts", start: 5720070, end: 5720316 }, { filename: "/pglite/share/postgresql/timezone/America/St_Lucia", start: 5720316, end: 5720562 }, { filename: "/pglite/share/postgresql/timezone/America/St_Thomas", start: 5720562, end: 5720808 }, { filename: "/pglite/share/postgresql/timezone/America/St_Vincent", start: 5720808, end: 5721054 }, { filename: "/pglite/share/postgresql/timezone/America/Swift_Current", start: 5721054, end: 5721614 }, { filename: "/pglite/share/postgresql/timezone/America/Tegucigalpa", start: 5721614, end: 5721866 }, { filename: "/pglite/share/postgresql/timezone/America/Thule", start: 5721866, end: 5723368 }, { filename: "/pglite/share/postgresql/timezone/America/Thunder_Bay", start: 5723368, end: 5726862 }, { filename: "/pglite/share/postgresql/timezone/America/Tijuana", start: 5726862, end: 5729768 }, { filename: "/pglite/share/postgresql/timezone/America/Toronto", start: 5729768, end: 5733262 }, { filename: "/pglite/share/postgresql/timezone/America/Tortola", start: 5733262, end: 5733508 }, { filename: "/pglite/share/postgresql/timezone/America/Vancouver", start: 5733508, end: 5736400 }, { filename: "/pglite/share/postgresql/timezone/America/Virgin", start: 5736400, end: 5736646 }, { filename: "/pglite/share/postgresql/timezone/America/Whitehorse", start: 5736646, end: 5738260 }, { filename: "/pglite/share/postgresql/timezone/America/Winnipeg", start: 5738260, end: 5741128 }, { filename: "/pglite/share/postgresql/timezone/America/Yakutat", start: 5741128, end: 5743433 }, { filename: "/pglite/share/postgresql/timezone/America/Yellowknife", start: 5743433, end: 5745765 }, { filename: "/pglite/share/postgresql/timezone/Antarctica/Casey", start: 5745765, end: 5746202 }, { filename: "/pglite/share/postgresql/timezone/Antarctica/Davis", start: 5746202, end: 5746499 }, { filename: "/pglite/share/postgresql/timezone/Antarctica/DumontDUrville", start: 5746499, end: 5746685 }, { filename: "/pglite/share/postgresql/timezone/Antarctica/Macquarie", start: 5746685, end: 5748945 }, { filename: "/pglite/share/postgresql/timezone/Antarctica/Mawson", start: 5748945, end: 5749144 }, { filename: "/pglite/share/postgresql/timezone/Antarctica/McMurdo", start: 5749144, end: 5751581 }, { filename: "/pglite/share/postgresql/timezone/Antarctica/Palmer", start: 5751581, end: 5752999 }, { filename: "/pglite/share/postgresql/timezone/Antarctica/Rothera", start: 5752999, end: 5753163 }, { filename: "/pglite/share/postgresql/timezone/Antarctica/South_Pole", start: 5753163, end: 5755600 }, { filename: "/pglite/share/postgresql/timezone/Antarctica/Syowa", start: 5755600, end: 5755765 }, { filename: "/pglite/share/postgresql/timezone/Antarctica/Troll", start: 5755765, end: 5756927 }, { filename: "/pglite/share/postgresql/timezone/Antarctica/Vostok", start: 5756927, end: 5757154 }, { filename: "/pglite/share/postgresql/timezone/Arctic/Longyearbyen", start: 5757154, end: 5759452 }, { filename: "/pglite/share/postgresql/timezone/Asia/Aden", start: 5759452, end: 5759617 }, { filename: "/pglite/share/postgresql/timezone/Asia/Almaty", start: 5759617, end: 5760614 }, { filename: "/pglite/share/postgresql/timezone/Asia/Amman", start: 5760614, end: 5762061 }, { filename: "/pglite/share/postgresql/timezone/Asia/Anadyr", start: 5762061, end: 5763249 }, { filename: "/pglite/share/postgresql/timezone/Asia/Aqtau", start: 5763249, end: 5764232 }, { filename: "/pglite/share/postgresql/timezone/Asia/Aqtobe", start: 5764232, end: 5765243 }, { filename: "/pglite/share/postgresql/timezone/Asia/Ashgabat", start: 5765243, end: 5765862 }, { filename: "/pglite/share/postgresql/timezone/Asia/Ashkhabad", start: 5765862, end: 5766481 }, { filename: "/pglite/share/postgresql/timezone/Asia/Atyrau", start: 5766481, end: 5767472 }, { filename: "/pglite/share/postgresql/timezone/Asia/Baghdad", start: 5767472, end: 5768455 }, { filename: "/pglite/share/postgresql/timezone/Asia/Bahrain", start: 5768455, end: 5768654 }, { filename: "/pglite/share/postgresql/timezone/Asia/Baku", start: 5768654, end: 5769881 }, { filename: "/pglite/share/postgresql/timezone/Asia/Bangkok", start: 5769881, end: 5770080 }, { filename: "/pglite/share/postgresql/timezone/Asia/Barnaul", start: 5770080, end: 5771301 }, { filename: "/pglite/share/postgresql/timezone/Asia/Beirut", start: 5771301, end: 5773455 }, { filename: "/pglite/share/postgresql/timezone/Asia/Bishkek", start: 5773455, end: 5774438 }, { filename: "/pglite/share/postgresql/timezone/Asia/Brunei", start: 5774438, end: 5774921 }, { filename: "/pglite/share/postgresql/timezone/Asia/Calcutta", start: 5774921, end: 5775206 }, { filename: "/pglite/share/postgresql/timezone/Asia/Chita", start: 5775206, end: 5776427 }, { filename: "/pglite/share/postgresql/timezone/Asia/Choibalsan", start: 5776427, end: 5777318 }, { filename: "/pglite/share/postgresql/timezone/Asia/Chongqing", start: 5777318, end: 5777879 }, { filename: "/pglite/share/postgresql/timezone/Asia/Chungking", start: 5777879, end: 5778440 }, { filename: "/pglite/share/postgresql/timezone/Asia/Colombo", start: 5778440, end: 5778812 }, { filename: "/pglite/share/postgresql/timezone/Asia/Dacca", start: 5778812, end: 5779149 }, { filename: "/pglite/share/postgresql/timezone/Asia/Damascus", start: 5779149, end: 5781036 }, { filename: "/pglite/share/postgresql/timezone/Asia/Dhaka", start: 5781036, end: 5781373 }, { filename: "/pglite/share/postgresql/timezone/Asia/Dili", start: 5781373, end: 5781644 }, { filename: "/pglite/share/postgresql/timezone/Asia/Dubai", start: 5781644, end: 5781809 }, { filename: "/pglite/share/postgresql/timezone/Asia/Dushanbe", start: 5781809, end: 5782400 }, { filename: "/pglite/share/postgresql/timezone/Asia/Famagusta", start: 5782400, end: 5784428 }, { filename: "/pglite/share/postgresql/timezone/Asia/Gaza", start: 5784428, end: 5788272 }, { filename: "/pglite/share/postgresql/timezone/Asia/Harbin", start: 5788272, end: 5788833 }, { filename: "/pglite/share/postgresql/timezone/Asia/Hebron", start: 5788833, end: 5792705 }, { filename: "/pglite/share/postgresql/timezone/Asia/Ho_Chi_Minh", start: 5792705, end: 5793056 }, { filename: "/pglite/share/postgresql/timezone/Asia/Hong_Kong", start: 5793056, end: 5794289 }, { filename: "/pglite/share/postgresql/timezone/Asia/Hovd", start: 5794289, end: 5795180 }, { filename: "/pglite/share/postgresql/timezone/Asia/Irkutsk", start: 5795180, end: 5796423 }, { filename: "/pglite/share/postgresql/timezone/Asia/Istanbul", start: 5796423, end: 5798370 }, { filename: "/pglite/share/postgresql/timezone/Asia/Jakarta", start: 5798370, end: 5798753 }, { filename: "/pglite/share/postgresql/timezone/Asia/Jayapura", start: 5798753, end: 5798974 }, { filename: "/pglite/share/postgresql/timezone/Asia/Jerusalem", start: 5798974, end: 5801362 }, { filename: "/pglite/share/postgresql/timezone/Asia/Kabul", start: 5801362, end: 5801570 }, { filename: "/pglite/share/postgresql/timezone/Asia/Kamchatka", start: 5801570, end: 5802736 }, { filename: "/pglite/share/postgresql/timezone/Asia/Karachi", start: 5802736, end: 5803115 }, { filename: "/pglite/share/postgresql/timezone/Asia/Kashgar", start: 5803115, end: 5803280 }, { filename: "/pglite/share/postgresql/timezone/Asia/Kathmandu", start: 5803280, end: 5803492 }, { filename: "/pglite/share/postgresql/timezone/Asia/Katmandu", start: 5803492, end: 5803704 }, { filename: "/pglite/share/postgresql/timezone/Asia/Khandyga", start: 5803704, end: 5804975 }, { filename: "/pglite/share/postgresql/timezone/Asia/Kolkata", start: 5804975, end: 5805260 }, { filename: "/pglite/share/postgresql/timezone/Asia/Krasnoyarsk", start: 5805260, end: 5806467 }, { filename: "/pglite/share/postgresql/timezone/Asia/Kuala_Lumpur", start: 5806467, end: 5806882 }, { filename: "/pglite/share/postgresql/timezone/Asia/Kuching", start: 5806882, end: 5807365 }, { filename: "/pglite/share/postgresql/timezone/Asia/Kuwait", start: 5807365, end: 5807530 }, { filename: "/pglite/share/postgresql/timezone/Asia/Macao", start: 5807530, end: 5808757 }, { filename: "/pglite/share/postgresql/timezone/Asia/Macau", start: 5808757, end: 5809984 }, { filename: "/pglite/share/postgresql/timezone/Asia/Magadan", start: 5809984, end: 5811206 }, { filename: "/pglite/share/postgresql/timezone/Asia/Makassar", start: 5811206, end: 5811460 }, { filename: "/pglite/share/postgresql/timezone/Asia/Manila", start: 5811460, end: 5811882 }, { filename: "/pglite/share/postgresql/timezone/Asia/Muscat", start: 5811882, end: 5812047 }, { filename: "/pglite/share/postgresql/timezone/Asia/Nicosia", start: 5812047, end: 5814049 }, { filename: "/pglite/share/postgresql/timezone/Asia/Novokuznetsk", start: 5814049, end: 5815214 }, { filename: "/pglite/share/postgresql/timezone/Asia/Novosibirsk", start: 5815214, end: 5816435 }, { filename: "/pglite/share/postgresql/timezone/Asia/Omsk", start: 5816435, end: 5817642 }, { filename: "/pglite/share/postgresql/timezone/Asia/Oral", start: 5817642, end: 5818647 }, { filename: "/pglite/share/postgresql/timezone/Asia/Phnom_Penh", start: 5818647, end: 5818846 }, { filename: "/pglite/share/postgresql/timezone/Asia/Pontianak", start: 5818846, end: 5819199 }, { filename: "/pglite/share/postgresql/timezone/Asia/Pyongyang", start: 5819199, end: 5819436 }, { filename: "/pglite/share/postgresql/timezone/Asia/Qatar", start: 5819436, end: 5819635 }, { filename: "/pglite/share/postgresql/timezone/Asia/Qostanay", start: 5819635, end: 5820674 }, { filename: "/pglite/share/postgresql/timezone/Asia/Qyzylorda", start: 5820674, end: 5821699 }, { filename: "/pglite/share/postgresql/timezone/Asia/Rangoon", start: 5821699, end: 5821967 }, { filename: "/pglite/share/postgresql/timezone/Asia/Riyadh", start: 5821967, end: 5822132 }, { filename: "/pglite/share/postgresql/timezone/Asia/Saigon", start: 5822132, end: 5822483 }, { filename: "/pglite/share/postgresql/timezone/Asia/Sakhalin", start: 5822483, end: 5823685 }, { filename: "/pglite/share/postgresql/timezone/Asia/Samarkand", start: 5823685, end: 5824262 }, { filename: "/pglite/share/postgresql/timezone/Asia/Seoul", start: 5824262, end: 5824879 }, { filename: "/pglite/share/postgresql/timezone/Asia/Shanghai", start: 5824879, end: 5825440 }, { filename: "/pglite/share/postgresql/timezone/Asia/Singapore", start: 5825440, end: 5825855 }, { filename: "/pglite/share/postgresql/timezone/Asia/Srednekolymsk", start: 5825855, end: 5827063 }, { filename: "/pglite/share/postgresql/timezone/Asia/Taipei", start: 5827063, end: 5827824 }, { filename: "/pglite/share/postgresql/timezone/Asia/Tashkent", start: 5827824, end: 5828415 }, { filename: "/pglite/share/postgresql/timezone/Asia/Tbilisi", start: 5828415, end: 5829450 }, { filename: "/pglite/share/postgresql/timezone/Asia/Tehran", start: 5829450, end: 5830712 }, { filename: "/pglite/share/postgresql/timezone/Asia/Tel_Aviv", start: 5830712, end: 5833100 }, { filename: "/pglite/share/postgresql/timezone/Asia/Thimbu", start: 5833100, end: 5833303 }, { filename: "/pglite/share/postgresql/timezone/Asia/Thimphu", start: 5833303, end: 5833506 }, { filename: "/pglite/share/postgresql/timezone/Asia/Tokyo", start: 5833506, end: 5833815 }, { filename: "/pglite/share/postgresql/timezone/Asia/Tomsk", start: 5833815, end: 5835036 }, { filename: "/pglite/share/postgresql/timezone/Asia/Ujung_Pandang", start: 5835036, end: 5835290 }, { filename: "/pglite/share/postgresql/timezone/Asia/Ulaanbaatar", start: 5835290, end: 5836181 }, { filename: "/pglite/share/postgresql/timezone/Asia/Ulan_Bator", start: 5836181, end: 5837072 }, { filename: "/pglite/share/postgresql/timezone/Asia/Urumqi", start: 5837072, end: 5837237 }, { filename: "/pglite/share/postgresql/timezone/Asia/Ust-Nera", start: 5837237, end: 5838489 }, { filename: "/pglite/share/postgresql/timezone/Asia/Vientiane", start: 5838489, end: 5838688 }, { filename: "/pglite/share/postgresql/timezone/Asia/Vladivostok", start: 5838688, end: 5839896 }, { filename: "/pglite/share/postgresql/timezone/Asia/Yakutsk", start: 5839896, end: 5841103 }, { filename: "/pglite/share/postgresql/timezone/Asia/Yangon", start: 5841103, end: 5841371 }, { filename: "/pglite/share/postgresql/timezone/Asia/Yekaterinburg", start: 5841371, end: 5842614 }, { filename: "/pglite/share/postgresql/timezone/Asia/Yerevan", start: 5842614, end: 5843765 }, { filename: "/pglite/share/postgresql/timezone/Atlantic/Azores", start: 5843765, end: 5847221 }, { filename: "/pglite/share/postgresql/timezone/Atlantic/Bermuda", start: 5847221, end: 5849617 }, { filename: "/pglite/share/postgresql/timezone/Atlantic/Canary", start: 5849617, end: 5851514 }, { filename: "/pglite/share/postgresql/timezone/Atlantic/Cape_Verde", start: 5851514, end: 5851784 }, { filename: "/pglite/share/postgresql/timezone/Atlantic/Faeroe", start: 5851784, end: 5853599 }, { filename: "/pglite/share/postgresql/timezone/Atlantic/Faroe", start: 5853599, end: 5855414 }, { filename: "/pglite/share/postgresql/timezone/Atlantic/Jan_Mayen", start: 5855414, end: 5857712 }, { filename: "/pglite/share/postgresql/timezone/Atlantic/Madeira", start: 5857712, end: 5861089 }, { filename: "/pglite/share/postgresql/timezone/Atlantic/Reykjavik", start: 5861089, end: 5861237 }, { filename: "/pglite/share/postgresql/timezone/Atlantic/South_Georgia", start: 5861237, end: 5861401 }, { filename: "/pglite/share/postgresql/timezone/Atlantic/St_Helena", start: 5861401, end: 5861549 }, { filename: "/pglite/share/postgresql/timezone/Atlantic/Stanley", start: 5861549, end: 5862763 }, { filename: "/pglite/share/postgresql/timezone/Australia/ACT", start: 5862763, end: 5864953 }, { filename: "/pglite/share/postgresql/timezone/Australia/Adelaide", start: 5864953, end: 5867161 }, { filename: "/pglite/share/postgresql/timezone/Australia/Brisbane", start: 5867161, end: 5867580 }, { filename: "/pglite/share/postgresql/timezone/Australia/Broken_Hill", start: 5867580, end: 5869809 }, { filename: "/pglite/share/postgresql/timezone/Australia/Canberra", start: 5869809, end: 5871999 }, { filename: "/pglite/share/postgresql/timezone/Australia/Currie", start: 5871999, end: 5874357 }, { filename: "/pglite/share/postgresql/timezone/Australia/Darwin", start: 5874357, end: 5874682 }, { filename: "/pglite/share/postgresql/timezone/Australia/Eucla", start: 5874682, end: 5875152 }, { filename: "/pglite/share/postgresql/timezone/Australia/Hobart", start: 5875152, end: 5877510 }, { filename: "/pglite/share/postgresql/timezone/Australia/LHI", start: 5877510, end: 5879370 }, { filename: "/pglite/share/postgresql/timezone/Australia/Lindeman", start: 5879370, end: 5879845 }, { filename: "/pglite/share/postgresql/timezone/Australia/Lord_Howe", start: 5879845, end: 5881705 }, { filename: "/pglite/share/postgresql/timezone/Australia/Melbourne", start: 5881705, end: 5883895 }, { filename: "/pglite/share/postgresql/timezone/Australia/NSW", start: 5883895, end: 5886085 }, { filename: "/pglite/share/postgresql/timezone/Australia/North", start: 5886085, end: 5886410 }, { filename: "/pglite/share/postgresql/timezone/Australia/Perth", start: 5886410, end: 5886856 }, { filename: "/pglite/share/postgresql/timezone/Australia/Queensland", start: 5886856, end: 5887275 }, { filename: "/pglite/share/postgresql/timezone/Australia/South", start: 5887275, end: 5889483 }, { filename: "/pglite/share/postgresql/timezone/Australia/Sydney", start: 5889483, end: 5891673 }, { filename: "/pglite/share/postgresql/timezone/Australia/Tasmania", start: 5891673, end: 5894031 }, { filename: "/pglite/share/postgresql/timezone/Australia/Victoria", start: 5894031, end: 5896221 }, { filename: "/pglite/share/postgresql/timezone/Australia/West", start: 5896221, end: 5896667 }, { filename: "/pglite/share/postgresql/timezone/Australia/Yancowinna", start: 5896667, end: 5898896 }, { filename: "/pglite/share/postgresql/timezone/Brazil/Acre", start: 5898896, end: 5899524 }, { filename: "/pglite/share/postgresql/timezone/Brazil/DeNoronha", start: 5899524, end: 5900240 }, { filename: "/pglite/share/postgresql/timezone/Brazil/East", start: 5900240, end: 5901684 }, { filename: "/pglite/share/postgresql/timezone/Brazil/West", start: 5901684, end: 5902288 }, { filename: "/pglite/share/postgresql/timezone/CET", start: 5902288, end: 5905221 }, { filename: "/pglite/share/postgresql/timezone/CST6CDT", start: 5905221, end: 5908813 }, { filename: "/pglite/share/postgresql/timezone/Canada/Atlantic", start: 5908813, end: 5912237 }, { filename: "/pglite/share/postgresql/timezone/Canada/Central", start: 5912237, end: 5915105 }, { filename: "/pglite/share/postgresql/timezone/Canada/Eastern", start: 5915105, end: 5918599 }, { filename: "/pglite/share/postgresql/timezone/Canada/Mountain", start: 5918599, end: 5920931 }, { filename: "/pglite/share/postgresql/timezone/Canada/Newfoundland", start: 5920931, end: 5924586 }, { filename: "/pglite/share/postgresql/timezone/Canada/Pacific", start: 5924586, end: 5927478 }, { filename: "/pglite/share/postgresql/timezone/Canada/Saskatchewan", start: 5927478, end: 5928458 }, { filename: "/pglite/share/postgresql/timezone/Canada/Yukon", start: 5928458, end: 5930072 }, { filename: "/pglite/share/postgresql/timezone/Chile/Continental", start: 5930072, end: 5932601 }, { filename: "/pglite/share/postgresql/timezone/Chile/EasterIsland", start: 5932601, end: 5934834 }, { filename: "/pglite/share/postgresql/timezone/Cuba", start: 5934834, end: 5937250 }, { filename: "/pglite/share/postgresql/timezone/EET", start: 5937250, end: 5939512 }, { filename: "/pglite/share/postgresql/timezone/EST", start: 5939512, end: 5939694 }, { filename: "/pglite/share/postgresql/timezone/EST5EDT", start: 5939694, end: 5943246 }, { filename: "/pglite/share/postgresql/timezone/Egypt", start: 5943246, end: 5945645 }, { filename: "/pglite/share/postgresql/timezone/Eire", start: 5945645, end: 5949137 }, { filename: "/pglite/share/postgresql/timezone/Etc/GMT", start: 5949137, end: 5949251 }, { filename: "/pglite/share/postgresql/timezone/Etc/GMT+0", start: 5949251, end: 5949365 }, { filename: "/pglite/share/postgresql/timezone/Etc/GMT+1", start: 5949365, end: 5949481 }, { filename: "/pglite/share/postgresql/timezone/Etc/GMT+10", start: 5949481, end: 5949598 }, { filename: "/pglite/share/postgresql/timezone/Etc/GMT+11", start: 5949598, end: 5949715 }, { filename: "/pglite/share/postgresql/timezone/Etc/GMT+12", start: 5949715, end: 5949832 }, { filename: "/pglite/share/postgresql/timezone/Etc/GMT+2", start: 5949832, end: 5949948 }, { filename: "/pglite/share/postgresql/timezone/Etc/GMT+3", start: 5949948, end: 5950064 }, { filename: "/pglite/share/postgresql/timezone/Etc/GMT+4", start: 5950064, end: 5950180 }, { filename: "/pglite/share/postgresql/timezone/Etc/GMT+5", start: 5950180, end: 5950296 }, { filename: "/pglite/share/postgresql/timezone/Etc/GMT+6", start: 5950296, end: 5950412 }, { filename: "/pglite/share/postgresql/timezone/Etc/GMT+7", start: 5950412, end: 5950528 }, { filename: "/pglite/share/postgresql/timezone/Etc/GMT+8", start: 5950528, end: 5950644 }, { filename: "/pglite/share/postgresql/timezone/Etc/GMT+9", start: 5950644, end: 5950760 }, { filename: "/pglite/share/postgresql/timezone/Etc/GMT-0", start: 5950760, end: 5950874 }, { filename: "/pglite/share/postgresql/timezone/Etc/GMT-1", start: 5950874, end: 5950991 }, { filename: "/pglite/share/postgresql/timezone/Etc/GMT-10", start: 5950991, end: 5951109 }, { filename: "/pglite/share/postgresql/timezone/Etc/GMT-11", start: 5951109, end: 5951227 }, { filename: "/pglite/share/postgresql/timezone/Etc/GMT-12", start: 5951227, end: 5951345 }, { filename: "/pglite/share/postgresql/timezone/Etc/GMT-13", start: 5951345, end: 5951463 }, { filename: "/pglite/share/postgresql/timezone/Etc/GMT-14", start: 5951463, end: 5951581 }, { filename: "/pglite/share/postgresql/timezone/Etc/GMT-2", start: 5951581, end: 5951698 }, { filename: "/pglite/share/postgresql/timezone/Etc/GMT-3", start: 5951698, end: 5951815 }, { filename: "/pglite/share/postgresql/timezone/Etc/GMT-4", start: 5951815, end: 5951932 }, { filename: "/pglite/share/postgresql/timezone/Etc/GMT-5", start: 5951932, end: 5952049 }, { filename: "/pglite/share/postgresql/timezone/Etc/GMT-6", start: 5952049, end: 5952166 }, { filename: "/pglite/share/postgresql/timezone/Etc/GMT-7", start: 5952166, end: 5952283 }, { filename: "/pglite/share/postgresql/timezone/Etc/GMT-8", start: 5952283, end: 5952400 }, { filename: "/pglite/share/postgresql/timezone/Etc/GMT-9", start: 5952400, end: 5952517 }, { filename: "/pglite/share/postgresql/timezone/Etc/GMT0", start: 5952517, end: 5952631 }, { filename: "/pglite/share/postgresql/timezone/Etc/Greenwich", start: 5952631, end: 5952745 }, { filename: "/pglite/share/postgresql/timezone/Etc/UCT", start: 5952745, end: 5952859 }, { filename: "/pglite/share/postgresql/timezone/Etc/UTC", start: 5952859, end: 5952973 }, { filename: "/pglite/share/postgresql/timezone/Etc/Universal", start: 5952973, end: 5953087 }, { filename: "/pglite/share/postgresql/timezone/Etc/Zulu", start: 5953087, end: 5953201 }, { filename: "/pglite/share/postgresql/timezone/Europe/Amsterdam", start: 5953201, end: 5956134 }, { filename: "/pglite/share/postgresql/timezone/Europe/Andorra", start: 5956134, end: 5957876 }, { filename: "/pglite/share/postgresql/timezone/Europe/Astrakhan", start: 5957876, end: 5959041 }, { filename: "/pglite/share/postgresql/timezone/Europe/Athens", start: 5959041, end: 5961303 }, { filename: "/pglite/share/postgresql/timezone/Europe/Belfast", start: 5961303, end: 5964967 }, { filename: "/pglite/share/postgresql/timezone/Europe/Belgrade", start: 5964967, end: 5966887 }, { filename: "/pglite/share/postgresql/timezone/Europe/Berlin", start: 5966887, end: 5969185 }, { filename: "/pglite/share/postgresql/timezone/Europe/Bratislava", start: 5969185, end: 5971486 }, { filename: "/pglite/share/postgresql/timezone/Europe/Brussels", start: 5971486, end: 5974419 }, { filename: "/pglite/share/postgresql/timezone/Europe/Bucharest", start: 5974419, end: 5976603 }, { filename: "/pglite/share/postgresql/timezone/Europe/Budapest", start: 5976603, end: 5978971 }, { filename: "/pglite/share/postgresql/timezone/Europe/Busingen", start: 5978971, end: 5980880 }, { filename: "/pglite/share/postgresql/timezone/Europe/Chisinau", start: 5980880, end: 5983270 }, { filename: "/pglite/share/postgresql/timezone/Europe/Copenhagen", start: 5983270, end: 5985568 }, { filename: "/pglite/share/postgresql/timezone/Europe/Dublin", start: 5985568, end: 5989060 }, { filename: "/pglite/share/postgresql/timezone/Europe/Gibraltar", start: 5989060, end: 5992128 }, { filename: "/pglite/share/postgresql/timezone/Europe/Guernsey", start: 5992128, end: 5995792 }, { filename: "/pglite/share/postgresql/timezone/Europe/Helsinki", start: 5995792, end: 5997692 }, { filename: "/pglite/share/postgresql/timezone/Europe/Isle_of_Man", start: 5997692, end: 6001356 }, { filename: "/pglite/share/postgresql/timezone/Europe/Istanbul", start: 6001356, end: 6003303 }, { filename: "/pglite/share/postgresql/timezone/Europe/Jersey", start: 6003303, end: 6006967 }, { filename: "/pglite/share/postgresql/timezone/Europe/Kaliningrad", start: 6006967, end: 6008460 }, { filename: "/pglite/share/postgresql/timezone/Europe/Kiev", start: 6008460, end: 6010580 }, { filename: "/pglite/share/postgresql/timezone/Europe/Kirov", start: 6010580, end: 6011765 }, { filename: "/pglite/share/postgresql/timezone/Europe/Kyiv", start: 6011765, end: 6013885 }, { filename: "/pglite/share/postgresql/timezone/Europe/Lisbon", start: 6013885, end: 6017412 }, { filename: "/pglite/share/postgresql/timezone/Europe/Ljubljana", start: 6017412, end: 6019332 }, { filename: "/pglite/share/postgresql/timezone/Europe/London", start: 6019332, end: 6022996 }, { filename: "/pglite/share/postgresql/timezone/Europe/Luxembourg", start: 6022996, end: 6025929 }, { filename: "/pglite/share/postgresql/timezone/Europe/Madrid", start: 6025929, end: 6028543 }, { filename: "/pglite/share/postgresql/timezone/Europe/Malta", start: 6028543, end: 6031163 }, { filename: "/pglite/share/postgresql/timezone/Europe/Mariehamn", start: 6031163, end: 6033063 }, { filename: "/pglite/share/postgresql/timezone/Europe/Minsk", start: 6033063, end: 6034384 }, { filename: "/pglite/share/postgresql/timezone/Europe/Monaco", start: 6034384, end: 6037346 }, { filename: "/pglite/share/postgresql/timezone/Europe/Moscow", start: 6037346, end: 6038881 }, { filename: "/pglite/share/postgresql/timezone/Europe/Nicosia", start: 6038881, end: 6040883 }, { filename: "/pglite/share/postgresql/timezone/Europe/Oslo", start: 6040883, end: 6043181 }, { filename: "/pglite/share/postgresql/timezone/Europe/Paris", start: 6043181, end: 6046143 }, { filename: "/pglite/share/postgresql/timezone/Europe/Podgorica", start: 6046143, end: 6048063 }, { filename: "/pglite/share/postgresql/timezone/Europe/Prague", start: 6048063, end: 6050364 }, { filename: "/pglite/share/postgresql/timezone/Europe/Riga", start: 6050364, end: 6052562 }, { filename: "/pglite/share/postgresql/timezone/Europe/Rome", start: 6052562, end: 6055203 }, { filename: "/pglite/share/postgresql/timezone/Europe/Samara", start: 6055203, end: 6056418 }, { filename: "/pglite/share/postgresql/timezone/Europe/San_Marino", start: 6056418, end: 6059059 }, { filename: "/pglite/share/postgresql/timezone/Europe/Sarajevo", start: 6059059, end: 6060979 }, { filename: "/pglite/share/postgresql/timezone/Europe/Saratov", start: 6060979, end: 6062162 }, { filename: "/pglite/share/postgresql/timezone/Europe/Simferopol", start: 6062162, end: 6063631 }, { filename: "/pglite/share/postgresql/timezone/Europe/Skopje", start: 6063631, end: 6065551 }, { filename: "/pglite/share/postgresql/timezone/Europe/Sofia", start: 6065551, end: 6067628 }, { filename: "/pglite/share/postgresql/timezone/Europe/Stockholm", start: 6067628, end: 6069926 }, { filename: "/pglite/share/postgresql/timezone/Europe/Tallinn", start: 6069926, end: 6072074 }, { filename: "/pglite/share/postgresql/timezone/Europe/Tirane", start: 6072074, end: 6074158 }, { filename: "/pglite/share/postgresql/timezone/Europe/Tiraspol", start: 6074158, end: 6076548 }, { filename: "/pglite/share/postgresql/timezone/Europe/Ulyanovsk", start: 6076548, end: 6077815 }, { filename: "/pglite/share/postgresql/timezone/Europe/Uzhgorod", start: 6077815, end: 6079935 }, { filename: "/pglite/share/postgresql/timezone/Europe/Vaduz", start: 6079935, end: 6081844 }, { filename: "/pglite/share/postgresql/timezone/Europe/Vatican", start: 6081844, end: 6084485 }, { filename: "/pglite/share/postgresql/timezone/Europe/Vienna", start: 6084485, end: 6086685 }, { filename: "/pglite/share/postgresql/timezone/Europe/Vilnius", start: 6086685, end: 6088847 }, { filename: "/pglite/share/postgresql/timezone/Europe/Volgograd", start: 6088847, end: 6090040 }, { filename: "/pglite/share/postgresql/timezone/Europe/Warsaw", start: 6090040, end: 6092694 }, { filename: "/pglite/share/postgresql/timezone/Europe/Zagreb", start: 6092694, end: 6094614 }, { filename: "/pglite/share/postgresql/timezone/Europe/Zaporozhye", start: 6094614, end: 6096734 }, { filename: "/pglite/share/postgresql/timezone/Europe/Zurich", start: 6096734, end: 6098643 }, { filename: "/pglite/share/postgresql/timezone/Factory", start: 6098643, end: 6098759 }, { filename: "/pglite/share/postgresql/timezone/GB", start: 6098759, end: 6102423 }, { filename: "/pglite/share/postgresql/timezone/GB-Eire", start: 6102423, end: 6106087 }, { filename: "/pglite/share/postgresql/timezone/GMT", start: 6106087, end: 6106201 }, { filename: "/pglite/share/postgresql/timezone/GMT+0", start: 6106201, end: 6106315 }, { filename: "/pglite/share/postgresql/timezone/GMT-0", start: 6106315, end: 6106429 }, { filename: "/pglite/share/postgresql/timezone/GMT0", start: 6106429, end: 6106543 }, { filename: "/pglite/share/postgresql/timezone/Greenwich", start: 6106543, end: 6106657 }, { filename: "/pglite/share/postgresql/timezone/HST", start: 6106657, end: 6106986 }, { filename: "/pglite/share/postgresql/timezone/Hongkong", start: 6106986, end: 6108219 }, { filename: "/pglite/share/postgresql/timezone/Iceland", start: 6108219, end: 6108367 }, { filename: "/pglite/share/postgresql/timezone/Indian/Antananarivo", start: 6108367, end: 6108632 }, { filename: "/pglite/share/postgresql/timezone/Indian/Chagos", start: 6108632, end: 6108831 }, { filename: "/pglite/share/postgresql/timezone/Indian/Christmas", start: 6108831, end: 6109030 }, { filename: "/pglite/share/postgresql/timezone/Indian/Cocos", start: 6109030, end: 6109298 }, { filename: "/pglite/share/postgresql/timezone/Indian/Comoro", start: 6109298, end: 6109563 }, { filename: "/pglite/share/postgresql/timezone/Indian/Kerguelen", start: 6109563, end: 6109762 }, { filename: "/pglite/share/postgresql/timezone/Indian/Mahe", start: 6109762, end: 6109927 }, { filename: "/pglite/share/postgresql/timezone/Indian/Maldives", start: 6109927, end: 6110126 }, { filename: "/pglite/share/postgresql/timezone/Indian/Mauritius", start: 6110126, end: 6110367 }, { filename: "/pglite/share/postgresql/timezone/Indian/Mayotte", start: 6110367, end: 6110632 }, { filename: "/pglite/share/postgresql/timezone/Indian/Reunion", start: 6110632, end: 6110797 }, { filename: "/pglite/share/postgresql/timezone/Iran", start: 6110797, end: 6112059 }, { filename: "/pglite/share/postgresql/timezone/Israel", start: 6112059, end: 6114447 }, { filename: "/pglite/share/postgresql/timezone/Jamaica", start: 6114447, end: 6114929 }, { filename: "/pglite/share/postgresql/timezone/Japan", start: 6114929, end: 6115238 }, { filename: "/pglite/share/postgresql/timezone/Kwajalein", start: 6115238, end: 6115554 }, { filename: "/pglite/share/postgresql/timezone/Libya", start: 6115554, end: 6116179 }, { filename: "/pglite/share/postgresql/timezone/MET", start: 6116179, end: 6119112 }, { filename: "/pglite/share/postgresql/timezone/MST", start: 6119112, end: 6119472 }, { filename: "/pglite/share/postgresql/timezone/MST7MDT", start: 6119472, end: 6121932 }, { filename: "/pglite/share/postgresql/timezone/Mexico/BajaNorte", start: 6121932, end: 6124838 }, { filename: "/pglite/share/postgresql/timezone/Mexico/BajaSur", start: 6124838, end: 6125898 }, { filename: "/pglite/share/postgresql/timezone/Mexico/General", start: 6125898, end: 6127120 }, { filename: "/pglite/share/postgresql/timezone/NZ", start: 6127120, end: 6129557 }, { filename: "/pglite/share/postgresql/timezone/NZ-CHAT", start: 6129557, end: 6131625 }, { filename: "/pglite/share/postgresql/timezone/Navajo", start: 6131625, end: 6134085 }, { filename: "/pglite/share/postgresql/timezone/PRC", start: 6134085, end: 6134646 }, { filename: "/pglite/share/postgresql/timezone/PST8PDT", start: 6134646, end: 6137498 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Apia", start: 6137498, end: 6138110 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Auckland", start: 6138110, end: 6140547 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Bougainville", start: 6140547, end: 6140815 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Chatham", start: 6140815, end: 6142883 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Chuuk", start: 6142883, end: 6143069 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Easter", start: 6143069, end: 6145302 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Efate", start: 6145302, end: 6145840 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Enderbury", start: 6145840, end: 6146074 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Fakaofo", start: 6146074, end: 6146274 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Fiji", start: 6146274, end: 6146852 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Funafuti", start: 6146852, end: 6147018 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Galapagos", start: 6147018, end: 6147256 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Gambier", start: 6147256, end: 6147420 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Guadalcanal", start: 6147420, end: 6147586 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Guam", start: 6147586, end: 6148080 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Honolulu", start: 6148080, end: 6148409 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Johnston", start: 6148409, end: 6148738 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Kanton", start: 6148738, end: 6148972 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Kiritimati", start: 6148972, end: 6149210 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Kosrae", start: 6149210, end: 6149561 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Kwajalein", start: 6149561, end: 6149877 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Majuro", start: 6149877, end: 6150043 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Marquesas", start: 6150043, end: 6150216 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Midway", start: 6150216, end: 6150391 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Nauru", start: 6150391, end: 6150643 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Niue", start: 6150643, end: 6150846 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Norfolk", start: 6150846, end: 6151726 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Noumea", start: 6151726, end: 6152030 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Pago_Pago", start: 6152030, end: 6152205 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Palau", start: 6152205, end: 6152385 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Pitcairn", start: 6152385, end: 6152587 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Pohnpei", start: 6152587, end: 6152753 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Ponape", start: 6152753, end: 6152919 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Port_Moresby", start: 6152919, end: 6153105 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Rarotonga", start: 6153105, end: 6153708 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Saipan", start: 6153708, end: 6154202 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Samoa", start: 6154202, end: 6154377 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Tahiti", start: 6154377, end: 6154542 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Tarawa", start: 6154542, end: 6154708 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Tongatapu", start: 6154708, end: 6155080 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Truk", start: 6155080, end: 6155266 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Wake", start: 6155266, end: 6155432 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Wallis", start: 6155432, end: 6155598 }, { filename: "/pglite/share/postgresql/timezone/Pacific/Yap", start: 6155598, end: 6155784 }, { filename: "/pglite/share/postgresql/timezone/Poland", start: 6155784, end: 6158438 }, { filename: "/pglite/share/postgresql/timezone/Portugal", start: 6158438, end: 6161965 }, { filename: "/pglite/share/postgresql/timezone/ROC", start: 6161965, end: 6162726 }, { filename: "/pglite/share/postgresql/timezone/ROK", start: 6162726, end: 6163343 }, { filename: "/pglite/share/postgresql/timezone/Singapore", start: 6163343, end: 6163758 }, { filename: "/pglite/share/postgresql/timezone/Turkey", start: 6163758, end: 6165705 }, { filename: "/pglite/share/postgresql/timezone/UCT", start: 6165705, end: 6165819 }, { filename: "/pglite/share/postgresql/timezone/US/Alaska", start: 6165819, end: 6168190 }, { filename: "/pglite/share/postgresql/timezone/US/Aleutian", start: 6168190, end: 6170546 }, { filename: "/pglite/share/postgresql/timezone/US/Arizona", start: 6170546, end: 6170906 }, { filename: "/pglite/share/postgresql/timezone/US/Central", start: 6170906, end: 6174498 }, { filename: "/pglite/share/postgresql/timezone/US/East-Indiana", start: 6174498, end: 6176180 }, { filename: "/pglite/share/postgresql/timezone/US/Eastern", start: 6176180, end: 6179732 }, { filename: "/pglite/share/postgresql/timezone/US/Hawaii", start: 6179732, end: 6180061 }, { filename: "/pglite/share/postgresql/timezone/US/Indiana-Starke", start: 6180061, end: 6182505 }, { filename: "/pglite/share/postgresql/timezone/US/Michigan", start: 6182505, end: 6184735 }, { filename: "/pglite/share/postgresql/timezone/US/Mountain", start: 6184735, end: 6187195 }, { filename: "/pglite/share/postgresql/timezone/US/Pacific", start: 6187195, end: 6190047 }, { filename: "/pglite/share/postgresql/timezone/US/Samoa", start: 6190047, end: 6190222 }, { filename: "/pglite/share/postgresql/timezone/UTC", start: 6190222, end: 6190336 }, { filename: "/pglite/share/postgresql/timezone/Universal", start: 6190336, end: 6190450 }, { filename: "/pglite/share/postgresql/timezone/W-SU", start: 6190450, end: 6191985 }, { filename: "/pglite/share/postgresql/timezone/WET", start: 6191985, end: 6195512 }, { filename: "/pglite/share/postgresql/timezone/Zulu", start: 6195512, end: 6195626 }, { filename: "/pglite/share/postgresql/timezonesets/Africa.txt", start: 6195626, end: 6202599 }, { filename: "/pglite/share/postgresql/timezonesets/America.txt", start: 6202599, end: 6213606 }, { filename: "/pglite/share/postgresql/timezonesets/Antarctica.txt", start: 6213606, end: 6214740 }, { filename: "/pglite/share/postgresql/timezonesets/Asia.txt", start: 6214740, end: 6223051 }, { filename: "/pglite/share/postgresql/timezonesets/Atlantic.txt", start: 6223051, end: 6226584 }, { filename: "/pglite/share/postgresql/timezonesets/Australia", start: 6226584, end: 6227719 }, { filename: "/pglite/share/postgresql/timezonesets/Australia.txt", start: 6227719, end: 6231103 }, { filename: "/pglite/share/postgresql/timezonesets/Default", start: 6231103, end: 6258317 }, { filename: "/pglite/share/postgresql/timezonesets/Etc.txt", start: 6258317, end: 6259567 }, { filename: "/pglite/share/postgresql/timezonesets/Europe.txt", start: 6259567, end: 6268313 }, { filename: "/pglite/share/postgresql/timezonesets/India", start: 6268313, end: 6268906 }, { filename: "/pglite/share/postgresql/timezonesets/Indian.txt", start: 6268906, end: 6270167 }, { filename: "/pglite/share/postgresql/timezonesets/Pacific.txt", start: 6270167, end: 6273935 }, { filename: "/pglite/share/postgresql/tsearch_data/danish.stop", start: 6273935, end: 6274359 }, { filename: "/pglite/share/postgresql/tsearch_data/dutch.stop", start: 6274359, end: 6274812 }, { filename: "/pglite/share/postgresql/tsearch_data/english.stop", start: 6274812, end: 6275434 }, { filename: "/pglite/share/postgresql/tsearch_data/finnish.stop", start: 6275434, end: 6277013 }, { filename: "/pglite/share/postgresql/tsearch_data/french.stop", start: 6277013, end: 6277818 }, { filename: "/pglite/share/postgresql/tsearch_data/german.stop", start: 6277818, end: 6279167 }, { filename: "/pglite/share/postgresql/tsearch_data/hungarian.stop", start: 6279167, end: 6280394 }, { filename: "/pglite/share/postgresql/tsearch_data/hunspell_sample.affix", start: 6280394, end: 6280637 }, { filename: "/pglite/share/postgresql/tsearch_data/hunspell_sample_long.affix", start: 6280637, end: 6281270 }, { filename: "/pglite/share/postgresql/tsearch_data/hunspell_sample_long.dict", start: 6281270, end: 6281368 }, { filename: "/pglite/share/postgresql/tsearch_data/hunspell_sample_num.affix", start: 6281368, end: 6281830 }, { filename: "/pglite/share/postgresql/tsearch_data/hunspell_sample_num.dict", start: 6281830, end: 6281959 }, { filename: "/pglite/share/postgresql/tsearch_data/ispell_sample.affix", start: 6281959, end: 6282424 }, { filename: "/pglite/share/postgresql/tsearch_data/ispell_sample.dict", start: 6282424, end: 6282505 }, { filename: "/pglite/share/postgresql/tsearch_data/italian.stop", start: 6282505, end: 6284159 }, { filename: "/pglite/share/postgresql/tsearch_data/nepali.stop", start: 6284159, end: 6288420 }, { filename: "/pglite/share/postgresql/tsearch_data/norwegian.stop", start: 6288420, end: 6289271 }, { filename: "/pglite/share/postgresql/tsearch_data/portuguese.stop", start: 6289271, end: 6290538 }, { filename: "/pglite/share/postgresql/tsearch_data/russian.stop", start: 6290538, end: 6291773 }, { filename: "/pglite/share/postgresql/tsearch_data/spanish.stop", start: 6291773, end: 6293951 }, { filename: "/pglite/share/postgresql/tsearch_data/swedish.stop", start: 6293951, end: 6294510 }, { filename: "/pglite/share/postgresql/tsearch_data/synonym_sample.syn", start: 6294510, end: 6294583 }, { filename: "/pglite/share/postgresql/tsearch_data/thesaurus_sample.ths", start: 6294583, end: 6295056 }, { filename: "/pglite/share/postgresql/tsearch_data/turkish.stop", start: 6295056, end: 6295316 }], remote_package_size: 6295316 });
    })();
    var moduleOverrides = Object.assign({}, Module), arguments_ = [], thisProgram = "./this.program", quit_ = (e, t2) => {
      throw t2;
    }, scriptDirectory = "";
    function locateFile(e) {
      return Module.locateFile ? Module.locateFile(e, scriptDirectory) : scriptDirectory + e;
    }
    var readAsync, readBinary;
    if (ENVIRONMENT_IS_NODE) {
      var fs = require("fs"), nodePath = require("path");
      import.meta.url.startsWith("data:") || (scriptDirectory = nodePath.dirname(require("url").fileURLToPath(import.meta.url)) + "/"), readBinary = (e) => {
        e = isFileURI(e) ? new URL(e) : e;
        var t2 = fs.readFileSync(e);
        return t2;
      }, readAsync = async (e, t2 = true) => {
        e = isFileURI(e) ? new URL(e) : e;
        var r = fs.readFileSync(e, t2 ? void 0 : "utf8");
        return r;
      }, !Module.thisProgram && process.argv.length > 1 && (thisProgram = process.argv[1].replace(/\\/g, "/")), arguments_ = process.argv.slice(2), quit_ = (e, t2) => {
        throw process.exitCode = e, t2;
      };
    } else (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && (ENVIRONMENT_IS_WORKER ? scriptDirectory = self.location.href : typeof document < "u" && document.currentScript && (scriptDirectory = document.currentScript.src), _scriptName && (scriptDirectory = _scriptName), scriptDirectory.startsWith("blob:") ? scriptDirectory = "" : scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1), ENVIRONMENT_IS_WORKER && (readBinary = (e) => {
      var t2 = new XMLHttpRequest();
      return t2.open("GET", e, false), t2.responseType = "arraybuffer", t2.send(null), new Uint8Array(t2.response);
    }), readAsync = async (e) => {
      var t2 = await fetch(e, { credentials: "same-origin" });
      if (t2.ok) return t2.arrayBuffer();
      throw new Error(t2.status + " : " + t2.url);
    });
    var out = Module.print || console.log.bind(console), err = Module.printErr || console.error.bind(console);
    Object.assign(Module, moduleOverrides), moduleOverrides = null, Module.arguments && (arguments_ = Module.arguments), Module.thisProgram && (thisProgram = Module.thisProgram);
    var dynamicLibraries = Module.dynamicLibraries || [], wasmBinary = Module.wasmBinary;
    var wasmMemory, ABORT = false, EXITSTATUS;
    function assert(e, t2) {
      e || abort(t2);
    }
    var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAP64, HEAPF64;
    function updateMemoryViews() {
      var e = wasmMemory.buffer;
      Module.HEAP8 = HEAP8 = new Int8Array(e), Module.HEAP16 = HEAP16 = new Int16Array(e), Module.HEAPU8 = HEAPU8 = new Uint8Array(e), Module.HEAPU16 = HEAPU16 = new Uint16Array(e), Module.HEAP32 = HEAP32 = new Int32Array(e), Module.HEAPU32 = HEAPU32 = new Uint32Array(e), Module.HEAPF32 = HEAPF32 = new Float32Array(e), Module.HEAPF64 = HEAPF64 = new Float64Array(e), Module.HEAP64 = HEAP64 = new BigInt64Array(e), Module.HEAPU64 = new BigUint64Array(e);
    }
    if (Module.wasmMemory) wasmMemory = Module.wasmMemory;
    else {
      var INITIAL_MEMORY = Module.INITIAL_MEMORY || 134217728;
      wasmMemory = new WebAssembly.Memory({ initial: INITIAL_MEMORY / 65536, maximum: 32768 });
    }
    updateMemoryViews();
    var __ATPRERUN__ = [], __ATINIT__ = [], __ATMAIN__ = [], __ATEXIT__ = [], __ATPOSTRUN__ = [], __RELOC_FUNCS__ = [], runtimeInitialized = false, runtimeExited = false;
    function preRun() {
      if (Module.preRun) for (typeof Module.preRun == "function" && (Module.preRun = [Module.preRun]); Module.preRun.length; ) addOnPreRun(Module.preRun.shift());
      callRuntimeCallbacks(__ATPRERUN__);
    }
    function initRuntime() {
      runtimeInitialized = true, callRuntimeCallbacks(__RELOC_FUNCS__), !Module.noFSInit && !FS.initialized && FS.init(), FS.ignorePermissions = false, SOCKFS.root = FS.mount(SOCKFS, {}, null), PIPEFS.root = FS.mount(PIPEFS, {}, null), callRuntimeCallbacks(__ATINIT__);
    }
    function preMain() {
      callRuntimeCallbacks(__ATMAIN__);
    }
    function exitRuntime() {
      ___funcs_on_exit(), callRuntimeCallbacks(__ATEXIT__), FS.quit(), IDBFS.quit(), runtimeExited = true;
    }
    function postRun() {
      if (Module.postRun) for (typeof Module.postRun == "function" && (Module.postRun = [Module.postRun]); Module.postRun.length; ) addOnPostRun(Module.postRun.shift());
      callRuntimeCallbacks(__ATPOSTRUN__);
    }
    function addOnPreRun(e) {
      __ATPRERUN__.unshift(e);
    }
    function addOnInit(e) {
      __ATINIT__.unshift(e);
    }
    function addOnPostRun(e) {
      __ATPOSTRUN__.unshift(e);
    }
    var runDependencies = 0, dependenciesFulfilled = null;
    function addRunDependency(e) {
      runDependencies++, Module.monitorRunDependencies?.(runDependencies);
    }
    function removeRunDependency(e) {
      if (runDependencies--, Module.monitorRunDependencies?.(runDependencies), runDependencies == 0 && dependenciesFulfilled) {
        var t2 = dependenciesFulfilled;
        dependenciesFulfilled = null, t2();
      }
    }
    function abort(e) {
      Module.onAbort?.(e), e = "Aborted(" + e + ")", err(e), ABORT = true, e += ". Build with -sASSERTIONS for more info.";
      var t2 = new WebAssembly.RuntimeError(e);
      throw readyPromiseReject(t2), t2;
    }
    var dataURIPrefix = "data:application/octet-stream;base64,", isDataURI = (e) => e.startsWith(dataURIPrefix), isFileURI = (e) => e.startsWith("file://");
    function findWasmBinary() {
      if (Module.locateFile) {
        var e = "pglite.wasm";
        return isDataURI(e) ? e : locateFile(e);
      }
      return new URL("pglite.wasm", import.meta.url).href;
    }
    var wasmBinaryFile;
    function getBinarySync(e) {
      if (e == wasmBinaryFile && wasmBinary) return new Uint8Array(wasmBinary);
      if (readBinary) return readBinary(e);
      throw "both async and sync fetching of the wasm failed";
    }
    async function getWasmBinary(e) {
      if (!wasmBinary) try {
        var t2 = await readAsync(e);
        return new Uint8Array(t2);
      } catch {
      }
      return getBinarySync(e);
    }
    async function instantiateArrayBuffer(e, t2) {
      try {
        var r = await getWasmBinary(e), a2 = await WebAssembly.instantiate(r, t2);
        return a2;
      } catch (o2) {
        err(`failed to asynchronously prepare wasm: ${o2}`), abort(o2);
      }
    }
    async function instantiateAsync(e, t2, r) {
      if (!e && typeof WebAssembly.instantiateStreaming == "function" && !isDataURI(t2) && !ENVIRONMENT_IS_NODE && typeof fetch == "function") try {
        var a2 = fetch(t2, { credentials: "same-origin" }), o2 = await WebAssembly.instantiateStreaming(a2, r);
        return o2;
      } catch (_3) {
        err(`wasm streaming compile failed: ${_3}`), err("falling back to ArrayBuffer instantiation");
      }
      return instantiateArrayBuffer(t2, r);
    }
    function getWasmImports() {
      return { env: wasmImports, wasi_snapshot_preview1: wasmImports, "GOT.mem": new Proxy(wasmImports, GOTHandler), "GOT.func": new Proxy(wasmImports, GOTHandler) };
    }
    async function createWasm() {
      function e(o2, _3) {
        wasmExports = o2.exports, wasmExports = relocateExports(wasmExports, 1024);
        var s2 = getDylinkMetadata(_3);
        return s2.neededDynlibs && (dynamicLibraries = s2.neededDynlibs.concat(dynamicLibraries)), mergeLibSymbols(wasmExports), LDSO.init(), loadDylibs(), addOnInit(wasmExports.__wasm_call_ctors), __RELOC_FUNCS__.push(wasmExports.__wasm_apply_data_relocs), removeRunDependency(), wasmExports;
      }
      addRunDependency();
      function t2(o2) {
        e(o2.instance, o2.module);
      }
      var r = getWasmImports();
      if (Module.instantiateWasm) try {
        return Module.instantiateWasm(r, e);
      } catch (o2) {
        err(`Module.instantiateWasm callback failed with error: ${o2}`), readyPromiseReject(o2);
      }
      wasmBinaryFile ?? (wasmBinaryFile = findWasmBinary());
      try {
        var a2 = await instantiateAsync(wasmBinary, wasmBinaryFile, r);
        return t2(a2), a2;
      } catch (o2) {
        readyPromiseReject(o2);
        return;
      }
    }
    class ExitStatus {
      constructor(t2) {
        P$2(this, "name", "ExitStatus");
        this.message = `Program terminated with exit(${t2})`, this.status = t2;
      }
    }
    var GOT = {}, currentModuleWeakSymbols = /* @__PURE__ */ new Set([]), GOTHandler = { get(e, t2) {
      var r = GOT[t2];
      return r || (r = GOT[t2] = new WebAssembly.Global({ value: "i32", mutable: true })), currentModuleWeakSymbols.has(t2) || (r.required = true), r;
    } }, callRuntimeCallbacks = (e) => {
      for (; e.length > 0; ) e.shift()(Module);
    }, UTF8Decoder = typeof TextDecoder < "u" ? new TextDecoder() : void 0, UTF8ArrayToString = (e, t2 = 0, r = NaN) => {
      for (var a2 = t2 + r, o2 = t2; e[o2] && !(o2 >= a2); ) ++o2;
      if (o2 - t2 > 16 && e.buffer && UTF8Decoder) return UTF8Decoder.decode(e.subarray(t2, o2));
      for (var _3 = ""; t2 < o2; ) {
        var s2 = e[t2++];
        if (!(s2 & 128)) {
          _3 += String.fromCharCode(s2);
          continue;
        }
        var n2 = e[t2++] & 63;
        if ((s2 & 224) == 192) {
          _3 += String.fromCharCode((s2 & 31) << 6 | n2);
          continue;
        }
        var l2 = e[t2++] & 63;
        if ((s2 & 240) == 224 ? s2 = (s2 & 15) << 12 | n2 << 6 | l2 : s2 = (s2 & 7) << 18 | n2 << 12 | l2 << 6 | e[t2++] & 63, s2 < 65536) _3 += String.fromCharCode(s2);
        else {
          var d2 = s2 - 65536;
          _3 += String.fromCharCode(55296 | d2 >> 10, 56320 | d2 & 1023);
        }
      }
      return _3;
    }, getDylinkMetadata = (e) => {
      var t2 = 0, r = 0;
      function a2() {
        return e[t2++];
      }
      function o2() {
        for (var R2 = 0, L2 = 1; ; ) {
          var q2 = e[t2++];
          if (R2 += (q2 & 127) * L2, L2 *= 128, !(q2 & 128)) break;
        }
        return R2;
      }
      function _3() {
        var R2 = o2();
        return t2 += R2, UTF8ArrayToString(e, t2 - R2, R2);
      }
      function s2(R2, L2) {
        if (R2) throw new Error(L2);
      }
      var n2 = "dylink.0";
      if (e instanceof WebAssembly.Module) {
        var l2 = WebAssembly.Module.customSections(e, n2);
        l2.length === 0 && (n2 = "dylink", l2 = WebAssembly.Module.customSections(e, n2)), s2(l2.length === 0, "need dylink section"), e = new Uint8Array(l2[0]), r = e.length;
      } else {
        var d2 = new Uint32Array(new Uint8Array(e.subarray(0, 24)).buffer), p2 = d2[0] == 1836278016;
        s2(!p2, "need to see wasm magic number"), s2(e[8] !== 0, "need the dylink section to be first"), t2 = 9;
        var m2 = o2();
        r = t2 + m2, n2 = _3();
      }
      var g2 = { neededDynlibs: [], tlsExports: /* @__PURE__ */ new Set(), weakImports: /* @__PURE__ */ new Set() };
      if (n2 == "dylink") {
        g2.memorySize = o2(), g2.memoryAlign = o2(), g2.tableSize = o2(), g2.tableAlign = o2();
        for (var u2 = o2(), f2 = 0; f2 < u2; ++f2) {
          var c2 = _3();
          g2.neededDynlibs.push(c2);
        }
      } else {
        s2(n2 !== "dylink.0");
        for (var w2 = 1, S2 = 2, k2 = 3, E2 = 4, y2 = 256, M = 3, b2 = 1; t2 < r; ) {
          var F2 = a2(), A2 = o2();
          if (F2 === w2) g2.memorySize = o2(), g2.memoryAlign = o2(), g2.tableSize = o2(), g2.tableAlign = o2();
          else if (F2 === S2) for (var u2 = o2(), f2 = 0; f2 < u2; ++f2) c2 = _3(), g2.neededDynlibs.push(c2);
          else if (F2 === k2) for (var V2 = o2(); V2--; ) {
            var te2 = _3(), j2 = o2();
            j2 & y2 && g2.tlsExports.add(te2);
          }
          else if (F2 === E2) for (var V2 = o2(); V2--; ) {
            _3();
            var te2 = _3(), j2 = o2();
            (j2 & M) == b2 && g2.weakImports.add(te2);
          }
          else t2 += A2;
        }
      }
      return g2;
    };
    function getValue(e, t2 = "i8") {
      switch (t2.endsWith("*") && (t2 = "*"), t2) {
        case "i1":
          return HEAP8[e];
        case "i8":
          return HEAP8[e];
        case "i16":
          return HEAP16[e >> 1];
        case "i32":
          return HEAP32[e >> 2];
        case "i64":
          return HEAP64[e >> 3];
        case "float":
          return HEAPF32[e >> 2];
        case "double":
          return HEAPF64[e >> 3];
        case "*":
          return HEAPU32[e >> 2];
        default:
          abort(`invalid type for getValue: ${t2}`);
      }
    }
    var newDSO = (e, t2, r) => {
      var a2 = { refcount: 1 / 0, name: e, exports: r, global: true };
      return LDSO.loadedLibsByName[e] = a2, t2 != null && (LDSO.loadedLibsByHandle[t2] = a2), a2;
    }, LDSO = { loadedLibsByName: {}, loadedLibsByHandle: {}, init() {
      newDSO("__main__", 0, wasmImports);
    } }, ___heap_base = 11373728, alignMemory = (e, t2) => Math.ceil(e / t2) * t2, getMemory = (e) => {
      if (runtimeInitialized) return _calloc(e, 1);
      var t2 = ___heap_base, r = t2 + alignMemory(e, 16);
      return ___heap_base = r, GOT.__heap_base.value = r, t2;
    }, isInternalSym = (e) => ["__cpp_exception", "__c_longjmp", "__wasm_apply_data_relocs", "__dso_handle", "__tls_size", "__tls_align", "__set_stack_limits", "_emscripten_tls_init", "__wasm_init_tls", "__wasm_call_ctors", "__start_em_asm", "__stop_em_asm", "__start_em_js", "__stop_em_js"].includes(e) || e.startsWith("__em_js__"), uleb128Encode = (e, t2) => {
      e < 128 ? t2.push(e) : t2.push(e % 128 | 128, e >> 7);
    }, sigToWasmTypes = (e) => {
      for (var t2 = { i: "i32", j: "i64", f: "f32", d: "f64", e: "externref", p: "i32" }, r = { parameters: [], results: e[0] == "v" ? [] : [t2[e[0]]] }, a2 = 1; a2 < e.length; ++a2) r.parameters.push(t2[e[a2]]);
      return r;
    }, generateFuncType = (e, t2) => {
      var r = e.slice(0, 1), a2 = e.slice(1), o2 = { i: 127, p: 127, j: 126, f: 125, d: 124, e: 111 };
      t2.push(96), uleb128Encode(a2.length, t2);
      for (var _3 = 0; _3 < a2.length; ++_3) t2.push(o2[a2[_3]]);
      r == "v" ? t2.push(0) : t2.push(1, o2[r]);
    }, convertJsFunctionToWasm = (e, t2) => {
      if (typeof WebAssembly.Function == "function") return new WebAssembly.Function(sigToWasmTypes(t2), e);
      var r = [1];
      generateFuncType(t2, r);
      var a2 = [0, 97, 115, 109, 1, 0, 0, 0, 1];
      uleb128Encode(r.length, a2), a2.push(...r), a2.push(2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0);
      var o2 = new WebAssembly.Module(new Uint8Array(a2)), _3 = new WebAssembly.Instance(o2, { e: { f: e } }), s2 = _3.exports.f;
      return s2;
    }, wasmTableMirror = [], wasmTable = new WebAssembly.Table({ initial: 7367, element: "anyfunc" }), getWasmTableEntry = (e) => {
      var t2 = wasmTableMirror[e];
      return t2 || (e >= wasmTableMirror.length && (wasmTableMirror.length = e + 1), wasmTableMirror[e] = t2 = wasmTable.get(e)), t2;
    }, updateTableMap = (e, t2) => {
      if (functionsInTableMap) for (var r = e; r < e + t2; r++) {
        var a2 = getWasmTableEntry(r);
        a2 && functionsInTableMap.set(a2, r);
      }
    }, functionsInTableMap, getFunctionAddress = (e) => (functionsInTableMap || (functionsInTableMap = /* @__PURE__ */ new WeakMap(), updateTableMap(0, wasmTable.length)), functionsInTableMap.get(e) || 0), freeTableIndexes = [], getEmptyTableSlot = () => {
      if (freeTableIndexes.length) return freeTableIndexes.pop();
      try {
        wasmTable.grow(1);
      } catch (e) {
        throw e instanceof RangeError ? "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH." : e;
      }
      return wasmTable.length - 1;
    }, setWasmTableEntry = (e, t2) => {
      wasmTable.set(e, t2), wasmTableMirror[e] = wasmTable.get(e);
    }, addFunction = (e, t2) => {
      var r = getFunctionAddress(e);
      if (r) return r;
      var a2 = getEmptyTableSlot();
      try {
        setWasmTableEntry(a2, e);
      } catch (_3) {
        if (!(_3 instanceof TypeError)) throw _3;
        var o2 = convertJsFunctionToWasm(e, t2);
        setWasmTableEntry(a2, o2);
      }
      return functionsInTableMap.set(e, a2), a2;
    }, updateGOT = (e, t2) => {
      for (var r in e) if (!isInternalSym(r)) {
        var a2 = e[r];
        GOT[r] || (GOT[r] = new WebAssembly.Global({ value: "i32", mutable: true })), GOT[r].value == 0 && (typeof a2 == "function" ? GOT[r].value = addFunction(a2) : typeof a2 == "number" ? GOT[r].value = a2 : err(`unhandled export type for '${r}': ${typeof a2}`));
      }
    }, relocateExports = (e, t2, r) => {
      var a2 = {};
      for (var o2 in e) {
        var _3 = e[o2];
        typeof _3 == "object" && (_3 = _3.value), typeof _3 == "number" && (_3 += t2), a2[o2] = _3;
      }
      return updateGOT(a2), a2;
    }, isSymbolDefined = (e) => {
      var t2 = wasmImports[e];
      return !(!t2 || t2.stub);
    }, dynCall = (e, t2, r = []) => {
      var a2 = getWasmTableEntry(t2)(...r);
      return a2;
    }, stackSave = () => _emscripten_stack_get_current(), stackRestore = (e) => __emscripten_stack_restore(e), createInvokeFunction = (e) => (t2, ...r) => {
      var a2 = stackSave();
      try {
        return dynCall(e, t2, r);
      } catch (o2) {
        if (stackRestore(a2), o2 !== o2 + 0) throw o2;
        if (_setThrew(1, 0), e[0] == "j") return 0n;
      }
    }, resolveGlobalSymbol = (e, t2 = false) => {
      var r;
      return isSymbolDefined(e) ? r = wasmImports[e] : e.startsWith("invoke_") && (r = wasmImports[e] = createInvokeFunction(e.split("_")[1])), { sym: r, name: e };
    }, UTF8ToString = (e, t2) => e ? UTF8ArrayToString(HEAPU8, e, t2) : "", loadWebAssemblyModule = (binary, flags, libName, localScope, handle) => {
      var metadata = getDylinkMetadata(binary);
      currentModuleWeakSymbols = metadata.weakImports;
      function loadModule() {
        var firstLoad = !handle || !HEAP8[handle + 8];
        if (firstLoad) {
          var memAlign = Math.pow(2, metadata.memoryAlign), memoryBase = metadata.memorySize ? alignMemory(getMemory(metadata.memorySize + memAlign), memAlign) : 0, tableBase = metadata.tableSize ? wasmTable.length : 0;
          handle && (HEAP8[handle + 8] = 1, HEAPU32[handle + 12 >> 2] = memoryBase, HEAP32[handle + 16 >> 2] = metadata.memorySize, HEAPU32[handle + 20 >> 2] = tableBase, HEAP32[handle + 24 >> 2] = metadata.tableSize);
        } else memoryBase = HEAPU32[handle + 12 >> 2], tableBase = HEAPU32[handle + 20 >> 2];
        var tableGrowthNeeded = tableBase + metadata.tableSize - wasmTable.length;
        tableGrowthNeeded > 0 && wasmTable.grow(tableGrowthNeeded);
        var moduleExports;
        function resolveSymbol(e) {
          var t2 = resolveGlobalSymbol(e).sym;
          return !t2 && localScope && (t2 = localScope[e]), t2 || (t2 = moduleExports[e]), t2;
        }
        var proxyHandler = { get(e, t2) {
          switch (t2) {
            case "__memory_base":
              return memoryBase;
            case "__table_base":
              return tableBase;
          }
          if (t2 in wasmImports && !wasmImports[t2].stub) return wasmImports[t2];
          if (!(t2 in e)) {
            var r;
            e[t2] = (...a2) => (r || (r = resolveSymbol(t2)), r(...a2));
          }
          return e[t2];
        } }, proxy = new Proxy({}, proxyHandler), info = { "GOT.mem": new Proxy({}, GOTHandler), "GOT.func": new Proxy({}, GOTHandler), env: proxy, wasi_snapshot_preview1: proxy };
        function postInstantiation(module, instance) {
          updateTableMap(tableBase, metadata.tableSize), moduleExports = relocateExports(instance.exports, memoryBase), flags.allowUndefined || reportUndefinedSymbols();
          function addEmAsm(addr, body) {
            for (var args = [], arity = 0; arity < 16 && body.indexOf("$" + arity) != -1; arity++) args.push("$" + arity);
            args = args.join(",");
            var func = `(${args}) => { ${body} };`;
            eval(func);
          }
          if ("__start_em_asm" in moduleExports) for (var start = moduleExports.__start_em_asm, stop = moduleExports.__stop_em_asm; start < stop; ) {
            var jsString = UTF8ToString(start);
            addEmAsm(start, jsString), start = HEAPU8.indexOf(0, start) + 1;
          }
          function addEmJs(name, cSig, body) {
            var jsArgs = [];
            if (cSig = cSig.slice(1, -1), cSig != "void") {
              cSig = cSig.split(",");
              for (var i in cSig) {
                var jsArg = cSig[i].split(" ").pop();
                jsArgs.push(jsArg.replace("*", ""));
              }
            }
            var func = `(${jsArgs}) => ${body};`;
            moduleExports[name] = eval(func);
          }
          for (var name in moduleExports) if (name.startsWith("__em_js__")) {
            var start = moduleExports[name], jsString = UTF8ToString(start), parts = jsString.split("<::>");
            addEmJs(name.replace("__em_js__", ""), parts[0], parts[1]), delete moduleExports[name];
          }
          var applyRelocs = moduleExports.__wasm_apply_data_relocs;
          applyRelocs && (runtimeInitialized ? applyRelocs() : __RELOC_FUNCS__.push(applyRelocs));
          var init = moduleExports.__wasm_call_ctors;
          return init && (runtimeInitialized ? init() : __ATINIT__.push(init)), moduleExports;
        }
        if (flags.loadAsync) {
          if (binary instanceof WebAssembly.Module) {
            var instance = new WebAssembly.Instance(binary, info);
            return Promise.resolve(postInstantiation(binary, instance));
          }
          return WebAssembly.instantiate(binary, info).then((e) => postInstantiation(e.module, e.instance));
        }
        var module = binary instanceof WebAssembly.Module ? binary : new WebAssembly.Module(binary), instance = new WebAssembly.Instance(module, info);
        return postInstantiation(module, instance);
      }
      return flags.loadAsync ? metadata.neededDynlibs.reduce((e, t2) => e.then(() => loadDynamicLibrary(t2, flags, localScope)), Promise.resolve()).then(loadModule) : (metadata.neededDynlibs.forEach((e) => loadDynamicLibrary(e, flags, localScope)), loadModule());
    }, mergeLibSymbols = (e, t2) => {
      for (var [r, a2] of Object.entries(e)) {
        let o2 = (s2) => {
          isSymbolDefined(s2) || (wasmImports[s2] = a2);
        };
        o2(r);
        let _3 = "__main_argc_argv";
        r == "main" && o2(_3), r == _3 && o2("main");
      }
    }, asyncLoad = async (e) => {
      var t2 = await readAsync(e);
      return new Uint8Array(t2);
    }, preloadPlugins = Module.preloadPlugins || [], registerWasmPlugin = () => {
      var e = { promiseChainEnd: Promise.resolve(), canHandle: (t2) => !Module.noWasmDecoding && t2.endsWith(".so"), handle: (t2, r, a2, o2) => {
        e.promiseChainEnd = e.promiseChainEnd.then(() => loadWebAssemblyModule(t2, { loadAsync: true, nodelete: true }, r, {})).then((_3) => {
          preloadedWasm[r] = _3, a2(t2);
        }, (_3) => {
          err(`failed to instantiate wasm: ${r}: ${_3}`), o2();
        });
      } };
      preloadPlugins.push(e);
    }, preloadedWasm = {};
    function loadDynamicLibrary(e, t2 = { global: true, nodelete: true }, r, a2) {
      var o2 = LDSO.loadedLibsByName[e];
      if (o2) return t2.global ? o2.global || (o2.global = true, mergeLibSymbols(o2.exports)) : r && Object.assign(r, o2.exports), t2.nodelete && o2.refcount !== 1 / 0 && (o2.refcount = 1 / 0), o2.refcount++, a2 && (LDSO.loadedLibsByHandle[a2] = o2), t2.loadAsync ? Promise.resolve(true) : true;
      o2 = newDSO(e, a2, "loading"), o2.refcount = t2.nodelete ? 1 / 0 : 1, o2.global = t2.global;
      function _3() {
        if (a2) {
          var l2 = HEAPU32[a2 + 28 >> 2], d2 = HEAPU32[a2 + 32 >> 2];
          if (l2 && d2) {
            var p2 = HEAP8.slice(l2, l2 + d2);
            return t2.loadAsync ? Promise.resolve(p2) : p2;
          }
        }
        var m2 = locateFile(e);
        if (t2.loadAsync) return asyncLoad(m2);
        if (!readBinary) throw new Error(`${m2}: file not found, and synchronous loading of external files is not available`);
        return readBinary(m2);
      }
      function s2() {
        var l2 = preloadedWasm[e];
        return l2 ? t2.loadAsync ? Promise.resolve(l2) : l2 : t2.loadAsync ? _3().then((d2) => loadWebAssemblyModule(d2, t2, e, r, a2)) : loadWebAssemblyModule(_3(), t2, e, r, a2);
      }
      function n2(l2) {
        o2.global ? mergeLibSymbols(l2) : r && Object.assign(r, l2), o2.exports = l2;
      }
      return t2.loadAsync ? s2().then((l2) => (n2(l2), true)) : (n2(s2()), true);
    }
    var reportUndefinedSymbols = () => {
      for (var [e, t2] of Object.entries(GOT)) if (t2.value == 0) {
        var r = resolveGlobalSymbol(e, true).sym;
        if (!r && !t2.required) continue;
        if (typeof r == "function") t2.value = addFunction(r, r.sig);
        else if (typeof r == "number") t2.value = r;
        else throw new Error(`bad export type for '${e}': ${typeof r}`);
      }
    }, loadDylibs = () => {
      if (!dynamicLibraries.length) {
        reportUndefinedSymbols();
        return;
      }
      addRunDependency(), dynamicLibraries.reduce((e, t2) => e.then(() => loadDynamicLibrary(t2, { loadAsync: true, global: true, nodelete: true, allowUndefined: true })), Promise.resolve()).then(() => {
        reportUndefinedSymbols(), removeRunDependency();
      });
    }, noExitRuntime = Module.noExitRuntime || false;
    function setValue(e, t2, r = "i8") {
      switch (r.endsWith("*") && (r = "*"), r) {
        case "i1":
          HEAP8[e] = t2;
          break;
        case "i8":
          HEAP8[e] = t2;
          break;
        case "i16":
          HEAP16[e >> 1] = t2;
          break;
        case "i32":
          HEAP32[e >> 2] = t2;
          break;
        case "i64":
          HEAP64[e >> 3] = BigInt(t2);
          break;
        case "float":
          HEAPF32[e >> 2] = t2;
          break;
        case "double":
          HEAPF64[e >> 3] = t2;
          break;
        case "*":
          HEAPU32[e >> 2] = t2;
          break;
        default:
          abort(`invalid type for setValue: ${r}`);
      }
    }
    var ___assert_fail = (e, t2, r, a2) => abort(`Assertion failed: ${UTF8ToString(e)}, at: ` + [t2 ? UTF8ToString(t2) : "unknown filename", r, a2 ? UTF8ToString(a2) : "unknown function"]);
    ___assert_fail.sig = "vppip";
    var ___call_sighandler = (e, t2) => getWasmTableEntry(e)(t2);
    ___call_sighandler.sig = "vpi";
    var ___memory_base = new WebAssembly.Global({ value: "i32", mutable: false }, 1024);
    Module.___memory_base = ___memory_base;
    var ___stack_pointer = new WebAssembly.Global({ value: "i32", mutable: true }, 11373728);
    Module.___stack_pointer = ___stack_pointer;
    var PATH = { isAbs: (e) => e.charAt(0) === "/", splitPath: (e) => {
      var t2 = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
      return t2.exec(e).slice(1);
    }, normalizeArray: (e, t2) => {
      for (var r = 0, a2 = e.length - 1; a2 >= 0; a2--) {
        var o2 = e[a2];
        o2 === "." ? e.splice(a2, 1) : o2 === ".." ? (e.splice(a2, 1), r++) : r && (e.splice(a2, 1), r--);
      }
      if (t2) for (; r; r--) e.unshift("..");
      return e;
    }, normalize: (e) => {
      var t2 = PATH.isAbs(e), r = e.substr(-1) === "/";
      return e = PATH.normalizeArray(e.split("/").filter((a2) => !!a2), !t2).join("/"), !e && !t2 && (e = "."), e && r && (e += "/"), (t2 ? "/" : "") + e;
    }, dirname: (e) => {
      var t2 = PATH.splitPath(e), r = t2[0], a2 = t2[1];
      return !r && !a2 ? "." : (a2 && (a2 = a2.substr(0, a2.length - 1)), r + a2);
    }, basename: (e) => {
      if (e === "/") return "/";
      e = PATH.normalize(e), e = e.replace(/\/$/, "");
      var t2 = e.lastIndexOf("/");
      return t2 === -1 ? e : e.substr(t2 + 1);
    }, join: (...e) => PATH.normalize(e.join("/")), join2: (e, t2) => PATH.normalize(e + "/" + t2) }, initRandomFill = () => {
      if (typeof crypto == "object" && typeof crypto.getRandomValues == "function") return (a2) => crypto.getRandomValues(a2);
      if (ENVIRONMENT_IS_NODE) try {
        var e = require("crypto"), t2 = e.randomFillSync;
        if (t2) return (a2) => e.randomFillSync(a2);
        var r = e.randomBytes;
        return (a2) => (a2.set(r(a2.byteLength)), a2);
      } catch {
      }
      abort("initRandomDevice");
    }, randomFill = (e) => (randomFill = initRandomFill())(e), PATH_FS = { resolve: (...e) => {
      for (var t2 = "", r = false, a2 = e.length - 1; a2 >= -1 && !r; a2--) {
        var o2 = a2 >= 0 ? e[a2] : FS.cwd();
        if (typeof o2 != "string") throw new TypeError("Arguments to path.resolve must be strings");
        if (!o2) return "";
        t2 = o2 + "/" + t2, r = PATH.isAbs(o2);
      }
      return t2 = PATH.normalizeArray(t2.split("/").filter((_3) => !!_3), !r).join("/"), (r ? "/" : "") + t2 || ".";
    }, relative: (e, t2) => {
      e = PATH_FS.resolve(e).substr(1), t2 = PATH_FS.resolve(t2).substr(1);
      function r(d2) {
        for (var p2 = 0; p2 < d2.length && d2[p2] === ""; p2++) ;
        for (var m2 = d2.length - 1; m2 >= 0 && d2[m2] === ""; m2--) ;
        return p2 > m2 ? [] : d2.slice(p2, m2 - p2 + 1);
      }
      for (var a2 = r(e.split("/")), o2 = r(t2.split("/")), _3 = Math.min(a2.length, o2.length), s2 = _3, n2 = 0; n2 < _3; n2++) if (a2[n2] !== o2[n2]) {
        s2 = n2;
        break;
      }
      for (var l2 = [], n2 = s2; n2 < a2.length; n2++) l2.push("..");
      return l2 = l2.concat(o2.slice(s2)), l2.join("/");
    } }, FS_stdin_getChar_buffer = [], lengthBytesUTF8 = (e) => {
      for (var t2 = 0, r = 0; r < e.length; ++r) {
        var a2 = e.charCodeAt(r);
        a2 <= 127 ? t2++ : a2 <= 2047 ? t2 += 2 : a2 >= 55296 && a2 <= 57343 ? (t2 += 4, ++r) : t2 += 3;
      }
      return t2;
    }, stringToUTF8Array = (e, t2, r, a2) => {
      if (!(a2 > 0)) return 0;
      for (var o2 = r, _3 = r + a2 - 1, s2 = 0; s2 < e.length; ++s2) {
        var n2 = e.charCodeAt(s2);
        if (n2 >= 55296 && n2 <= 57343) {
          var l2 = e.charCodeAt(++s2);
          n2 = 65536 + ((n2 & 1023) << 10) | l2 & 1023;
        }
        if (n2 <= 127) {
          if (r >= _3) break;
          t2[r++] = n2;
        } else if (n2 <= 2047) {
          if (r + 1 >= _3) break;
          t2[r++] = 192 | n2 >> 6, t2[r++] = 128 | n2 & 63;
        } else if (n2 <= 65535) {
          if (r + 2 >= _3) break;
          t2[r++] = 224 | n2 >> 12, t2[r++] = 128 | n2 >> 6 & 63, t2[r++] = 128 | n2 & 63;
        } else {
          if (r + 3 >= _3) break;
          t2[r++] = 240 | n2 >> 18, t2[r++] = 128 | n2 >> 12 & 63, t2[r++] = 128 | n2 >> 6 & 63, t2[r++] = 128 | n2 & 63;
        }
      }
      return t2[r] = 0, r - o2;
    };
    function intArrayFromString(e, t2, r) {
      var a2 = lengthBytesUTF8(e) + 1, o2 = new Array(a2), _3 = stringToUTF8Array(e, o2, 0, o2.length);
      return o2.length = _3, o2;
    }
    var FS_stdin_getChar = () => {
      if (!FS_stdin_getChar_buffer.length) {
        var e = null;
        if (ENVIRONMENT_IS_NODE) {
          var t2 = 256, r = Buffer.alloc(t2), a2 = 0, o2 = process.stdin.fd;
          try {
            a2 = fs.readSync(o2, r, 0, t2);
          } catch (_3) {
            if (_3.toString().includes("EOF")) a2 = 0;
            else throw _3;
          }
          a2 > 0 && (e = r.slice(0, a2).toString("utf-8"));
        } else typeof window < "u" && typeof window.prompt == "function" && (e = window.prompt("Input: "), e !== null && (e += `
`));
        if (!e) return null;
        FS_stdin_getChar_buffer = intArrayFromString(e);
      }
      return FS_stdin_getChar_buffer.shift();
    }, TTY = { ttys: [], init() {
    }, shutdown() {
    }, register(e, t2) {
      TTY.ttys[e] = { input: [], output: [], ops: t2 }, FS.registerDevice(e, TTY.stream_ops);
    }, stream_ops: { open(e) {
      var t2 = TTY.ttys[e.node.rdev];
      if (!t2) throw new FS.ErrnoError(43);
      e.tty = t2, e.seekable = false;
    }, close(e) {
      e.tty.ops.fsync(e.tty);
    }, fsync(e) {
      e.tty.ops.fsync(e.tty);
    }, read(e, t2, r, a2, o2) {
      if (!e.tty || !e.tty.ops.get_char) throw new FS.ErrnoError(60);
      for (var _3 = 0, s2 = 0; s2 < a2; s2++) {
        var n2;
        try {
          n2 = e.tty.ops.get_char(e.tty);
        } catch {
          throw new FS.ErrnoError(29);
        }
        if (n2 === void 0 && _3 === 0) throw new FS.ErrnoError(6);
        if (n2 == null) break;
        _3++, t2[r + s2] = n2;
      }
      return _3 && (e.node.atime = Date.now()), _3;
    }, write(e, t2, r, a2, o2) {
      if (!e.tty || !e.tty.ops.put_char) throw new FS.ErrnoError(60);
      try {
        for (var _3 = 0; _3 < a2; _3++) e.tty.ops.put_char(e.tty, t2[r + _3]);
      } catch {
        throw new FS.ErrnoError(29);
      }
      return a2 && (e.node.mtime = e.node.ctime = Date.now()), _3;
    } }, default_tty_ops: { get_char(e) {
      return FS_stdin_getChar();
    }, put_char(e, t2) {
      t2 === null || t2 === 10 ? (out(UTF8ArrayToString(e.output)), e.output = []) : t2 != 0 && e.output.push(t2);
    }, fsync(e) {
      e.output && e.output.length > 0 && (out(UTF8ArrayToString(e.output)), e.output = []);
    }, ioctl_tcgets(e) {
      return { c_iflag: 25856, c_oflag: 5, c_cflag: 191, c_lflag: 35387, c_cc: [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] };
    }, ioctl_tcsets(e, t2, r) {
      return 0;
    }, ioctl_tiocgwinsz(e) {
      return [24, 80];
    } }, default_tty1_ops: { put_char(e, t2) {
      t2 === null || t2 === 10 ? (err(UTF8ArrayToString(e.output)), e.output = []) : t2 != 0 && e.output.push(t2);
    }, fsync(e) {
      e.output && e.output.length > 0 && (err(UTF8ArrayToString(e.output)), e.output = []);
    } } }, zeroMemory = (e, t2) => {
      HEAPU8.fill(0, e, e + t2);
    }, mmapAlloc = (e) => {
      e = alignMemory(e, 65536);
      var t2 = _emscripten_builtin_memalign(65536, e);
      return t2 && zeroMemory(t2, e), t2;
    }, MEMFS = { ops_table: null, mount(e) {
      return MEMFS.createNode(null, "/", 16895, 0);
    }, createNode(e, t2, r, a2) {
      if (FS.isBlkdev(r) || FS.isFIFO(r)) throw new FS.ErrnoError(63);
      MEMFS.ops_table || (MEMFS.ops_table = { dir: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr, lookup: MEMFS.node_ops.lookup, mknod: MEMFS.node_ops.mknod, rename: MEMFS.node_ops.rename, unlink: MEMFS.node_ops.unlink, rmdir: MEMFS.node_ops.rmdir, readdir: MEMFS.node_ops.readdir, symlink: MEMFS.node_ops.symlink }, stream: { llseek: MEMFS.stream_ops.llseek } }, file: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr }, stream: { llseek: MEMFS.stream_ops.llseek, read: MEMFS.stream_ops.read, write: MEMFS.stream_ops.write, allocate: MEMFS.stream_ops.allocate, mmap: MEMFS.stream_ops.mmap, msync: MEMFS.stream_ops.msync } }, link: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr, readlink: MEMFS.node_ops.readlink }, stream: {} }, chrdev: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr }, stream: FS.chrdev_stream_ops } });
      var o2 = FS.createNode(e, t2, r, a2);
      return FS.isDir(o2.mode) ? (o2.node_ops = MEMFS.ops_table.dir.node, o2.stream_ops = MEMFS.ops_table.dir.stream, o2.contents = {}) : FS.isFile(o2.mode) ? (o2.node_ops = MEMFS.ops_table.file.node, o2.stream_ops = MEMFS.ops_table.file.stream, o2.usedBytes = 0, o2.contents = null) : FS.isLink(o2.mode) ? (o2.node_ops = MEMFS.ops_table.link.node, o2.stream_ops = MEMFS.ops_table.link.stream) : FS.isChrdev(o2.mode) && (o2.node_ops = MEMFS.ops_table.chrdev.node, o2.stream_ops = MEMFS.ops_table.chrdev.stream), o2.atime = o2.mtime = o2.ctime = Date.now(), e && (e.contents[t2] = o2, e.atime = e.mtime = e.ctime = o2.atime), o2;
    }, getFileDataAsTypedArray(e) {
      return e.contents ? e.contents.subarray ? e.contents.subarray(0, e.usedBytes) : new Uint8Array(e.contents) : new Uint8Array(0);
    }, expandFileStorage(e, t2) {
      var r = e.contents ? e.contents.length : 0;
      if (!(r >= t2)) {
        var a2 = 1024 * 1024;
        t2 = Math.max(t2, r * (r < a2 ? 2 : 1.125) >>> 0), r != 0 && (t2 = Math.max(t2, 256));
        var o2 = e.contents;
        e.contents = new Uint8Array(t2), e.usedBytes > 0 && e.contents.set(o2.subarray(0, e.usedBytes), 0);
      }
    }, resizeFileStorage(e, t2) {
      if (e.usedBytes != t2) if (t2 == 0) e.contents = null, e.usedBytes = 0;
      else {
        var r = e.contents;
        e.contents = new Uint8Array(t2), r && e.contents.set(r.subarray(0, Math.min(t2, e.usedBytes))), e.usedBytes = t2;
      }
    }, node_ops: { getattr(e) {
      var t2 = {};
      return t2.dev = FS.isChrdev(e.mode) ? e.id : 1, t2.ino = e.id, t2.mode = e.mode, t2.nlink = 1, t2.uid = 0, t2.gid = 0, t2.rdev = e.rdev, FS.isDir(e.mode) ? t2.size = 4096 : FS.isFile(e.mode) ? t2.size = e.usedBytes : FS.isLink(e.mode) ? t2.size = e.link.length : t2.size = 0, t2.atime = new Date(e.atime), t2.mtime = new Date(e.mtime), t2.ctime = new Date(e.ctime), t2.blksize = 4096, t2.blocks = Math.ceil(t2.size / t2.blksize), t2;
    }, setattr(e, t2) {
      for (let r of ["mode", "atime", "mtime", "ctime"]) t2[r] && (e[r] = t2[r]);
      t2.size !== void 0 && MEMFS.resizeFileStorage(e, t2.size);
    }, lookup(e, t2) {
      throw MEMFS.doesNotExistError;
    }, mknod(e, t2, r, a2) {
      return MEMFS.createNode(e, t2, r, a2);
    }, rename(e, t2, r) {
      var a2;
      try {
        a2 = FS.lookupNode(t2, r);
      } catch {
      }
      if (a2) {
        if (FS.isDir(e.mode)) for (var o2 in a2.contents) throw new FS.ErrnoError(55);
        FS.hashRemoveNode(a2);
      }
      delete e.parent.contents[e.name], t2.contents[r] = e, e.name = r, t2.ctime = t2.mtime = e.parent.ctime = e.parent.mtime = Date.now();
    }, unlink(e, t2) {
      delete e.contents[t2], e.ctime = e.mtime = Date.now();
    }, rmdir(e, t2) {
      var r = FS.lookupNode(e, t2);
      for (var a2 in r.contents) throw new FS.ErrnoError(55);
      delete e.contents[t2], e.ctime = e.mtime = Date.now();
    }, readdir(e) {
      return [".", "..", ...Object.keys(e.contents)];
    }, symlink(e, t2, r) {
      var a2 = MEMFS.createNode(e, t2, 41471, 0);
      return a2.link = r, a2;
    }, readlink(e) {
      if (!FS.isLink(e.mode)) throw new FS.ErrnoError(28);
      return e.link;
    } }, stream_ops: { read(e, t2, r, a2, o2) {
      var _3 = e.node.contents;
      if (o2 >= e.node.usedBytes) return 0;
      var s2 = Math.min(e.node.usedBytes - o2, a2);
      if (s2 > 8 && _3.subarray) t2.set(_3.subarray(o2, o2 + s2), r);
      else for (var n2 = 0; n2 < s2; n2++) t2[r + n2] = _3[o2 + n2];
      return s2;
    }, write(e, t2, r, a2, o2, _3) {
      if (t2.buffer === HEAP8.buffer && (_3 = false), !a2) return 0;
      var s2 = e.node;
      if (s2.mtime = s2.ctime = Date.now(), t2.subarray && (!s2.contents || s2.contents.subarray)) {
        if (_3) return s2.contents = t2.subarray(r, r + a2), s2.usedBytes = a2, a2;
        if (s2.usedBytes === 0 && o2 === 0) return s2.contents = t2.slice(r, r + a2), s2.usedBytes = a2, a2;
        if (o2 + a2 <= s2.usedBytes) return s2.contents.set(t2.subarray(r, r + a2), o2), a2;
      }
      if (MEMFS.expandFileStorage(s2, o2 + a2), s2.contents.subarray && t2.subarray) s2.contents.set(t2.subarray(r, r + a2), o2);
      else for (var n2 = 0; n2 < a2; n2++) s2.contents[o2 + n2] = t2[r + n2];
      return s2.usedBytes = Math.max(s2.usedBytes, o2 + a2), a2;
    }, llseek(e, t2, r) {
      var a2 = t2;
      if (r === 1 ? a2 += e.position : r === 2 && FS.isFile(e.node.mode) && (a2 += e.node.usedBytes), a2 < 0) throw new FS.ErrnoError(28);
      return a2;
    }, allocate(e, t2, r) {
      MEMFS.expandFileStorage(e.node, t2 + r), e.node.usedBytes = Math.max(e.node.usedBytes, t2 + r);
    }, mmap(e, t2, r, a2, o2) {
      if (!FS.isFile(e.node.mode)) throw new FS.ErrnoError(43);
      var _3, s2, n2 = e.node.contents;
      if (!(o2 & 2) && n2 && n2.buffer === HEAP8.buffer) s2 = false, _3 = n2.byteOffset;
      else {
        if (s2 = true, _3 = mmapAlloc(t2), !_3) throw new FS.ErrnoError(48);
        n2 && ((r > 0 || r + t2 < n2.length) && (n2.subarray ? n2 = n2.subarray(r, r + t2) : n2 = Array.prototype.slice.call(n2, r, r + t2)), HEAP8.set(n2, _3));
      }
      return { ptr: _3, allocated: s2 };
    }, msync(e, t2, r, a2, o2) {
      return MEMFS.stream_ops.write(e, t2, 0, a2, r, false), 0;
    } } }, FS_createDataFile = (e, t2, r, a2, o2, _3) => {
      FS.createDataFile(e, t2, r, a2, o2, _3);
    }, FS_handledByPreloadPlugin = (e, t2, r, a2) => {
      typeof Browser < "u" && Browser.init();
      var o2 = false;
      return preloadPlugins.forEach((_3) => {
        o2 || _3.canHandle(t2) && (_3.handle(e, t2, r, a2), o2 = true);
      }), o2;
    }, FS_createPreloadedFile = (e, t2, r, a2, o2, _3, s2, n2, l2, d2) => {
      var p2 = t2 ? PATH_FS.resolve(PATH.join2(e, t2)) : e;
      function g2(u2) {
        function f2(c2) {
          d2?.(), n2 || FS_createDataFile(e, t2, c2, a2, o2, l2), _3?.(), removeRunDependency();
        }
        FS_handledByPreloadPlugin(u2, p2, f2, () => {
          s2?.(), removeRunDependency();
        }) || f2(u2);
      }
      addRunDependency(), typeof r == "string" ? asyncLoad(r).then(g2, s2) : g2(r);
    }, FS_modeStringToFlags = (e) => {
      var t2 = { r: 0, "r+": 2, w: 577, "w+": 578, a: 1089, "a+": 1090 }, r = t2[e];
      if (typeof r > "u") throw new Error(`Unknown file open mode: ${e}`);
      return r;
    }, FS_getMode = (e, t2) => {
      var r = 0;
      return e && (r |= 365), t2 && (r |= 146), r;
    }, IDBFS = { dbs: {}, indexedDB: () => {
      if (typeof indexedDB < "u") return indexedDB;
      var e = null;
      return typeof window == "object" && (e = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB), e;
    }, DB_VERSION: 21, DB_STORE_NAME: "FILE_DATA", queuePersist: (e) => {
      function t2() {
        e.idbPersistState === "again" ? r() : e.idbPersistState = 0;
      }
      function r() {
        e.idbPersistState = "idb", IDBFS.syncfs(e, false, t2);
      }
      e.idbPersistState ? e.idbPersistState === "idb" && (e.idbPersistState = "again") : e.idbPersistState = setTimeout(r, 0);
    }, mount: (e) => {
      var t2 = MEMFS.mount(e);
      if (e?.opts?.autoPersist) {
        t2.idbPersistState = 0;
        var r = t2.node_ops;
        t2.node_ops = Object.assign({}, t2.node_ops), t2.node_ops.mknod = (a2, o2, _3, s2) => {
          var n2 = r.mknod(a2, o2, _3, s2);
          return n2.node_ops = t2.node_ops, n2.idbfs_mount = t2.mount, n2.memfs_stream_ops = n2.stream_ops, n2.stream_ops = Object.assign({}, n2.stream_ops), n2.stream_ops.write = (l2, d2, p2, m2, g2, u2) => (l2.node.isModified = true, n2.memfs_stream_ops.write(l2, d2, p2, m2, g2, u2)), n2.stream_ops.close = (l2) => {
            var d2 = l2.node;
            if (d2.isModified && (IDBFS.queuePersist(d2.idbfs_mount), d2.isModified = false), d2.memfs_stream_ops.close) return d2.memfs_stream_ops.close(l2);
          }, n2;
        }, t2.node_ops.mkdir = (...a2) => (IDBFS.queuePersist(t2.mount), r.mkdir(...a2)), t2.node_ops.rmdir = (...a2) => (IDBFS.queuePersist(t2.mount), r.rmdir(...a2)), t2.node_ops.symlink = (...a2) => (IDBFS.queuePersist(t2.mount), r.symlink(...a2)), t2.node_ops.unlink = (...a2) => (IDBFS.queuePersist(t2.mount), r.unlink(...a2)), t2.node_ops.rename = (...a2) => (IDBFS.queuePersist(t2.mount), r.rename(...a2));
      }
      return t2;
    }, syncfs: (e, t2, r) => {
      IDBFS.getLocalSet(e, (a2, o2) => {
        if (a2) return r(a2);
        IDBFS.getRemoteSet(e, (_3, s2) => {
          if (_3) return r(_3);
          var n2 = t2 ? s2 : o2, l2 = t2 ? o2 : s2;
          IDBFS.reconcile(n2, l2, r);
        });
      });
    }, quit: () => {
      Object.values(IDBFS.dbs).forEach((e) => e.close()), IDBFS.dbs = {};
    }, getDB: (e, t2) => {
      var r = IDBFS.dbs[e];
      if (r) return t2(null, r);
      var a2;
      try {
        a2 = IDBFS.indexedDB().open(e, IDBFS.DB_VERSION);
      } catch (o2) {
        return t2(o2);
      }
      if (!a2) return t2("Unable to connect to IndexedDB");
      a2.onupgradeneeded = (o2) => {
        var _3 = o2.target.result, s2 = o2.target.transaction, n2;
        _3.objectStoreNames.contains(IDBFS.DB_STORE_NAME) ? n2 = s2.objectStore(IDBFS.DB_STORE_NAME) : n2 = _3.createObjectStore(IDBFS.DB_STORE_NAME), n2.indexNames.contains("timestamp") || n2.createIndex("timestamp", "timestamp", { unique: false });
      }, a2.onsuccess = () => {
        r = a2.result, IDBFS.dbs[e] = r, t2(null, r);
      }, a2.onerror = (o2) => {
        t2(o2.target.error), o2.preventDefault();
      };
    }, getLocalSet: (e, t2) => {
      var r = {};
      function a2(l2) {
        return l2 !== "." && l2 !== "..";
      }
      function o2(l2) {
        return (d2) => PATH.join2(l2, d2);
      }
      for (var _3 = FS.readdir(e.mountpoint).filter(a2).map(o2(e.mountpoint)); _3.length; ) {
        var s2 = _3.pop(), n2;
        try {
          n2 = FS.stat(s2);
        } catch (l2) {
          return t2(l2);
        }
        FS.isDir(n2.mode) && _3.push(...FS.readdir(s2).filter(a2).map(o2(s2))), r[s2] = { timestamp: n2.mtime };
      }
      return t2(null, { type: "local", entries: r });
    }, getRemoteSet: (e, t2) => {
      var r = {};
      IDBFS.getDB(e.mountpoint, (a2, o2) => {
        if (a2) return t2(a2);
        try {
          var _3 = o2.transaction([IDBFS.DB_STORE_NAME], "readonly");
          _3.onerror = (l2) => {
            t2(l2.target.error), l2.preventDefault();
          };
          var s2 = _3.objectStore(IDBFS.DB_STORE_NAME), n2 = s2.index("timestamp");
          n2.openKeyCursor().onsuccess = (l2) => {
            var d2 = l2.target.result;
            if (!d2) return t2(null, { type: "remote", db: o2, entries: r });
            r[d2.primaryKey] = { timestamp: d2.key }, d2.continue();
          };
        } catch (l2) {
          return t2(l2);
        }
      });
    }, loadLocalEntry: (e, t2) => {
      var r, a2;
      try {
        var o2 = FS.lookupPath(e);
        a2 = o2.node, r = FS.stat(e);
      } catch (_3) {
        return t2(_3);
      }
      return FS.isDir(r.mode) ? t2(null, { timestamp: r.mtime, mode: r.mode }) : FS.isFile(r.mode) ? (a2.contents = MEMFS.getFileDataAsTypedArray(a2), t2(null, { timestamp: r.mtime, mode: r.mode, contents: a2.contents })) : t2(new Error("node type not supported"));
    }, storeLocalEntry: (e, t2, r) => {
      try {
        if (FS.isDir(t2.mode)) FS.mkdirTree(e, t2.mode);
        else if (FS.isFile(t2.mode)) FS.writeFile(e, t2.contents, { canOwn: true });
        else return r(new Error("node type not supported"));
        FS.chmod(e, t2.mode), FS.utime(e, t2.timestamp, t2.timestamp);
      } catch (a2) {
        return r(a2);
      }
      r(null);
    }, removeLocalEntry: (e, t2) => {
      try {
        var r = FS.stat(e);
        FS.isDir(r.mode) ? FS.rmdir(e) : FS.isFile(r.mode) && FS.unlink(e);
      } catch (a2) {
        return t2(a2);
      }
      t2(null);
    }, loadRemoteEntry: (e, t2, r) => {
      var a2 = e.get(t2);
      a2.onsuccess = (o2) => r(null, o2.target.result), a2.onerror = (o2) => {
        r(o2.target.error), o2.preventDefault();
      };
    }, storeRemoteEntry: (e, t2, r, a2) => {
      try {
        var o2 = e.put(r, t2);
      } catch (_3) {
        a2(_3);
        return;
      }
      o2.onsuccess = (_3) => a2(), o2.onerror = (_3) => {
        a2(_3.target.error), _3.preventDefault();
      };
    }, removeRemoteEntry: (e, t2, r) => {
      var a2 = e.delete(t2);
      a2.onsuccess = (o2) => r(), a2.onerror = (o2) => {
        r(o2.target.error), o2.preventDefault();
      };
    }, reconcile: (e, t2, r) => {
      var a2 = 0, o2 = [];
      Object.keys(e.entries).forEach((m2) => {
        var g2 = e.entries[m2], u2 = t2.entries[m2];
        (!u2 || g2.timestamp.getTime() != u2.timestamp.getTime()) && (o2.push(m2), a2++);
      });
      var _3 = [];
      if (Object.keys(t2.entries).forEach((m2) => {
        e.entries[m2] || (_3.push(m2), a2++);
      }), !a2) return r(null);
      var s2 = false, n2 = e.type === "remote" ? e.db : t2.db, l2 = n2.transaction([IDBFS.DB_STORE_NAME], "readwrite"), d2 = l2.objectStore(IDBFS.DB_STORE_NAME);
      function p2(m2) {
        if (m2 && !s2) return s2 = true, r(m2);
      }
      l2.onerror = l2.onabort = (m2) => {
        p2(m2.target.error), m2.preventDefault();
      }, l2.oncomplete = (m2) => {
        s2 || r(null);
      }, o2.sort().forEach((m2) => {
        t2.type === "local" ? IDBFS.loadRemoteEntry(d2, m2, (g2, u2) => {
          if (g2) return p2(g2);
          IDBFS.storeLocalEntry(m2, u2, p2);
        }) : IDBFS.loadLocalEntry(m2, (g2, u2) => {
          if (g2) return p2(g2);
          IDBFS.storeRemoteEntry(d2, m2, u2, p2);
        });
      }), _3.sort().reverse().forEach((m2) => {
        t2.type === "local" ? IDBFS.removeLocalEntry(m2, p2) : IDBFS.removeRemoteEntry(d2, m2, p2);
      });
    } }, ERRNO_CODES = { EPERM: 63, ENOENT: 44, ESRCH: 71, EINTR: 27, EIO: 29, ENXIO: 60, E2BIG: 1, ENOEXEC: 45, EBADF: 8, ECHILD: 12, EAGAIN: 6, EWOULDBLOCK: 6, ENOMEM: 48, EACCES: 2, EFAULT: 21, ENOTBLK: 105, EBUSY: 10, EEXIST: 20, EXDEV: 75, ENODEV: 43, ENOTDIR: 54, EISDIR: 31, EINVAL: 28, ENFILE: 41, EMFILE: 33, ENOTTY: 59, ETXTBSY: 74, EFBIG: 22, ENOSPC: 51, ESPIPE: 70, EROFS: 69, EMLINK: 34, EPIPE: 64, EDOM: 18, ERANGE: 68, ENOMSG: 49, EIDRM: 24, ECHRNG: 106, EL2NSYNC: 156, EL3HLT: 107, EL3RST: 108, ELNRNG: 109, EUNATCH: 110, ENOCSI: 111, EL2HLT: 112, EDEADLK: 16, ENOLCK: 46, EBADE: 113, EBADR: 114, EXFULL: 115, ENOANO: 104, EBADRQC: 103, EBADSLT: 102, EDEADLOCK: 16, EBFONT: 101, ENOSTR: 100, ENODATA: 116, ETIME: 117, ENOSR: 118, ENONET: 119, ENOPKG: 120, EREMOTE: 121, ENOLINK: 47, EADV: 122, ESRMNT: 123, ECOMM: 124, EPROTO: 65, EMULTIHOP: 36, EDOTDOT: 125, EBADMSG: 9, ENOTUNIQ: 126, EBADFD: 127, EREMCHG: 128, ELIBACC: 129, ELIBBAD: 130, ELIBSCN: 131, ELIBMAX: 132, ELIBEXEC: 133, ENOSYS: 52, ENOTEMPTY: 55, ENAMETOOLONG: 37, ELOOP: 32, EOPNOTSUPP: 138, EPFNOSUPPORT: 139, ECONNRESET: 15, ENOBUFS: 42, EAFNOSUPPORT: 5, EPROTOTYPE: 67, ENOTSOCK: 57, ENOPROTOOPT: 50, ESHUTDOWN: 140, ECONNREFUSED: 14, EADDRINUSE: 3, ECONNABORTED: 13, ENETUNREACH: 40, ENETDOWN: 38, ETIMEDOUT: 73, EHOSTDOWN: 142, EHOSTUNREACH: 23, EINPROGRESS: 26, EALREADY: 7, EDESTADDRREQ: 17, EMSGSIZE: 35, EPROTONOSUPPORT: 66, ESOCKTNOSUPPORT: 137, EADDRNOTAVAIL: 4, ENETRESET: 39, EISCONN: 30, ENOTCONN: 53, ETOOMANYREFS: 141, EUSERS: 136, EDQUOT: 19, ESTALE: 72, ENOTSUP: 138, ENOMEDIUM: 148, EILSEQ: 25, EOVERFLOW: 61, ECANCELED: 11, ENOTRECOVERABLE: 56, EOWNERDEAD: 62, ESTRPIPE: 135 }, NODEFS = { isWindows: false, staticInit() {
      NODEFS.isWindows = !!process.platform.match(/^win/);
      var e = process.binding("constants");
      e.fs && (e = e.fs), NODEFS.flagsForNodeMap = { 1024: e.O_APPEND, 64: e.O_CREAT, 128: e.O_EXCL, 256: e.O_NOCTTY, 0: e.O_RDONLY, 2: e.O_RDWR, 4096: e.O_SYNC, 512: e.O_TRUNC, 1: e.O_WRONLY, 131072: e.O_NOFOLLOW };
    }, convertNodeCode(e) {
      var t2 = e.code;
      return ERRNO_CODES[t2];
    }, tryFSOperation(e) {
      try {
        return e();
      } catch (t2) {
        throw t2.code ? t2.code === "UNKNOWN" ? new FS.ErrnoError(28) : new FS.ErrnoError(NODEFS.convertNodeCode(t2)) : t2;
      }
    }, mount(e) {
      return NODEFS.createNode(null, "/", NODEFS.getMode(e.opts.root), 0);
    }, createNode(e, t2, r, a2) {
      if (!FS.isDir(r) && !FS.isFile(r) && !FS.isLink(r)) throw new FS.ErrnoError(28);
      var o2 = FS.createNode(e, t2, r);
      return o2.node_ops = NODEFS.node_ops, o2.stream_ops = NODEFS.stream_ops, o2;
    }, getMode(e) {
      return NODEFS.tryFSOperation(() => {
        var t2 = fs.lstatSync(e).mode;
        return NODEFS.isWindows && (t2 |= (t2 & 292) >> 2), t2;
      });
    }, realPath(e) {
      for (var t2 = []; e.parent !== e; ) t2.push(e.name), e = e.parent;
      return t2.push(e.mount.opts.root), t2.reverse(), PATH.join(...t2);
    }, flagsForNode(e) {
      e &= -2097153, e &= -2049, e &= -32769, e &= -524289, e &= -65537;
      var t2 = 0;
      for (var r in NODEFS.flagsForNodeMap) e & r && (t2 |= NODEFS.flagsForNodeMap[r], e ^= r);
      if (e) throw new FS.ErrnoError(28);
      return t2;
    }, node_ops: { getattr(e) {
      var t2 = NODEFS.realPath(e), r;
      return NODEFS.tryFSOperation(() => r = fs.lstatSync(t2)), NODEFS.isWindows && (r.blksize || (r.blksize = 4096), r.blocks || (r.blocks = (r.size + r.blksize - 1) / r.blksize | 0), r.mode |= (r.mode & 292) >> 2), { dev: r.dev, ino: r.ino, mode: r.mode, nlink: r.nlink, uid: r.uid, gid: r.gid, rdev: r.rdev, size: r.size, atime: r.atime, mtime: r.mtime, ctime: r.ctime, blksize: r.blksize, blocks: r.blocks };
    }, setattr(e, t2) {
      var r = NODEFS.realPath(e);
      NODEFS.tryFSOperation(() => {
        if (t2.mode !== void 0) {
          var a2 = t2.mode;
          NODEFS.isWindows && (a2 &= 384), fs.chmodSync(r, a2), e.mode = t2.mode;
        }
        if (t2.atime || t2.mtime) {
          var o2 = t2.atime && new Date(t2.atime), _3 = t2.mtime && new Date(t2.mtime);
          fs.utimesSync(r, o2, _3);
        }
        t2.size !== void 0 && fs.truncateSync(r, t2.size);
      });
    }, lookup(e, t2) {
      var r = PATH.join2(NODEFS.realPath(e), t2), a2 = NODEFS.getMode(r);
      return NODEFS.createNode(e, t2, a2);
    }, mknod(e, t2, r, a2) {
      var o2 = NODEFS.createNode(e, t2, r, a2), _3 = NODEFS.realPath(o2);
      return NODEFS.tryFSOperation(() => {
        FS.isDir(o2.mode) ? fs.mkdirSync(_3, o2.mode) : fs.writeFileSync(_3, "", { mode: o2.mode });
      }), o2;
    }, rename(e, t2, r) {
      var a2 = NODEFS.realPath(e), o2 = PATH.join2(NODEFS.realPath(t2), r);
      try {
        FS.unlink(o2);
      } catch {
      }
      NODEFS.tryFSOperation(() => fs.renameSync(a2, o2)), e.name = r;
    }, unlink(e, t2) {
      var r = PATH.join2(NODEFS.realPath(e), t2);
      NODEFS.tryFSOperation(() => fs.unlinkSync(r));
    }, rmdir(e, t2) {
      var r = PATH.join2(NODEFS.realPath(e), t2);
      NODEFS.tryFSOperation(() => fs.rmdirSync(r));
    }, readdir(e) {
      var t2 = NODEFS.realPath(e);
      return NODEFS.tryFSOperation(() => fs.readdirSync(t2));
    }, symlink(e, t2, r) {
      var a2 = PATH.join2(NODEFS.realPath(e), t2);
      NODEFS.tryFSOperation(() => fs.symlinkSync(r, a2));
    }, readlink(e) {
      var t2 = NODEFS.realPath(e);
      return NODEFS.tryFSOperation(() => fs.readlinkSync(t2));
    }, statfs(e) {
      var t2 = NODEFS.tryFSOperation(() => fs.statfsSync(e));
      return t2.frsize = t2.bsize, t2;
    } }, stream_ops: { open(e) {
      var t2 = NODEFS.realPath(e.node);
      NODEFS.tryFSOperation(() => {
        FS.isFile(e.node.mode) && (e.shared.refcount = 1, e.nfd = fs.openSync(t2, NODEFS.flagsForNode(e.flags)));
      });
    }, close(e) {
      NODEFS.tryFSOperation(() => {
        FS.isFile(e.node.mode) && e.nfd && --e.shared.refcount === 0 && fs.closeSync(e.nfd);
      });
    }, dup(e) {
      e.shared.refcount++;
    }, read(e, t2, r, a2, o2) {
      return a2 === 0 ? 0 : NODEFS.tryFSOperation(() => fs.readSync(e.nfd, new Int8Array(t2.buffer, r, a2), 0, a2, o2));
    }, write(e, t2, r, a2, o2) {
      return NODEFS.tryFSOperation(() => fs.writeSync(e.nfd, new Int8Array(t2.buffer, r, a2), 0, a2, o2));
    }, llseek(e, t2, r) {
      var a2 = t2;
      if (r === 1 ? a2 += e.position : r === 2 && FS.isFile(e.node.mode) && NODEFS.tryFSOperation(() => {
        var o2 = fs.fstatSync(e.nfd);
        a2 += o2.size;
      }), a2 < 0) throw new FS.ErrnoError(28);
      return a2;
    }, mmap(e, t2, r, a2, o2) {
      if (!FS.isFile(e.node.mode)) throw new FS.ErrnoError(43);
      var _3 = mmapAlloc(t2);
      return NODEFS.stream_ops.read(e, HEAP8, _3, t2, r), { ptr: _3, allocated: true };
    }, msync(e, t2, r, a2, o2) {
      return NODEFS.stream_ops.write(e, t2, 0, a2, r, false), 0;
    } } }, PROXYFS = { mount(e) {
      return PROXYFS.createNode(null, "/", e.opts.fs.lstat(e.opts.root).mode, 0);
    }, createNode(e, t2, r, a2) {
      if (!FS.isDir(r) && !FS.isFile(r) && !FS.isLink(r)) throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
      var o2 = FS.createNode(e, t2, r);
      return o2.node_ops = PROXYFS.node_ops, o2.stream_ops = PROXYFS.stream_ops, o2;
    }, realPath(e) {
      for (var t2 = []; e.parent !== e; ) t2.push(e.name), e = e.parent;
      return t2.push(e.mount.opts.root), t2.reverse(), PATH.join(...t2);
    }, node_ops: { getattr(e) {
      var t2 = PROXYFS.realPath(e), r;
      try {
        r = e.mount.opts.fs.lstat(t2);
      } catch (a2) {
        throw a2.code ? new FS.ErrnoError(ERRNO_CODES[a2.code]) : a2;
      }
      return { dev: r.dev, ino: r.ino, mode: r.mode, nlink: r.nlink, uid: r.uid, gid: r.gid, rdev: r.rdev, size: r.size, atime: r.atime, mtime: r.mtime, ctime: r.ctime, blksize: r.blksize, blocks: r.blocks };
    }, setattr(e, t2) {
      var r = PROXYFS.realPath(e);
      try {
        if (t2.mode !== void 0 && (e.mount.opts.fs.chmod(r, t2.mode), e.mode = t2.mode), t2.atime || t2.mtime) {
          var a2 = new Date(t2.atime || t2.mtime), o2 = new Date(t2.mtime || t2.atime);
          e.mount.opts.fs.utime(r, a2, o2);
        }
        t2.size !== void 0 && e.mount.opts.fs.truncate(r, t2.size);
      } catch (_3) {
        throw _3.code ? new FS.ErrnoError(ERRNO_CODES[_3.code]) : _3;
      }
    }, lookup(e, t2) {
      try {
        var r = PATH.join2(PROXYFS.realPath(e), t2), a2 = e.mount.opts.fs.lstat(r).mode, o2 = PROXYFS.createNode(e, t2, a2);
        return o2;
      } catch (_3) {
        throw _3.code ? new FS.ErrnoError(ERRNO_CODES[_3.code]) : _3;
      }
    }, mknod(e, t2, r, a2) {
      var o2 = PROXYFS.createNode(e, t2, r, a2), _3 = PROXYFS.realPath(o2);
      try {
        FS.isDir(o2.mode) ? o2.mount.opts.fs.mkdir(_3, o2.mode) : o2.mount.opts.fs.writeFile(_3, "", { mode: o2.mode });
      } catch (s2) {
        throw s2.code ? new FS.ErrnoError(ERRNO_CODES[s2.code]) : s2;
      }
      return o2;
    }, rename(e, t2, r) {
      var a2 = PROXYFS.realPath(e), o2 = PATH.join2(PROXYFS.realPath(t2), r);
      try {
        e.mount.opts.fs.rename(a2, o2), e.name = r;
      } catch (_3) {
        throw _3.code ? new FS.ErrnoError(ERRNO_CODES[_3.code]) : _3;
      }
    }, unlink(e, t2) {
      var r = PATH.join2(PROXYFS.realPath(e), t2);
      try {
        e.mount.opts.fs.unlink(r);
      } catch (a2) {
        throw a2.code ? new FS.ErrnoError(ERRNO_CODES[a2.code]) : a2;
      }
    }, rmdir(e, t2) {
      var r = PATH.join2(PROXYFS.realPath(e), t2);
      try {
        e.mount.opts.fs.rmdir(r);
      } catch (a2) {
        throw a2.code ? new FS.ErrnoError(ERRNO_CODES[a2.code]) : a2;
      }
    }, readdir(e) {
      var t2 = PROXYFS.realPath(e);
      try {
        return e.mount.opts.fs.readdir(t2);
      } catch (r) {
        throw r.code ? new FS.ErrnoError(ERRNO_CODES[r.code]) : r;
      }
    }, symlink(e, t2, r) {
      var a2 = PATH.join2(PROXYFS.realPath(e), t2);
      try {
        e.mount.opts.fs.symlink(r, a2);
      } catch (o2) {
        throw o2.code ? new FS.ErrnoError(ERRNO_CODES[o2.code]) : o2;
      }
    }, readlink(e) {
      var t2 = PROXYFS.realPath(e);
      try {
        return e.mount.opts.fs.readlink(t2);
      } catch (r) {
        throw r.code ? new FS.ErrnoError(ERRNO_CODES[r.code]) : r;
      }
    } }, stream_ops: { open(e) {
      var t2 = PROXYFS.realPath(e.node);
      try {
        e.nfd = e.node.mount.opts.fs.open(t2, e.flags);
      } catch (r) {
        throw r.code ? new FS.ErrnoError(ERRNO_CODES[r.code]) : r;
      }
    }, close(e) {
      try {
        e.node.mount.opts.fs.close(e.nfd);
      } catch (t2) {
        throw t2.code ? new FS.ErrnoError(ERRNO_CODES[t2.code]) : t2;
      }
    }, read(e, t2, r, a2, o2) {
      try {
        return e.node.mount.opts.fs.read(e.nfd, t2, r, a2, o2);
      } catch (_3) {
        throw _3.code ? new FS.ErrnoError(ERRNO_CODES[_3.code]) : _3;
      }
    }, write(e, t2, r, a2, o2) {
      try {
        return e.node.mount.opts.fs.write(e.nfd, t2, r, a2, o2);
      } catch (_3) {
        throw _3.code ? new FS.ErrnoError(ERRNO_CODES[_3.code]) : _3;
      }
    }, llseek(e, t2, r) {
      var a2 = t2;
      if (r === 1) a2 += e.position;
      else if (r === 2 && FS.isFile(e.node.mode)) try {
        var o2 = e.node.node_ops.getattr(e.node);
        a2 += o2.size;
      } catch (_3) {
        throw new FS.ErrnoError(ERRNO_CODES[_3.code]);
      }
      if (a2 < 0) throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
      return a2;
    } } }, FS = { root: null, mounts: [], devices: {}, streams: [], nextInode: 1, nameTable: null, currentPath: "/", initialized: false, ignorePermissions: true, ErrnoError: class {
      constructor(e) {
        P$2(this, "name", "ErrnoError");
        this.errno = e;
      }
    }, filesystems: null, syncFSRequests: 0, readFiles: {}, FSStream: class {
      constructor() {
        P$2(this, "shared", {});
      }
      get object() {
        return this.node;
      }
      set object(e) {
        this.node = e;
      }
      get isRead() {
        return (this.flags & 2097155) !== 1;
      }
      get isWrite() {
        return (this.flags & 2097155) !== 0;
      }
      get isAppend() {
        return this.flags & 1024;
      }
      get flags() {
        return this.shared.flags;
      }
      set flags(e) {
        this.shared.flags = e;
      }
      get position() {
        return this.shared.position;
      }
      set position(e) {
        this.shared.position = e;
      }
    }, FSNode: class {
      constructor(e, t2, r, a2) {
        P$2(this, "node_ops", {});
        P$2(this, "stream_ops", {});
        P$2(this, "readMode", 365);
        P$2(this, "writeMode", 146);
        P$2(this, "mounted", null);
        e || (e = this), this.parent = e, this.mount = e.mount, this.id = FS.nextInode++, this.name = t2, this.mode = r, this.rdev = a2, this.atime = this.mtime = this.ctime = Date.now();
      }
      get read() {
        return (this.mode & this.readMode) === this.readMode;
      }
      set read(e) {
        e ? this.mode |= this.readMode : this.mode &= ~this.readMode;
      }
      get write() {
        return (this.mode & this.writeMode) === this.writeMode;
      }
      set write(e) {
        e ? this.mode |= this.writeMode : this.mode &= ~this.writeMode;
      }
      get isFolder() {
        return FS.isDir(this.mode);
      }
      get isDevice() {
        return FS.isChrdev(this.mode);
      }
    }, lookupPath(e, t2 = {}) {
      if (!e) return { path: "", node: null };
      t2.follow_mount ?? (t2.follow_mount = true), PATH.isAbs(e) || (e = FS.cwd() + "/" + e);
      e: for (var r = 0; r < 40; r++) {
        for (var a2 = e.split("/").filter((d2) => !!d2 && d2 !== "."), o2 = FS.root, _3 = "/", s2 = 0; s2 < a2.length; s2++) {
          var n2 = s2 === a2.length - 1;
          if (n2 && t2.parent) break;
          if (a2[s2] === "..") {
            _3 = PATH.dirname(_3), o2 = o2.parent;
            continue;
          }
          _3 = PATH.join2(_3, a2[s2]);
          try {
            o2 = FS.lookupNode(o2, a2[s2]);
          } catch (d2) {
            if (d2?.errno === 44 && n2 && t2.noent_okay) return { path: _3 };
            throw d2;
          }
          if (FS.isMountpoint(o2) && (!n2 || t2.follow_mount) && (o2 = o2.mounted.root), FS.isLink(o2.mode) && (!n2 || t2.follow)) {
            if (!o2.node_ops.readlink) throw new FS.ErrnoError(52);
            var l2 = o2.node_ops.readlink(o2);
            PATH.isAbs(l2) || (l2 = PATH.dirname(_3) + "/" + l2), e = l2 + "/" + a2.slice(s2 + 1).join("/");
            continue e;
          }
        }
        return { path: _3, node: o2 };
      }
      throw new FS.ErrnoError(32);
    }, getPath(e) {
      for (var t2; ; ) {
        if (FS.isRoot(e)) {
          var r = e.mount.mountpoint;
          return t2 ? r[r.length - 1] !== "/" ? `${r}/${t2}` : r + t2 : r;
        }
        t2 = t2 ? `${e.name}/${t2}` : e.name, e = e.parent;
      }
    }, hashName(e, t2) {
      for (var r = 0, a2 = 0; a2 < t2.length; a2++) r = (r << 5) - r + t2.charCodeAt(a2) | 0;
      return (e + r >>> 0) % FS.nameTable.length;
    }, hashAddNode(e) {
      var t2 = FS.hashName(e.parent.id, e.name);
      e.name_next = FS.nameTable[t2], FS.nameTable[t2] = e;
    }, hashRemoveNode(e) {
      var t2 = FS.hashName(e.parent.id, e.name);
      if (FS.nameTable[t2] === e) FS.nameTable[t2] = e.name_next;
      else for (var r = FS.nameTable[t2]; r; ) {
        if (r.name_next === e) {
          r.name_next = e.name_next;
          break;
        }
        r = r.name_next;
      }
    }, lookupNode(e, t2) {
      var r = FS.mayLookup(e);
      if (r) throw new FS.ErrnoError(r);
      for (var a2 = FS.hashName(e.id, t2), o2 = FS.nameTable[a2]; o2; o2 = o2.name_next) {
        var _3 = o2.name;
        if (o2.parent.id === e.id && _3 === t2) return o2;
      }
      return FS.lookup(e, t2);
    }, createNode(e, t2, r, a2) {
      var o2 = new FS.FSNode(e, t2, r, a2);
      return FS.hashAddNode(o2), o2;
    }, destroyNode(e) {
      FS.hashRemoveNode(e);
    }, isRoot(e) {
      return e === e.parent;
    }, isMountpoint(e) {
      return !!e.mounted;
    }, isFile(e) {
      return (e & 61440) === 32768;
    }, isDir(e) {
      return (e & 61440) === 16384;
    }, isLink(e) {
      return (e & 61440) === 40960;
    }, isChrdev(e) {
      return (e & 61440) === 8192;
    }, isBlkdev(e) {
      return (e & 61440) === 24576;
    }, isFIFO(e) {
      return (e & 61440) === 4096;
    }, isSocket(e) {
      return (e & 49152) === 49152;
    }, flagsToPermissionString(e) {
      var t2 = ["r", "w", "rw"][e & 3];
      return e & 512 && (t2 += "w"), t2;
    }, nodePermissions(e, t2) {
      return FS.ignorePermissions ? 0 : t2.includes("r") && !(e.mode & 292) || t2.includes("w") && !(e.mode & 146) || t2.includes("x") && !(e.mode & 73) ? 2 : 0;
    }, mayLookup(e) {
      if (!FS.isDir(e.mode)) return 54;
      var t2 = FS.nodePermissions(e, "x");
      return t2 || (e.node_ops.lookup ? 0 : 2);
    }, mayCreate(e, t2) {
      if (!FS.isDir(e.mode)) return 54;
      try {
        var r = FS.lookupNode(e, t2);
        return 20;
      } catch {
      }
      return FS.nodePermissions(e, "wx");
    }, mayDelete(e, t2, r) {
      var a2;
      try {
        a2 = FS.lookupNode(e, t2);
      } catch (_3) {
        return _3.errno;
      }
      var o2 = FS.nodePermissions(e, "wx");
      if (o2) return o2;
      if (r) {
        if (!FS.isDir(a2.mode)) return 54;
        if (FS.isRoot(a2) || FS.getPath(a2) === FS.cwd()) return 10;
      } else if (FS.isDir(a2.mode)) return 31;
      return 0;
    }, mayOpen(e, t2) {
      return e ? FS.isLink(e.mode) ? 32 : FS.isDir(e.mode) && (FS.flagsToPermissionString(t2) !== "r" || t2 & 512) ? 31 : FS.nodePermissions(e, FS.flagsToPermissionString(t2)) : 44;
    }, MAX_OPEN_FDS: 4096, nextfd() {
      for (var e = 0; e <= FS.MAX_OPEN_FDS; e++) if (!FS.streams[e]) return e;
      throw new FS.ErrnoError(33);
    }, getStreamChecked(e) {
      var t2 = FS.getStream(e);
      if (!t2) throw new FS.ErrnoError(8);
      return t2;
    }, getStream: (e) => FS.streams[e], createStream(e, t2 = -1) {
      return e = Object.assign(new FS.FSStream(), e), t2 == -1 && (t2 = FS.nextfd()), e.fd = t2, FS.streams[t2] = e, e;
    }, closeStream(e) {
      FS.streams[e] = null;
    }, dupStream(e, t2 = -1) {
      var r = FS.createStream(e, t2);
      return r.stream_ops?.dup?.(r), r;
    }, chrdev_stream_ops: { open(e) {
      var t2 = FS.getDevice(e.node.rdev);
      e.stream_ops = t2.stream_ops, e.stream_ops.open?.(e);
    }, llseek() {
      throw new FS.ErrnoError(70);
    } }, major: (e) => e >> 8, minor: (e) => e & 255, makedev: (e, t2) => e << 8 | t2, registerDevice(e, t2) {
      FS.devices[e] = { stream_ops: t2 };
    }, getDevice: (e) => FS.devices[e], getMounts(e) {
      for (var t2 = [], r = [e]; r.length; ) {
        var a2 = r.pop();
        t2.push(a2), r.push(...a2.mounts);
      }
      return t2;
    }, syncfs(e, t2) {
      typeof e == "function" && (t2 = e, e = false), FS.syncFSRequests++, FS.syncFSRequests > 1 && err(`warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
      var r = FS.getMounts(FS.root.mount), a2 = 0;
      function o2(s2) {
        return FS.syncFSRequests--, t2(s2);
      }
      function _3(s2) {
        if (s2) return _3.errored ? void 0 : (_3.errored = true, o2(s2));
        ++a2 >= r.length && o2(null);
      }
      r.forEach((s2) => {
        if (!s2.type.syncfs) return _3(null);
        s2.type.syncfs(s2, e, _3);
      });
    }, mount(e, t2, r) {
      var a2 = r === "/", o2 = !r, _3;
      if (a2 && FS.root) throw new FS.ErrnoError(10);
      if (!a2 && !o2) {
        var s2 = FS.lookupPath(r, { follow_mount: false });
        if (r = s2.path, _3 = s2.node, FS.isMountpoint(_3)) throw new FS.ErrnoError(10);
        if (!FS.isDir(_3.mode)) throw new FS.ErrnoError(54);
      }
      var n2 = { type: e, opts: t2, mountpoint: r, mounts: [] }, l2 = e.mount(n2);
      return l2.mount = n2, n2.root = l2, a2 ? FS.root = l2 : _3 && (_3.mounted = n2, _3.mount && _3.mount.mounts.push(n2)), l2;
    }, unmount(e) {
      var t2 = FS.lookupPath(e, { follow_mount: false });
      if (!FS.isMountpoint(t2.node)) throw new FS.ErrnoError(28);
      var r = t2.node, a2 = r.mounted, o2 = FS.getMounts(a2);
      Object.keys(FS.nameTable).forEach((s2) => {
        for (var n2 = FS.nameTable[s2]; n2; ) {
          var l2 = n2.name_next;
          o2.includes(n2.mount) && FS.destroyNode(n2), n2 = l2;
        }
      }), r.mounted = null;
      var _3 = r.mount.mounts.indexOf(a2);
      r.mount.mounts.splice(_3, 1);
    }, lookup(e, t2) {
      return e.node_ops.lookup(e, t2);
    }, mknod(e, t2, r) {
      var a2 = FS.lookupPath(e, { parent: true }), o2 = a2.node, _3 = PATH.basename(e);
      if (!_3 || _3 === "." || _3 === "..") throw new FS.ErrnoError(28);
      var s2 = FS.mayCreate(o2, _3);
      if (s2) throw new FS.ErrnoError(s2);
      if (!o2.node_ops.mknod) throw new FS.ErrnoError(63);
      return o2.node_ops.mknod(o2, _3, t2, r);
    }, statfs(e) {
      var t2 = { bsize: 4096, frsize: 4096, blocks: 1e6, bfree: 5e5, bavail: 5e5, files: FS.nextInode, ffree: FS.nextInode - 1, fsid: 42, flags: 2, namelen: 255 }, r = FS.lookupPath(e, { follow: true }).node;
      return r?.node_ops.statfs && Object.assign(t2, r.node_ops.statfs(r.mount.opts.root)), t2;
    }, create(e, t2 = 438) {
      return t2 &= 4095, t2 |= 32768, FS.mknod(e, t2, 0);
    }, mkdir(e, t2 = 511) {
      return t2 &= 1023, t2 |= 16384, FS.mknod(e, t2, 0);
    }, mkdirTree(e, t2) {
      for (var r = e.split("/"), a2 = "", o2 = 0; o2 < r.length; ++o2) if (r[o2]) {
        a2 += "/" + r[o2];
        try {
          FS.mkdir(a2, t2);
        } catch (_3) {
          if (_3.errno != 20) throw _3;
        }
      }
    }, mkdev(e, t2, r) {
      return typeof r > "u" && (r = t2, t2 = 438), t2 |= 8192, FS.mknod(e, t2, r);
    }, symlink(e, t2) {
      if (!PATH_FS.resolve(e)) throw new FS.ErrnoError(44);
      var r = FS.lookupPath(t2, { parent: true }), a2 = r.node;
      if (!a2) throw new FS.ErrnoError(44);
      var o2 = PATH.basename(t2), _3 = FS.mayCreate(a2, o2);
      if (_3) throw new FS.ErrnoError(_3);
      if (!a2.node_ops.symlink) throw new FS.ErrnoError(63);
      return a2.node_ops.symlink(a2, o2, e);
    }, rename(e, t2) {
      var r = PATH.dirname(e), a2 = PATH.dirname(t2), o2 = PATH.basename(e), _3 = PATH.basename(t2), s2, n2, l2;
      if (s2 = FS.lookupPath(e, { parent: true }), n2 = s2.node, s2 = FS.lookupPath(t2, { parent: true }), l2 = s2.node, !n2 || !l2) throw new FS.ErrnoError(44);
      if (n2.mount !== l2.mount) throw new FS.ErrnoError(75);
      var d2 = FS.lookupNode(n2, o2), p2 = PATH_FS.relative(e, a2);
      if (p2.charAt(0) !== ".") throw new FS.ErrnoError(28);
      if (p2 = PATH_FS.relative(t2, r), p2.charAt(0) !== ".") throw new FS.ErrnoError(55);
      var m2;
      try {
        m2 = FS.lookupNode(l2, _3);
      } catch {
      }
      if (d2 !== m2) {
        var g2 = FS.isDir(d2.mode), u2 = FS.mayDelete(n2, o2, g2);
        if (u2) throw new FS.ErrnoError(u2);
        if (u2 = m2 ? FS.mayDelete(l2, _3, g2) : FS.mayCreate(l2, _3), u2) throw new FS.ErrnoError(u2);
        if (!n2.node_ops.rename) throw new FS.ErrnoError(63);
        if (FS.isMountpoint(d2) || m2 && FS.isMountpoint(m2)) throw new FS.ErrnoError(10);
        if (l2 !== n2 && (u2 = FS.nodePermissions(n2, "w"), u2)) throw new FS.ErrnoError(u2);
        FS.hashRemoveNode(d2);
        try {
          n2.node_ops.rename(d2, l2, _3), d2.parent = l2;
        } catch (f2) {
          throw f2;
        } finally {
          FS.hashAddNode(d2);
        }
      }
    }, rmdir(e) {
      var t2 = FS.lookupPath(e, { parent: true }), r = t2.node, a2 = PATH.basename(e), o2 = FS.lookupNode(r, a2), _3 = FS.mayDelete(r, a2, true);
      if (_3) throw new FS.ErrnoError(_3);
      if (!r.node_ops.rmdir) throw new FS.ErrnoError(63);
      if (FS.isMountpoint(o2)) throw new FS.ErrnoError(10);
      r.node_ops.rmdir(r, a2), FS.destroyNode(o2);
    }, readdir(e) {
      var t2 = FS.lookupPath(e, { follow: true }), r = t2.node;
      if (!r.node_ops.readdir) throw new FS.ErrnoError(54);
      return r.node_ops.readdir(r);
    }, unlink(e) {
      var t2 = FS.lookupPath(e, { parent: true }), r = t2.node;
      if (!r) throw new FS.ErrnoError(44);
      var a2 = PATH.basename(e), o2 = FS.lookupNode(r, a2), _3 = FS.mayDelete(r, a2, false);
      if (_3) throw new FS.ErrnoError(_3);
      if (!r.node_ops.unlink) throw new FS.ErrnoError(63);
      if (FS.isMountpoint(o2)) throw new FS.ErrnoError(10);
      r.node_ops.unlink(r, a2), FS.destroyNode(o2);
    }, readlink(e) {
      var t2 = FS.lookupPath(e), r = t2.node;
      if (!r) throw new FS.ErrnoError(44);
      if (!r.node_ops.readlink) throw new FS.ErrnoError(28);
      return r.node_ops.readlink(r);
    }, stat(e, t2) {
      var r = FS.lookupPath(e, { follow: !t2 }), a2 = r.node;
      if (!a2) throw new FS.ErrnoError(44);
      if (!a2.node_ops.getattr) throw new FS.ErrnoError(63);
      return a2.node_ops.getattr(a2);
    }, lstat(e) {
      return FS.stat(e, true);
    }, chmod(e, t2, r) {
      var a2;
      if (typeof e == "string") {
        var o2 = FS.lookupPath(e, { follow: !r });
        a2 = o2.node;
      } else a2 = e;
      if (!a2.node_ops.setattr) throw new FS.ErrnoError(63);
      a2.node_ops.setattr(a2, { mode: t2 & 4095 | a2.mode & -4096, ctime: Date.now() });
    }, lchmod(e, t2) {
      FS.chmod(e, t2, true);
    }, fchmod(e, t2) {
      var r = FS.getStreamChecked(e);
      FS.chmod(r.node, t2);
    }, chown(e, t2, r, a2) {
      var o2;
      if (typeof e == "string") {
        var _3 = FS.lookupPath(e, { follow: !a2 });
        o2 = _3.node;
      } else o2 = e;
      if (!o2.node_ops.setattr) throw new FS.ErrnoError(63);
      o2.node_ops.setattr(o2, { timestamp: Date.now() });
    }, lchown(e, t2, r) {
      FS.chown(e, t2, r, true);
    }, fchown(e, t2, r) {
      var a2 = FS.getStreamChecked(e);
      FS.chown(a2.node, t2, r);
    }, truncate(e, t2) {
      if (t2 < 0) throw new FS.ErrnoError(28);
      var r;
      if (typeof e == "string") {
        var a2 = FS.lookupPath(e, { follow: true });
        r = a2.node;
      } else r = e;
      if (!r.node_ops.setattr) throw new FS.ErrnoError(63);
      if (FS.isDir(r.mode)) throw new FS.ErrnoError(31);
      if (!FS.isFile(r.mode)) throw new FS.ErrnoError(28);
      var o2 = FS.nodePermissions(r, "w");
      if (o2) throw new FS.ErrnoError(o2);
      r.node_ops.setattr(r, { size: t2, timestamp: Date.now() });
    }, ftruncate(e, t2) {
      var r = FS.getStreamChecked(e);
      if (!(r.flags & 2097155)) throw new FS.ErrnoError(28);
      FS.truncate(r.node, t2);
    }, utime(e, t2, r) {
      var a2 = FS.lookupPath(e, { follow: true }), o2 = a2.node;
      o2.node_ops.setattr(o2, { atime: t2, mtime: r });
    }, open(e, t2, r = 438) {
      if (e === "") throw new FS.ErrnoError(44);
      t2 = typeof t2 == "string" ? FS_modeStringToFlags(t2) : t2, t2 & 64 ? r = r & 4095 | 32768 : r = 0;
      var a2;
      if (typeof e == "object") a2 = e;
      else {
        var o2 = FS.lookupPath(e, { follow: !(t2 & 131072), noent_okay: true });
        a2 = o2.node, e = o2.path;
      }
      var _3 = false;
      if (t2 & 64) if (a2) {
        if (t2 & 128) throw new FS.ErrnoError(20);
      } else a2 = FS.mknod(e, r, 0), _3 = true;
      if (!a2) throw new FS.ErrnoError(44);
      if (FS.isChrdev(a2.mode) && (t2 &= -513), t2 & 65536 && !FS.isDir(a2.mode)) throw new FS.ErrnoError(54);
      if (!_3) {
        var s2 = FS.mayOpen(a2, t2);
        if (s2) throw new FS.ErrnoError(s2);
      }
      t2 & 512 && !_3 && FS.truncate(a2, 0), t2 &= -131713;
      var n2 = FS.createStream({ node: a2, path: FS.getPath(a2), flags: t2, seekable: true, position: 0, stream_ops: a2.stream_ops, ungotten: [], error: false });
      return n2.stream_ops.open && n2.stream_ops.open(n2), Module.logReadFiles && !(t2 & 1) && (e in FS.readFiles || (FS.readFiles[e] = 1)), n2;
    }, close(e) {
      if (FS.isClosed(e)) throw new FS.ErrnoError(8);
      e.getdents && (e.getdents = null);
      try {
        e.stream_ops.close && e.stream_ops.close(e);
      } catch (t2) {
        throw t2;
      } finally {
        FS.closeStream(e.fd);
      }
      e.fd = null;
    }, isClosed(e) {
      return e.fd === null;
    }, llseek(e, t2, r) {
      if (FS.isClosed(e)) throw new FS.ErrnoError(8);
      if (!e.seekable || !e.stream_ops.llseek) throw new FS.ErrnoError(70);
      if (r != 0 && r != 1 && r != 2) throw new FS.ErrnoError(28);
      return e.position = e.stream_ops.llseek(e, t2, r), e.ungotten = [], e.position;
    }, read(e, t2, r, a2, o2) {
      if (a2 < 0 || o2 < 0) throw new FS.ErrnoError(28);
      if (FS.isClosed(e)) throw new FS.ErrnoError(8);
      if ((e.flags & 2097155) === 1) throw new FS.ErrnoError(8);
      if (FS.isDir(e.node.mode)) throw new FS.ErrnoError(31);
      if (!e.stream_ops.read) throw new FS.ErrnoError(28);
      var _3 = typeof o2 < "u";
      if (!_3) o2 = e.position;
      else if (!e.seekable) throw new FS.ErrnoError(70);
      var s2 = e.stream_ops.read(e, t2, r, a2, o2);
      return _3 || (e.position += s2), s2;
    }, write(e, t2, r, a2, o2, _3) {
      if (a2 < 0 || o2 < 0) throw new FS.ErrnoError(28);
      if (FS.isClosed(e)) throw new FS.ErrnoError(8);
      if (!(e.flags & 2097155)) throw new FS.ErrnoError(8);
      if (FS.isDir(e.node.mode)) throw new FS.ErrnoError(31);
      if (!e.stream_ops.write) throw new FS.ErrnoError(28);
      e.seekable && e.flags & 1024 && FS.llseek(e, 0, 2);
      var s2 = typeof o2 < "u";
      if (!s2) o2 = e.position;
      else if (!e.seekable) throw new FS.ErrnoError(70);
      var n2 = e.stream_ops.write(e, t2, r, a2, o2, _3);
      return s2 || (e.position += n2), n2;
    }, allocate(e, t2, r) {
      if (FS.isClosed(e)) throw new FS.ErrnoError(8);
      if (t2 < 0 || r <= 0) throw new FS.ErrnoError(28);
      if (!(e.flags & 2097155)) throw new FS.ErrnoError(8);
      if (!FS.isFile(e.node.mode) && !FS.isDir(e.node.mode)) throw new FS.ErrnoError(43);
      if (!e.stream_ops.allocate) throw new FS.ErrnoError(138);
      e.stream_ops.allocate(e, t2, r);
    }, mmap(e, t2, r, a2, o2) {
      if (a2 & 2 && !(o2 & 2) && (e.flags & 2097155) !== 2) throw new FS.ErrnoError(2);
      if ((e.flags & 2097155) === 1) throw new FS.ErrnoError(2);
      if (!e.stream_ops.mmap) throw new FS.ErrnoError(43);
      if (!t2) throw new FS.ErrnoError(28);
      return e.stream_ops.mmap(e, t2, r, a2, o2);
    }, msync(e, t2, r, a2, o2) {
      return e.stream_ops.msync ? e.stream_ops.msync(e, t2, r, a2, o2) : 0;
    }, ioctl(e, t2, r) {
      if (!e.stream_ops.ioctl) throw new FS.ErrnoError(59);
      return e.stream_ops.ioctl(e, t2, r);
    }, readFile(e, t2 = {}) {
      if (t2.flags = t2.flags || 0, t2.encoding = t2.encoding || "binary", t2.encoding !== "utf8" && t2.encoding !== "binary") throw new Error(`Invalid encoding type "${t2.encoding}"`);
      var r, a2 = FS.open(e, t2.flags), o2 = FS.stat(e), _3 = o2.size, s2 = new Uint8Array(_3);
      return FS.read(a2, s2, 0, _3, 0), t2.encoding === "utf8" ? r = UTF8ArrayToString(s2) : t2.encoding === "binary" && (r = s2), FS.close(a2), r;
    }, writeFile(e, t2, r = {}) {
      r.flags = r.flags || 577;
      var a2 = FS.open(e, r.flags, r.mode);
      if (typeof t2 == "string") {
        var o2 = new Uint8Array(lengthBytesUTF8(t2) + 1), _3 = stringToUTF8Array(t2, o2, 0, o2.length);
        FS.write(a2, o2, 0, _3, void 0, r.canOwn);
      } else if (ArrayBuffer.isView(t2)) FS.write(a2, t2, 0, t2.byteLength, void 0, r.canOwn);
      else throw new Error("Unsupported data type");
      FS.close(a2);
    }, cwd: () => FS.currentPath, chdir(e) {
      var t2 = FS.lookupPath(e, { follow: true });
      if (t2.node === null) throw new FS.ErrnoError(44);
      if (!FS.isDir(t2.node.mode)) throw new FS.ErrnoError(54);
      var r = FS.nodePermissions(t2.node, "x");
      if (r) throw new FS.ErrnoError(r);
      FS.currentPath = t2.path;
    }, createDefaultDirectories() {
      FS.mkdir("/tmp"), FS.mkdir("/home"), FS.mkdir("/home/web_user");
    }, createDefaultDevices() {
      FS.mkdir("/dev"), FS.registerDevice(FS.makedev(1, 3), { read: () => 0, write: (a2, o2, _3, s2, n2) => s2, llseek: () => 0 }), FS.mkdev("/dev/null", FS.makedev(1, 3)), TTY.register(FS.makedev(5, 0), TTY.default_tty_ops), TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops), FS.mkdev("/dev/tty", FS.makedev(5, 0)), FS.mkdev("/dev/tty1", FS.makedev(6, 0));
      var e = new Uint8Array(1024), t2 = 0, r = () => (t2 === 0 && (t2 = randomFill(e).byteLength), e[--t2]);
      FS.createDevice("/dev", "random", r), FS.createDevice("/dev", "urandom", r), FS.mkdir("/dev/shm"), FS.mkdir("/dev/shm/tmp");
    }, createSpecialDirectories() {
      FS.mkdir("/proc");
      var e = FS.mkdir("/proc/self");
      FS.mkdir("/proc/self/fd"), FS.mount({ mount() {
        var t2 = FS.createNode(e, "fd", 16895, 73);
        return t2.stream_ops = { llseek: MEMFS.stream_ops.llseek }, t2.node_ops = { lookup(r, a2) {
          var o2 = +a2, _3 = FS.getStreamChecked(o2), s2 = { parent: null, mount: { mountpoint: "fake" }, node_ops: { readlink: () => _3.path }, id: o2 + 1 };
          return s2.parent = s2, s2;
        }, readdir() {
          return Array.from(FS.streams.entries()).filter(([r, a2]) => a2).map(([r, a2]) => r.toString());
        } }, t2;
      } }, {}, "/proc/self/fd");
    }, createStandardStreams(e, t2, r) {
      e ? FS.createDevice("/dev", "stdin", e) : FS.symlink("/dev/tty", "/dev/stdin"), t2 ? FS.createDevice("/dev", "stdout", null, t2) : FS.symlink("/dev/tty", "/dev/stdout"), r ? FS.createDevice("/dev", "stderr", null, r) : FS.symlink("/dev/tty1", "/dev/stderr");
      FS.open("/dev/stdin", 0);
      FS.open("/dev/stdout", 1);
      FS.open("/dev/stderr", 1);
    }, staticInit() {
      FS.nameTable = new Array(4096), FS.mount(MEMFS, {}, "/"), FS.createDefaultDirectories(), FS.createDefaultDevices(), FS.createSpecialDirectories(), FS.filesystems = { MEMFS, IDBFS, NODEFS, PROXYFS };
    }, init(e, t2, r) {
      FS.initialized = true, e ?? (e = Module.stdin), t2 ?? (t2 = Module.stdout), r ?? (r = Module.stderr), FS.createStandardStreams(e, t2, r);
    }, quit() {
      FS.initialized = false, _fflush(0);
      for (var e = 0; e < FS.streams.length; e++) {
        var t2 = FS.streams[e];
        t2 && FS.close(t2);
      }
    }, findObject(e, t2) {
      var r = FS.analyzePath(e, t2);
      return r.exists ? r.object : null;
    }, analyzePath(e, t2) {
      try {
        var r = FS.lookupPath(e, { follow: !t2 });
        e = r.path;
      } catch {
      }
      var a2 = { isRoot: false, exists: false, error: 0, name: null, path: null, object: null, parentExists: false, parentPath: null, parentObject: null };
      try {
        var r = FS.lookupPath(e, { parent: true });
        a2.parentExists = true, a2.parentPath = r.path, a2.parentObject = r.node, a2.name = PATH.basename(e), r = FS.lookupPath(e, { follow: !t2 }), a2.exists = true, a2.path = r.path, a2.object = r.node, a2.name = r.node.name, a2.isRoot = r.path === "/";
      } catch (o2) {
        a2.error = o2.errno;
      }
      return a2;
    }, createPath(e, t2, r, a2) {
      e = typeof e == "string" ? e : FS.getPath(e);
      for (var o2 = t2.split("/").reverse(); o2.length; ) {
        var _3 = o2.pop();
        if (_3) {
          var s2 = PATH.join2(e, _3);
          try {
            FS.mkdir(s2);
          } catch {
          }
          e = s2;
        }
      }
      return s2;
    }, createFile(e, t2, r, a2, o2) {
      var _3 = PATH.join2(typeof e == "string" ? e : FS.getPath(e), t2), s2 = FS_getMode(a2, o2);
      return FS.create(_3, s2);
    }, createDataFile(e, t2, r, a2, o2, _3) {
      var s2 = t2;
      e && (e = typeof e == "string" ? e : FS.getPath(e), s2 = t2 ? PATH.join2(e, t2) : e);
      var n2 = FS_getMode(a2, o2), l2 = FS.create(s2, n2);
      if (r) {
        if (typeof r == "string") {
          for (var d2 = new Array(r.length), p2 = 0, m2 = r.length; p2 < m2; ++p2) d2[p2] = r.charCodeAt(p2);
          r = d2;
        }
        FS.chmod(l2, n2 | 146);
        var g2 = FS.open(l2, 577);
        FS.write(g2, r, 0, r.length, 0, _3), FS.close(g2), FS.chmod(l2, n2);
      }
    }, createDevice(e, t2, r, a2) {
      var n2;
      var o2 = PATH.join2(typeof e == "string" ? e : FS.getPath(e), t2), _3 = FS_getMode(!!r, !!a2);
      (n2 = FS.createDevice).major ?? (n2.major = 64);
      var s2 = FS.makedev(FS.createDevice.major++, 0);
      return FS.registerDevice(s2, { open(l2) {
        l2.seekable = false;
      }, close(l2) {
        a2?.buffer?.length && a2(10);
      }, read(l2, d2, p2, m2, g2) {
        for (var u2 = 0, f2 = 0; f2 < m2; f2++) {
          var c2;
          try {
            c2 = r();
          } catch {
            throw new FS.ErrnoError(29);
          }
          if (c2 === void 0 && u2 === 0) throw new FS.ErrnoError(6);
          if (c2 == null) break;
          u2++, d2[p2 + f2] = c2;
        }
        return u2 && (l2.node.atime = Date.now()), u2;
      }, write(l2, d2, p2, m2, g2) {
        for (var u2 = 0; u2 < m2; u2++) try {
          a2(d2[p2 + u2]);
        } catch {
          throw new FS.ErrnoError(29);
        }
        return m2 && (l2.node.mtime = l2.node.ctime = Date.now()), u2;
      } }), FS.mkdev(o2, _3, s2);
    }, forceLoadFile(e) {
      if (e.isDevice || e.isFolder || e.link || e.contents) return true;
      if (typeof XMLHttpRequest < "u") throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
      try {
        e.contents = readBinary(e.url), e.usedBytes = e.contents.length;
      } catch {
        throw new FS.ErrnoError(29);
      }
    }, createLazyFile(e, t2, r, a2, o2) {
      class _3 {
        constructor() {
          P$2(this, "lengthKnown", false);
          P$2(this, "chunks", []);
        }
        get(u2) {
          if (!(u2 > this.length - 1 || u2 < 0)) {
            var f2 = u2 % this.chunkSize, c2 = u2 / this.chunkSize | 0;
            return this.getter(c2)[f2];
          }
        }
        setDataGetter(u2) {
          this.getter = u2;
        }
        cacheLength() {
          var u2 = new XMLHttpRequest();
          if (u2.open("HEAD", r, false), u2.send(null), !(u2.status >= 200 && u2.status < 300 || u2.status === 304)) throw new Error("Couldn't load " + r + ". Status: " + u2.status);
          var f2 = Number(u2.getResponseHeader("Content-length")), c2, w2 = (c2 = u2.getResponseHeader("Accept-Ranges")) && c2 === "bytes", S2 = (c2 = u2.getResponseHeader("Content-Encoding")) && c2 === "gzip", k2 = 1024 * 1024;
          w2 || (k2 = f2);
          var E2 = (M, b2) => {
            if (M > b2) throw new Error("invalid range (" + M + ", " + b2 + ") or no bytes requested!");
            if (b2 > f2 - 1) throw new Error("only " + f2 + " bytes available! programmer error!");
            var F2 = new XMLHttpRequest();
            if (F2.open("GET", r, false), f2 !== k2 && F2.setRequestHeader("Range", "bytes=" + M + "-" + b2), F2.responseType = "arraybuffer", F2.overrideMimeType && F2.overrideMimeType("text/plain; charset=x-user-defined"), F2.send(null), !(F2.status >= 200 && F2.status < 300 || F2.status === 304)) throw new Error("Couldn't load " + r + ". Status: " + F2.status);
            return F2.response !== void 0 ? new Uint8Array(F2.response || []) : intArrayFromString(F2.responseText || "");
          }, y2 = this;
          y2.setDataGetter((M) => {
            var b2 = M * k2, F2 = (M + 1) * k2 - 1;
            if (F2 = Math.min(F2, f2 - 1), typeof y2.chunks[M] > "u" && (y2.chunks[M] = E2(b2, F2)), typeof y2.chunks[M] > "u") throw new Error("doXHR failed!");
            return y2.chunks[M];
          }), (S2 || !f2) && (k2 = f2 = 1, f2 = this.getter(0).length, k2 = f2, out("LazyFiles on gzip forces download of the whole file when length is accessed")), this._length = f2, this._chunkSize = k2, this.lengthKnown = true;
        }
        get length() {
          return this.lengthKnown || this.cacheLength(), this._length;
        }
        get chunkSize() {
          return this.lengthKnown || this.cacheLength(), this._chunkSize;
        }
      }
      if (typeof XMLHttpRequest < "u") {
        if (!ENVIRONMENT_IS_WORKER) throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
        var s2 = new _3(), n2 = { isDevice: false, contents: s2 };
      } else var n2 = { isDevice: false, url: r };
      var l2 = FS.createFile(e, t2, n2, a2, o2);
      n2.contents ? l2.contents = n2.contents : n2.url && (l2.contents = null, l2.url = n2.url), Object.defineProperties(l2, { usedBytes: { get: function() {
        return this.contents.length;
      } } });
      var d2 = {}, p2 = Object.keys(l2.stream_ops);
      p2.forEach((g2) => {
        var u2 = l2.stream_ops[g2];
        d2[g2] = (...f2) => (FS.forceLoadFile(l2), u2(...f2));
      });
      function m2(g2, u2, f2, c2, w2) {
        var S2 = g2.node.contents;
        if (w2 >= S2.length) return 0;
        var k2 = Math.min(S2.length - w2, c2);
        if (S2.slice) for (var E2 = 0; E2 < k2; E2++) u2[f2 + E2] = S2[w2 + E2];
        else for (var E2 = 0; E2 < k2; E2++) u2[f2 + E2] = S2.get(w2 + E2);
        return k2;
      }
      return d2.read = (g2, u2, f2, c2, w2) => (FS.forceLoadFile(l2), m2(g2, u2, f2, c2, w2)), d2.mmap = (g2, u2, f2, c2, w2) => {
        FS.forceLoadFile(l2);
        var S2 = mmapAlloc(u2);
        if (!S2) throw new FS.ErrnoError(48);
        return m2(g2, HEAP8, S2, u2, f2), { ptr: S2, allocated: true };
      }, l2.stream_ops = d2, l2;
    } }, SYSCALLS = { DEFAULT_POLLMASK: 5, calculateAt(e, t2, r) {
      if (PATH.isAbs(t2)) return t2;
      var a2;
      if (e === -100) a2 = FS.cwd();
      else {
        var o2 = SYSCALLS.getStreamFromFD(e);
        a2 = o2.path;
      }
      if (t2.length == 0) {
        if (!r) throw new FS.ErrnoError(44);
        return a2;
      }
      return a2 + "/" + t2;
    }, doStat(e, t2, r) {
      var a2 = e(t2);
      HEAP32[r >> 2] = a2.dev, HEAP32[r + 4 >> 2] = a2.mode, HEAPU32[r + 8 >> 2] = a2.nlink, HEAP32[r + 12 >> 2] = a2.uid, HEAP32[r + 16 >> 2] = a2.gid, HEAP32[r + 20 >> 2] = a2.rdev, HEAP64[r + 24 >> 3] = BigInt(a2.size), HEAP32[r + 32 >> 2] = 4096, HEAP32[r + 36 >> 2] = a2.blocks;
      var o2 = a2.atime.getTime(), _3 = a2.mtime.getTime(), s2 = a2.ctime.getTime();
      return HEAP64[r + 40 >> 3] = BigInt(Math.floor(o2 / 1e3)), HEAPU32[r + 48 >> 2] = o2 % 1e3 * 1e3 * 1e3, HEAP64[r + 56 >> 3] = BigInt(Math.floor(_3 / 1e3)), HEAPU32[r + 64 >> 2] = _3 % 1e3 * 1e3 * 1e3, HEAP64[r + 72 >> 3] = BigInt(Math.floor(s2 / 1e3)), HEAPU32[r + 80 >> 2] = s2 % 1e3 * 1e3 * 1e3, HEAP64[r + 88 >> 3] = BigInt(a2.ino), 0;
    }, doMsync(e, t2, r, a2, o2) {
      if (!FS.isFile(t2.node.mode)) throw new FS.ErrnoError(43);
      if (a2 & 2) return 0;
      var _3 = HEAPU8.slice(e, e + r);
      FS.msync(t2, _3, o2, r, a2);
    }, getStreamFromFD(e) {
      var t2 = FS.getStreamChecked(e);
      return t2;
    }, varargs: void 0, getStr(e) {
      var t2 = UTF8ToString(e);
      return t2;
    } }, ___syscall__newselect = function(e, t2, r, a2, o2) {
      try {
        for (var _3 = 0, s2 = t2 ? HEAP32[t2 >> 2] : 0, n2 = t2 ? HEAP32[t2 + 4 >> 2] : 0, l2 = r ? HEAP32[r >> 2] : 0, d2 = r ? HEAP32[r + 4 >> 2] : 0, p2 = a2 ? HEAP32[a2 >> 2] : 0, m2 = a2 ? HEAP32[a2 + 4 >> 2] : 0, g2 = 0, u2 = 0, f2 = 0, c2 = 0, w2 = 0, S2 = 0, k2 = (t2 ? HEAP32[t2 >> 2] : 0) | (r ? HEAP32[r >> 2] : 0) | (a2 ? HEAP32[a2 >> 2] : 0), E2 = (t2 ? HEAP32[t2 + 4 >> 2] : 0) | (r ? HEAP32[r + 4 >> 2] : 0) | (a2 ? HEAP32[a2 + 4 >> 2] : 0), y2 = (X2, R2, L2, q2) => X2 < 32 ? R2 & q2 : L2 & q2, M = 0; M < e; M++) {
          var b2 = 1 << M % 32;
          if (y2(M, k2, E2, b2)) {
            var F2 = SYSCALLS.getStreamFromFD(M), A2 = SYSCALLS.DEFAULT_POLLMASK;
            if (F2.stream_ops.poll) {
              var V2 = -1;
              if (o2) {
                var te2 = t2 ? HEAP32[o2 >> 2] : 0, j2 = t2 ? HEAP32[o2 + 4 >> 2] : 0;
                V2 = (te2 + j2 / 1e6) * 1e3;
              }
              A2 = F2.stream_ops.poll(F2, V2);
            }
            A2 & 1 && y2(M, s2, n2, b2) && (M < 32 ? g2 = g2 | b2 : u2 = u2 | b2, _3++), A2 & 4 && y2(M, l2, d2, b2) && (M < 32 ? f2 = f2 | b2 : c2 = c2 | b2, _3++), A2 & 2 && y2(M, p2, m2, b2) && (M < 32 ? w2 = w2 | b2 : S2 = S2 | b2, _3++);
          }
        }
        return t2 && (HEAP32[t2 >> 2] = g2, HEAP32[t2 + 4 >> 2] = u2), r && (HEAP32[r >> 2] = f2, HEAP32[r + 4 >> 2] = c2), a2 && (HEAP32[a2 >> 2] = w2, HEAP32[a2 + 4 >> 2] = S2), _3;
      } catch (X2) {
        if (typeof FS > "u" || X2.name !== "ErrnoError") throw X2;
        return -X2.errno;
      }
    };
    ___syscall__newselect.sig = "iipppp";
    var SOCKFS = { websocketArgs: {}, callbacks: {}, on(e, t2) {
      SOCKFS.callbacks[e] = t2;
    }, emit(e, t2) {
      SOCKFS.callbacks[e]?.(t2);
    }, mount(e) {
      return SOCKFS.websocketArgs = Module.websocket || {}, (Module.websocket ?? (Module.websocket = {})).on = SOCKFS.on, FS.createNode(null, "/", 16895, 0);
    }, createSocket(e, t2, r) {
      t2 &= -526337;
      var a2 = t2 == 1;
      if (a2 && r && r != 6) throw new FS.ErrnoError(66);
      var o2 = { family: e, type: t2, protocol: r, server: null, error: null, peers: {}, pending: [], recv_queue: [], sock_ops: SOCKFS.websocket_sock_ops }, _3 = SOCKFS.nextname(), s2 = FS.createNode(SOCKFS.root, _3, 49152, 0);
      s2.sock = o2;
      var n2 = FS.createStream({ path: _3, node: s2, flags: 2, seekable: false, stream_ops: SOCKFS.stream_ops });
      return o2.stream = n2, o2;
    }, getSocket(e) {
      var t2 = FS.getStream(e);
      return !t2 || !FS.isSocket(t2.node.mode) ? null : t2.node.sock;
    }, stream_ops: { poll(e) {
      var t2 = e.node.sock;
      return t2.sock_ops.poll(t2);
    }, ioctl(e, t2, r) {
      var a2 = e.node.sock;
      return a2.sock_ops.ioctl(a2, t2, r);
    }, read(e, t2, r, a2, o2) {
      var _3 = e.node.sock, s2 = _3.sock_ops.recvmsg(_3, a2);
      return s2 ? (t2.set(s2.buffer, r), s2.buffer.length) : 0;
    }, write(e, t2, r, a2, o2) {
      var _3 = e.node.sock;
      return _3.sock_ops.sendmsg(_3, t2, r, a2);
    }, close(e) {
      var t2 = e.node.sock;
      t2.sock_ops.close(t2);
    } }, nextname() {
      return SOCKFS.nextname.current || (SOCKFS.nextname.current = 0), `socket[${SOCKFS.nextname.current++}]`;
    }, websocket_sock_ops: { createPeer(e, t2, r) {
      var a2;
      if (typeof t2 == "object" && (a2 = t2, t2 = null, r = null), a2) if (a2._socket) t2 = a2._socket.remoteAddress, r = a2._socket.remotePort;
      else {
        var o2 = /ws[s]?:\/\/([^:]+):(\d+)/.exec(a2.url);
        if (!o2) throw new Error("WebSocket URL must be in the format ws(s)://address:port");
        t2 = o2[1], r = parseInt(o2[2], 10);
      }
      else try {
        var _3 = "ws:#".replace("#", "//"), s2 = "binary", n2 = void 0;
        if (SOCKFS.websocketArgs.url && (_3 = SOCKFS.websocketArgs.url), SOCKFS.websocketArgs.subprotocol ? s2 = SOCKFS.websocketArgs.subprotocol : SOCKFS.websocketArgs.subprotocol === null && (s2 = "null"), _3 === "ws://" || _3 === "wss://") {
          var l2 = t2.split("/");
          _3 = _3 + l2[0] + ":" + r + "/" + l2.slice(1).join("/");
        }
        s2 !== "null" && (s2 = s2.replace(/^ +| +$/g, "").split(/ *, */), n2 = s2);
        var d2;
        ENVIRONMENT_IS_NODE ? d2 = require("ws") : d2 = WebSocket, a2 = new d2(_3, n2), a2.binaryType = "arraybuffer";
      } catch {
        throw new FS.ErrnoError(23);
      }
      var p2 = { addr: t2, port: r, socket: a2, msg_send_queue: [] };
      return SOCKFS.websocket_sock_ops.addPeer(e, p2), SOCKFS.websocket_sock_ops.handlePeerEvents(e, p2), e.type === 2 && typeof e.sport < "u" && p2.msg_send_queue.push(new Uint8Array([255, 255, 255, 255, 112, 111, 114, 116, (e.sport & 65280) >> 8, e.sport & 255])), p2;
    }, getPeer(e, t2, r) {
      return e.peers[t2 + ":" + r];
    }, addPeer(e, t2) {
      e.peers[t2.addr + ":" + t2.port] = t2;
    }, removePeer(e, t2) {
      delete e.peers[t2.addr + ":" + t2.port];
    }, handlePeerEvents(e, t2) {
      var r = true, a2 = function() {
        e.connecting = false, SOCKFS.emit("open", e.stream.fd);
        try {
          for (var _3 = t2.msg_send_queue.shift(); _3; ) t2.socket.send(_3), _3 = t2.msg_send_queue.shift();
        } catch {
          t2.socket.close();
        }
      };
      function o2(_3) {
        if (typeof _3 == "string") {
          var s2 = new TextEncoder();
          _3 = s2.encode(_3);
        } else {
          if (assert(_3.byteLength !== void 0), _3.byteLength == 0) return;
          _3 = new Uint8Array(_3);
        }
        var n2 = r;
        if (r = false, n2 && _3.length === 10 && _3[0] === 255 && _3[1] === 255 && _3[2] === 255 && _3[3] === 255 && _3[4] === 112 && _3[5] === 111 && _3[6] === 114 && _3[7] === 116) {
          var l2 = _3[8] << 8 | _3[9];
          SOCKFS.websocket_sock_ops.removePeer(e, t2), t2.port = l2, SOCKFS.websocket_sock_ops.addPeer(e, t2);
          return;
        }
        e.recv_queue.push({ addr: t2.addr, port: t2.port, data: _3 }), SOCKFS.emit("message", e.stream.fd);
      }
      ENVIRONMENT_IS_NODE ? (t2.socket.on("open", a2), t2.socket.on("message", function(_3, s2) {
        s2 && o2(new Uint8Array(_3).buffer);
      }), t2.socket.on("close", function() {
        SOCKFS.emit("close", e.stream.fd);
      }), t2.socket.on("error", function(_3) {
        e.error = 14, SOCKFS.emit("error", [e.stream.fd, e.error, "ECONNREFUSED: Connection refused"]);
      })) : (t2.socket.onopen = a2, t2.socket.onclose = function() {
        SOCKFS.emit("close", e.stream.fd);
      }, t2.socket.onmessage = function(s2) {
        o2(s2.data);
      }, t2.socket.onerror = function(_3) {
        e.error = 14, SOCKFS.emit("error", [e.stream.fd, e.error, "ECONNREFUSED: Connection refused"]);
      });
    }, poll(e) {
      if (e.type === 1 && e.server) return e.pending.length ? 65 : 0;
      var t2 = 0, r = e.type === 1 ? SOCKFS.websocket_sock_ops.getPeer(e, e.daddr, e.dport) : null;
      return (e.recv_queue.length || !r || r && r.socket.readyState === r.socket.CLOSING || r && r.socket.readyState === r.socket.CLOSED) && (t2 |= 65), (!r || r && r.socket.readyState === r.socket.OPEN) && (t2 |= 4), (r && r.socket.readyState === r.socket.CLOSING || r && r.socket.readyState === r.socket.CLOSED) && (e.connecting ? t2 |= 4 : t2 |= 16), t2;
    }, ioctl(e, t2, r) {
      switch (t2) {
        case 21531:
          var a2 = 0;
          return e.recv_queue.length && (a2 = e.recv_queue[0].data.length), HEAP32[r >> 2] = a2, 0;
        default:
          return 28;
      }
    }, close(e) {
      if (e.server) {
        try {
          e.server.close();
        } catch {
        }
        e.server = null;
      }
      for (var t2 = Object.keys(e.peers), r = 0; r < t2.length; r++) {
        var a2 = e.peers[t2[r]];
        try {
          a2.socket.close();
        } catch {
        }
        SOCKFS.websocket_sock_ops.removePeer(e, a2);
      }
      return 0;
    }, bind(e, t2, r) {
      if (typeof e.saddr < "u" || typeof e.sport < "u") throw new FS.ErrnoError(28);
      if (e.saddr = t2, e.sport = r, e.type === 2) {
        e.server && (e.server.close(), e.server = null);
        try {
          e.sock_ops.listen(e, 0);
        } catch (a2) {
          if (a2.name !== "ErrnoError" || a2.errno !== 138) throw a2;
        }
      }
    }, connect(e, t2, r) {
      if (e.server) throw new FS.ErrnoError(138);
      if (typeof e.daddr < "u" && typeof e.dport < "u") {
        var a2 = SOCKFS.websocket_sock_ops.getPeer(e, e.daddr, e.dport);
        if (a2) throw a2.socket.readyState === a2.socket.CONNECTING ? new FS.ErrnoError(7) : new FS.ErrnoError(30);
      }
      var o2 = SOCKFS.websocket_sock_ops.createPeer(e, t2, r);
      e.daddr = o2.addr, e.dport = o2.port, e.connecting = true;
    }, listen(e, t2) {
      if (!ENVIRONMENT_IS_NODE) throw new FS.ErrnoError(138);
      if (e.server) throw new FS.ErrnoError(28);
      var r = require("ws").Server, a2 = e.saddr;
      e.server = new r({ host: a2, port: e.sport }), SOCKFS.emit("listen", e.stream.fd), e.server.on("connection", function(o2) {
        if (e.type === 1) {
          var _3 = SOCKFS.createSocket(e.family, e.type, e.protocol), s2 = SOCKFS.websocket_sock_ops.createPeer(_3, o2);
          _3.daddr = s2.addr, _3.dport = s2.port, e.pending.push(_3), SOCKFS.emit("connection", _3.stream.fd);
        } else SOCKFS.websocket_sock_ops.createPeer(e, o2), SOCKFS.emit("connection", e.stream.fd);
      }), e.server.on("close", function() {
        SOCKFS.emit("close", e.stream.fd), e.server = null;
      }), e.server.on("error", function(o2) {
        e.error = 23, SOCKFS.emit("error", [e.stream.fd, e.error, "EHOSTUNREACH: Host is unreachable"]);
      });
    }, accept(e) {
      if (!e.server || !e.pending.length) throw new FS.ErrnoError(28);
      var t2 = e.pending.shift();
      return t2.stream.flags = e.stream.flags, t2;
    }, getname(e, t2) {
      var r, a2;
      if (t2) {
        if (e.daddr === void 0 || e.dport === void 0) throw new FS.ErrnoError(53);
        r = e.daddr, a2 = e.dport;
      } else r = e.saddr || 0, a2 = e.sport || 0;
      return { addr: r, port: a2 };
    }, sendmsg(e, t2, r, a2, o2, _3) {
      if (e.type === 2) {
        if ((o2 === void 0 || _3 === void 0) && (o2 = e.daddr, _3 = e.dport), o2 === void 0 || _3 === void 0) throw new FS.ErrnoError(17);
      } else o2 = e.daddr, _3 = e.dport;
      var s2 = SOCKFS.websocket_sock_ops.getPeer(e, o2, _3);
      if (e.type === 1 && (!s2 || s2.socket.readyState === s2.socket.CLOSING || s2.socket.readyState === s2.socket.CLOSED)) throw new FS.ErrnoError(53);
      ArrayBuffer.isView(t2) && (r += t2.byteOffset, t2 = t2.buffer);
      var n2 = t2.slice(r, r + a2);
      if (!s2 || s2.socket.readyState !== s2.socket.OPEN) return e.type === 2 && (!s2 || s2.socket.readyState === s2.socket.CLOSING || s2.socket.readyState === s2.socket.CLOSED) && (s2 = SOCKFS.websocket_sock_ops.createPeer(e, o2, _3)), s2.msg_send_queue.push(n2), a2;
      try {
        return s2.socket.send(n2), a2;
      } catch {
        throw new FS.ErrnoError(28);
      }
    }, recvmsg(e, t2) {
      if (e.type === 1 && e.server) throw new FS.ErrnoError(53);
      var r = e.recv_queue.shift();
      if (!r) {
        if (e.type === 1) {
          var a2 = SOCKFS.websocket_sock_ops.getPeer(e, e.daddr, e.dport);
          if (!a2) throw new FS.ErrnoError(53);
          if (a2.socket.readyState === a2.socket.CLOSING || a2.socket.readyState === a2.socket.CLOSED) return null;
          throw new FS.ErrnoError(6);
        }
        throw new FS.ErrnoError(6);
      }
      var o2 = r.data.byteLength || r.data.length, _3 = r.data.byteOffset || 0, s2 = r.data.buffer || r.data, n2 = Math.min(t2, o2), l2 = { buffer: new Uint8Array(s2, _3, n2), addr: r.addr, port: r.port };
      if (e.type === 1 && n2 < o2) {
        var d2 = o2 - n2;
        r.data = new Uint8Array(s2, _3 + n2, d2), e.recv_queue.unshift(r);
      }
      return l2;
    } } }, getSocketFromFD = (e) => {
      var t2 = SOCKFS.getSocket(e);
      if (!t2) throw new FS.ErrnoError(8);
      return t2;
    }, inetPton4 = (e) => {
      for (var t2 = e.split("."), r = 0; r < 4; r++) {
        var a2 = Number(t2[r]);
        if (isNaN(a2)) return null;
        t2[r] = a2;
      }
      return (t2[0] | t2[1] << 8 | t2[2] << 16 | t2[3] << 24) >>> 0;
    }, jstoi_q = (e) => parseInt(e), inetPton6 = (e) => {
      var t2, r, a2, o2, _3 = /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i, s2 = [];
      if (!_3.test(e)) return null;
      if (e === "::") return [0, 0, 0, 0, 0, 0, 0, 0];
      for (e.startsWith("::") ? e = e.replace("::", "Z:") : e = e.replace("::", ":Z:"), e.indexOf(".") > 0 ? (e = e.replace(new RegExp("[.]", "g"), ":"), t2 = e.split(":"), t2[t2.length - 4] = jstoi_q(t2[t2.length - 4]) + jstoi_q(t2[t2.length - 3]) * 256, t2[t2.length - 3] = jstoi_q(t2[t2.length - 2]) + jstoi_q(t2[t2.length - 1]) * 256, t2 = t2.slice(0, t2.length - 2)) : t2 = e.split(":"), a2 = 0, o2 = 0, r = 0; r < t2.length; r++) if (typeof t2[r] == "string") if (t2[r] === "Z") {
        for (o2 = 0; o2 < 8 - t2.length + 1; o2++) s2[r + o2] = 0;
        a2 = o2 - 1;
      } else s2[r + a2] = _htons(parseInt(t2[r], 16));
      else s2[r + a2] = t2[r];
      return [s2[1] << 16 | s2[0], s2[3] << 16 | s2[2], s2[5] << 16 | s2[4], s2[7] << 16 | s2[6]];
    }, writeSockaddr = (e, t2, r, a2, o2) => {
      switch (t2) {
        case 2:
          r = inetPton4(r), zeroMemory(e, 16), o2 && (HEAP32[o2 >> 2] = 16), HEAP16[e >> 1] = t2, HEAP32[e + 4 >> 2] = r, HEAP16[e + 2 >> 1] = _htons(a2);
          break;
        case 10:
          r = inetPton6(r), zeroMemory(e, 28), o2 && (HEAP32[o2 >> 2] = 28), HEAP32[e >> 2] = t2, HEAP32[e + 8 >> 2] = r[0], HEAP32[e + 12 >> 2] = r[1], HEAP32[e + 16 >> 2] = r[2], HEAP32[e + 20 >> 2] = r[3], HEAP16[e + 2 >> 1] = _htons(a2);
          break;
        default:
          return 5;
      }
      return 0;
    }, DNS = { address_map: { id: 1, addrs: {}, names: {} }, lookup_name(e) {
      var t2 = inetPton4(e);
      if (t2 !== null || (t2 = inetPton6(e), t2 !== null)) return e;
      var r;
      if (DNS.address_map.addrs[e]) r = DNS.address_map.addrs[e];
      else {
        var a2 = DNS.address_map.id++;
        assert(a2 < 65535, "exceeded max address mappings of 65535"), r = "172.29." + (a2 & 255) + "." + (a2 & 65280), DNS.address_map.names[r] = e, DNS.address_map.addrs[e] = r;
      }
      return r;
    }, lookup_addr(e) {
      return DNS.address_map.names[e] ? DNS.address_map.names[e] : null;
    } };
    function ___syscall_accept4(e, t2, r, a2, o2, _3) {
      try {
        var s2 = getSocketFromFD(e), n2 = s2.sock_ops.accept(s2);
        if (t2) var l2 = writeSockaddr(t2, n2.family, DNS.lookup_name(n2.daddr), n2.dport, r);
        return n2.stream.fd;
      } catch (d2) {
        if (typeof FS > "u" || d2.name !== "ErrnoError") throw d2;
        return -d2.errno;
      }
    }
    ___syscall_accept4.sig = "iippiii";
    var inetNtop4 = (e) => (e & 255) + "." + (e >> 8 & 255) + "." + (e >> 16 & 255) + "." + (e >> 24 & 255), inetNtop6 = (e) => {
      var t2 = "", r = 0, a2 = 0, o2 = 0, _3 = 0, s2 = 0, n2 = 0, l2 = [e[0] & 65535, e[0] >> 16, e[1] & 65535, e[1] >> 16, e[2] & 65535, e[2] >> 16, e[3] & 65535, e[3] >> 16], d2 = true, p2 = "";
      for (n2 = 0; n2 < 5; n2++) if (l2[n2] !== 0) {
        d2 = false;
        break;
      }
      if (d2) {
        if (p2 = inetNtop4(l2[6] | l2[7] << 16), l2[5] === -1) return t2 = "::ffff:", t2 += p2, t2;
        if (l2[5] === 0) return t2 = "::", p2 === "0.0.0.0" && (p2 = ""), p2 === "0.0.0.1" && (p2 = "1"), t2 += p2, t2;
      }
      for (r = 0; r < 8; r++) l2[r] === 0 && (r - o2 > 1 && (s2 = 0), o2 = r, s2++), s2 > a2 && (a2 = s2, _3 = r - a2 + 1);
      for (r = 0; r < 8; r++) {
        if (a2 > 1 && l2[r] === 0 && r >= _3 && r < _3 + a2) {
          r === _3 && (t2 += ":", _3 === 0 && (t2 += ":"));
          continue;
        }
        t2 += Number(_ntohs(l2[r] & 65535)).toString(16), t2 += r < 7 ? ":" : "";
      }
      return t2;
    }, readSockaddr = (e, t2) => {
      var r = HEAP16[e >> 1], a2 = _ntohs(HEAPU16[e + 2 >> 1]), o2;
      switch (r) {
        case 2:
          if (t2 !== 16) return { errno: 28 };
          o2 = HEAP32[e + 4 >> 2], o2 = inetNtop4(o2);
          break;
        case 10:
          if (t2 !== 28) return { errno: 28 };
          o2 = [HEAP32[e + 8 >> 2], HEAP32[e + 12 >> 2], HEAP32[e + 16 >> 2], HEAP32[e + 20 >> 2]], o2 = inetNtop6(o2);
          break;
        default:
          return { errno: 5 };
      }
      return { family: r, addr: o2, port: a2 };
    }, getSocketAddress = (e, t2) => {
      var r = readSockaddr(e, t2);
      if (r.errno) throw new FS.ErrnoError(r.errno);
      return r.addr = DNS.lookup_addr(r.addr) || r.addr, r;
    };
    function ___syscall_bind(e, t2, r, a2, o2, _3) {
      try {
        var s2 = getSocketFromFD(e), n2 = getSocketAddress(t2, r);
        return s2.sock_ops.bind(s2, n2.addr, n2.port), 0;
      } catch (l2) {
        if (typeof FS > "u" || l2.name !== "ErrnoError") throw l2;
        return -l2.errno;
      }
    }
    ___syscall_bind.sig = "iippiii";
    function ___syscall_chdir(e) {
      try {
        return e = SYSCALLS.getStr(e), FS.chdir(e), 0;
      } catch (t2) {
        if (typeof FS > "u" || t2.name !== "ErrnoError") throw t2;
        return -t2.errno;
      }
    }
    ___syscall_chdir.sig = "ip";
    function ___syscall_chmod(e, t2) {
      try {
        return e = SYSCALLS.getStr(e), FS.chmod(e, t2), 0;
      } catch (r) {
        if (typeof FS > "u" || r.name !== "ErrnoError") throw r;
        return -r.errno;
      }
    }
    ___syscall_chmod.sig = "ipi";
    function ___syscall_connect(e, t2, r, a2, o2, _3) {
      try {
        var s2 = getSocketFromFD(e), n2 = getSocketAddress(t2, r);
        return s2.sock_ops.connect(s2, n2.addr, n2.port), 0;
      } catch (l2) {
        if (typeof FS > "u" || l2.name !== "ErrnoError") throw l2;
        return -l2.errno;
      }
    }
    ___syscall_connect.sig = "iippiii";
    function ___syscall_dup(e) {
      try {
        var t2 = SYSCALLS.getStreamFromFD(e);
        return FS.dupStream(t2).fd;
      } catch (r) {
        if (typeof FS > "u" || r.name !== "ErrnoError") throw r;
        return -r.errno;
      }
    }
    ___syscall_dup.sig = "ii";
    function ___syscall_dup3(e, t2, r) {
      try {
        var a2 = SYSCALLS.getStreamFromFD(e);
        if (a2.fd === t2) return -28;
        if (t2 < 0 || t2 >= FS.MAX_OPEN_FDS) return -8;
        var o2 = FS.getStream(t2);
        return o2 && FS.close(o2), FS.dupStream(a2, t2).fd;
      } catch (_3) {
        if (typeof FS > "u" || _3.name !== "ErrnoError") throw _3;
        return -_3.errno;
      }
    }
    ___syscall_dup3.sig = "iiii";
    function ___syscall_faccessat(e, t2, r, a2) {
      try {
        if (t2 = SYSCALLS.getStr(t2), t2 = SYSCALLS.calculateAt(e, t2), r & -8) return -28;
        var o2 = FS.lookupPath(t2, { follow: true }), _3 = o2.node;
        if (!_3) return -44;
        var s2 = "";
        return r & 4 && (s2 += "r"), r & 2 && (s2 += "w"), r & 1 && (s2 += "x"), s2 && FS.nodePermissions(_3, s2) ? -2 : 0;
      } catch (n2) {
        if (typeof FS > "u" || n2.name !== "ErrnoError") throw n2;
        return -n2.errno;
      }
    }
    ___syscall_faccessat.sig = "iipii";
    var ___syscall_fadvise64 = (e, t2, r, a2) => 0;
    ___syscall_fadvise64.sig = "iijji";
    var INT53_MAX = 9007199254740992, INT53_MIN = -9007199254740992, bigintToI53Checked = (e) => e < INT53_MIN || e > INT53_MAX ? NaN : Number(e);
    function ___syscall_fallocate(e, t2, r, a2) {
      r = bigintToI53Checked(r), a2 = bigintToI53Checked(a2);
      try {
        if (isNaN(r)) return 61;
        var o2 = SYSCALLS.getStreamFromFD(e);
        return FS.allocate(o2, r, a2), 0;
      } catch (_3) {
        if (typeof FS > "u" || _3.name !== "ErrnoError") throw _3;
        return -_3.errno;
      }
    }
    ___syscall_fallocate.sig = "iiijj";
    function ___syscall_fchmod(e, t2) {
      try {
        return FS.fchmod(e, t2), 0;
      } catch (r) {
        if (typeof FS > "u" || r.name !== "ErrnoError") throw r;
        return -r.errno;
      }
    }
    ___syscall_fchmod.sig = "iii";
    function ___syscall_fchmodat2(e, t2, r, a2) {
      try {
        var o2 = a2 & 256;
        return t2 = SYSCALLS.getStr(t2), t2 = SYSCALLS.calculateAt(e, t2), FS.chmod(t2, r, o2), 0;
      } catch (_3) {
        if (typeof FS > "u" || _3.name !== "ErrnoError") throw _3;
        return -_3.errno;
      }
    }
    ___syscall_fchmodat2.sig = "iipii";
    function ___syscall_fchown32(e, t2, r) {
      try {
        return FS.fchown(e, t2, r), 0;
      } catch (a2) {
        if (typeof FS > "u" || a2.name !== "ErrnoError") throw a2;
        return -a2.errno;
      }
    }
    ___syscall_fchown32.sig = "iiii";
    function ___syscall_fchownat(e, t2, r, a2, o2) {
      try {
        t2 = SYSCALLS.getStr(t2);
        var _3 = o2 & 256;
        return o2 = o2 & -257, t2 = SYSCALLS.calculateAt(e, t2), (_3 ? FS.lchown : FS.chown)(t2, r, a2), 0;
      } catch (s2) {
        if (typeof FS > "u" || s2.name !== "ErrnoError") throw s2;
        return -s2.errno;
      }
    }
    ___syscall_fchownat.sig = "iipiii";
    var syscallGetVarargI = () => {
      var e = HEAP32[+SYSCALLS.varargs >> 2];
      return SYSCALLS.varargs += 4, e;
    }, syscallGetVarargP = syscallGetVarargI;
    function ___syscall_fcntl64(e, t2, r) {
      SYSCALLS.varargs = r;
      try {
        var a2 = SYSCALLS.getStreamFromFD(e);
        switch (t2) {
          case 0: {
            var o2 = syscallGetVarargI();
            if (o2 < 0) return -28;
            for (; FS.streams[o2]; ) o2++;
            var _3;
            return _3 = FS.dupStream(a2, o2), _3.fd;
          }
          case 1:
          case 2:
            return 0;
          case 3:
            return a2.flags;
          case 4: {
            var o2 = syscallGetVarargI();
            return a2.flags |= o2, 0;
          }
          case 12: {
            var o2 = syscallGetVarargP(), s2 = 0;
            return HEAP16[o2 + s2 >> 1] = 2, 0;
          }
          case 13:
          case 14:
            return 0;
        }
        return -28;
      } catch (n2) {
        if (typeof FS > "u" || n2.name !== "ErrnoError") throw n2;
        return -n2.errno;
      }
    }
    ___syscall_fcntl64.sig = "iiip";
    function ___syscall_fdatasync(e) {
      try {
        var t2 = SYSCALLS.getStreamFromFD(e);
        return 0;
      } catch (r) {
        if (typeof FS > "u" || r.name !== "ErrnoError") throw r;
        return -r.errno;
      }
    }
    ___syscall_fdatasync.sig = "ii";
    function ___syscall_fstat64(e, t2) {
      try {
        var r = SYSCALLS.getStreamFromFD(e);
        return SYSCALLS.doStat(FS.stat, r.path, t2);
      } catch (a2) {
        if (typeof FS > "u" || a2.name !== "ErrnoError") throw a2;
        return -a2.errno;
      }
    }
    ___syscall_fstat64.sig = "iip";
    function ___syscall_ftruncate64(e, t2) {
      t2 = bigintToI53Checked(t2);
      try {
        return isNaN(t2) ? 61 : (FS.ftruncate(e, t2), 0);
      } catch (r) {
        if (typeof FS > "u" || r.name !== "ErrnoError") throw r;
        return -r.errno;
      }
    }
    ___syscall_ftruncate64.sig = "iij";
    var stringToUTF8 = (e, t2, r) => stringToUTF8Array(e, HEAPU8, t2, r);
    function ___syscall_getcwd(e, t2) {
      try {
        if (t2 === 0) return -28;
        var r = FS.cwd(), a2 = lengthBytesUTF8(r) + 1;
        return t2 < a2 ? -68 : (stringToUTF8(r, e, t2), a2);
      } catch (o2) {
        if (typeof FS > "u" || o2.name !== "ErrnoError") throw o2;
        return -o2.errno;
      }
    }
    ___syscall_getcwd.sig = "ipp";
    function ___syscall_getdents64(e, t2, r) {
      try {
        var a2 = SYSCALLS.getStreamFromFD(e);
        a2.getdents || (a2.getdents = FS.readdir(a2.path));
        for (var o2 = 280, _3 = 0, s2 = FS.llseek(a2, 0, 1), n2 = Math.floor(s2 / o2), l2 = Math.min(a2.getdents.length, n2 + Math.floor(r / o2)), d2 = n2; d2 < l2; d2++) {
          var p2, m2, g2 = a2.getdents[d2];
          if (g2 === ".") p2 = a2.node.id, m2 = 4;
          else if (g2 === "..") {
            var u2 = FS.lookupPath(a2.path, { parent: true });
            p2 = u2.node.id, m2 = 4;
          } else {
            var f2;
            try {
              f2 = FS.lookupNode(a2.node, g2);
            } catch (c2) {
              if (c2?.errno === 28) continue;
              throw c2;
            }
            p2 = f2.id, m2 = FS.isChrdev(f2.mode) ? 2 : FS.isDir(f2.mode) ? 4 : FS.isLink(f2.mode) ? 10 : 8;
          }
          HEAP64[t2 + _3 >> 3] = BigInt(p2), HEAP64[t2 + _3 + 8 >> 3] = BigInt((d2 + 1) * o2), HEAP16[t2 + _3 + 16 >> 1] = 280, HEAP8[t2 + _3 + 18] = m2, stringToUTF8(g2, t2 + _3 + 19, 256), _3 += o2;
        }
        return FS.llseek(a2, d2 * o2, 0), _3;
      } catch (c2) {
        if (typeof FS > "u" || c2.name !== "ErrnoError") throw c2;
        return -c2.errno;
      }
    }
    ___syscall_getdents64.sig = "iipp";
    function ___syscall_ioctl(e, t2, r) {
      SYSCALLS.varargs = r;
      try {
        var a2 = SYSCALLS.getStreamFromFD(e);
        switch (t2) {
          case 21509:
            return a2.tty ? 0 : -59;
          case 21505: {
            if (!a2.tty) return -59;
            if (a2.tty.ops.ioctl_tcgets) {
              var o2 = a2.tty.ops.ioctl_tcgets(a2), _3 = syscallGetVarargP();
              HEAP32[_3 >> 2] = o2.c_iflag || 0, HEAP32[_3 + 4 >> 2] = o2.c_oflag || 0, HEAP32[_3 + 8 >> 2] = o2.c_cflag || 0, HEAP32[_3 + 12 >> 2] = o2.c_lflag || 0;
              for (var s2 = 0; s2 < 32; s2++) HEAP8[_3 + s2 + 17] = o2.c_cc[s2] || 0;
              return 0;
            }
            return 0;
          }
          case 21510:
          case 21511:
          case 21512:
            return a2.tty ? 0 : -59;
          case 21506:
          case 21507:
          case 21508: {
            if (!a2.tty) return -59;
            if (a2.tty.ops.ioctl_tcsets) {
              for (var _3 = syscallGetVarargP(), n2 = HEAP32[_3 >> 2], l2 = HEAP32[_3 + 4 >> 2], d2 = HEAP32[_3 + 8 >> 2], p2 = HEAP32[_3 + 12 >> 2], m2 = [], s2 = 0; s2 < 32; s2++) m2.push(HEAP8[_3 + s2 + 17]);
              return a2.tty.ops.ioctl_tcsets(a2.tty, t2, { c_iflag: n2, c_oflag: l2, c_cflag: d2, c_lflag: p2, c_cc: m2 });
            }
            return 0;
          }
          case 21519: {
            if (!a2.tty) return -59;
            var _3 = syscallGetVarargP();
            return HEAP32[_3 >> 2] = 0, 0;
          }
          case 21520:
            return a2.tty ? -28 : -59;
          case 21531: {
            var _3 = syscallGetVarargP();
            return FS.ioctl(a2, t2, _3);
          }
          case 21523: {
            if (!a2.tty) return -59;
            if (a2.tty.ops.ioctl_tiocgwinsz) {
              var g2 = a2.tty.ops.ioctl_tiocgwinsz(a2.tty), _3 = syscallGetVarargP();
              HEAP16[_3 >> 1] = g2[0], HEAP16[_3 + 2 >> 1] = g2[1];
            }
            return 0;
          }
          case 21524:
            return a2.tty ? 0 : -59;
          case 21515:
            return a2.tty ? 0 : -59;
          default:
            return -28;
        }
      } catch (u2) {
        if (typeof FS > "u" || u2.name !== "ErrnoError") throw u2;
        return -u2.errno;
      }
    }
    ___syscall_ioctl.sig = "iiip";
    function ___syscall_listen(e, t2) {
      try {
        var r = getSocketFromFD(e);
        return r.sock_ops.listen(r, t2), 0;
      } catch (a2) {
        if (typeof FS > "u" || a2.name !== "ErrnoError") throw a2;
        return -a2.errno;
      }
    }
    ___syscall_listen.sig = "iiiiiii";
    function ___syscall_lstat64(e, t2) {
      try {
        return e = SYSCALLS.getStr(e), SYSCALLS.doStat(FS.lstat, e, t2);
      } catch (r) {
        if (typeof FS > "u" || r.name !== "ErrnoError") throw r;
        return -r.errno;
      }
    }
    ___syscall_lstat64.sig = "ipp";
    function ___syscall_mkdirat(e, t2, r) {
      try {
        return t2 = SYSCALLS.getStr(t2), t2 = SYSCALLS.calculateAt(e, t2), FS.mkdir(t2, r, 0), 0;
      } catch (a2) {
        if (typeof FS > "u" || a2.name !== "ErrnoError") throw a2;
        return -a2.errno;
      }
    }
    ___syscall_mkdirat.sig = "iipi";
    function ___syscall_newfstatat(e, t2, r, a2) {
      try {
        t2 = SYSCALLS.getStr(t2);
        var o2 = a2 & 256, _3 = a2 & 4096;
        return a2 = a2 & -6401, t2 = SYSCALLS.calculateAt(e, t2, _3), SYSCALLS.doStat(o2 ? FS.lstat : FS.stat, t2, r);
      } catch (s2) {
        if (typeof FS > "u" || s2.name !== "ErrnoError") throw s2;
        return -s2.errno;
      }
    }
    ___syscall_newfstatat.sig = "iippi";
    function ___syscall_openat(e, t2, r, a2) {
      SYSCALLS.varargs = a2;
      try {
        t2 = SYSCALLS.getStr(t2), t2 = SYSCALLS.calculateAt(e, t2);
        var o2 = a2 ? syscallGetVarargI() : 0;
        return FS.open(t2, r, o2).fd;
      } catch (_3) {
        if (typeof FS > "u" || _3.name !== "ErrnoError") throw _3;
        return -_3.errno;
      }
    }
    ___syscall_openat.sig = "iipip";
    var PIPEFS = { BUCKET_BUFFER_SIZE: 8192, mount(e) {
      return FS.createNode(null, "/", 16895, 0);
    }, createPipe() {
      var e = { buckets: [], refcnt: 2 };
      e.buckets.push({ buffer: new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE), offset: 0, roffset: 0 });
      var t2 = PIPEFS.nextname(), r = PIPEFS.nextname(), a2 = FS.createNode(PIPEFS.root, t2, 4096, 0), o2 = FS.createNode(PIPEFS.root, r, 4096, 0);
      a2.pipe = e, o2.pipe = e;
      var _3 = FS.createStream({ path: t2, node: a2, flags: 0, seekable: false, stream_ops: PIPEFS.stream_ops });
      a2.stream = _3;
      var s2 = FS.createStream({ path: r, node: o2, flags: 1, seekable: false, stream_ops: PIPEFS.stream_ops });
      return o2.stream = s2, { readable_fd: _3.fd, writable_fd: s2.fd };
    }, stream_ops: { poll(e) {
      var t2 = e.node.pipe;
      if ((e.flags & 2097155) === 1) return 260;
      if (t2.buckets.length > 0) for (var r = 0; r < t2.buckets.length; r++) {
        var a2 = t2.buckets[r];
        if (a2.offset - a2.roffset > 0) return 65;
      }
      return 0;
    }, ioctl(e, t2, r) {
      return 28;
    }, fsync(e) {
      return 28;
    }, read(e, t2, r, a2, o2) {
      for (var _3 = e.node.pipe, s2 = 0, n2 = 0; n2 < _3.buckets.length; n2++) {
        var l2 = _3.buckets[n2];
        s2 += l2.offset - l2.roffset;
      }
      var d2 = t2.subarray(r, r + a2);
      if (a2 <= 0) return 0;
      if (s2 == 0) throw new FS.ErrnoError(6);
      for (var p2 = Math.min(s2, a2), m2 = p2, g2 = 0, n2 = 0; n2 < _3.buckets.length; n2++) {
        var u2 = _3.buckets[n2], f2 = u2.offset - u2.roffset;
        if (p2 <= f2) {
          var c2 = u2.buffer.subarray(u2.roffset, u2.offset);
          p2 < f2 ? (c2 = c2.subarray(0, p2), u2.roffset += p2) : g2++, d2.set(c2);
          break;
        } else {
          var c2 = u2.buffer.subarray(u2.roffset, u2.offset);
          d2.set(c2), d2 = d2.subarray(c2.byteLength), p2 -= c2.byteLength, g2++;
        }
      }
      return g2 && g2 == _3.buckets.length && (g2--, _3.buckets[g2].offset = 0, _3.buckets[g2].roffset = 0), _3.buckets.splice(0, g2), m2;
    }, write(e, t2, r, a2, o2) {
      var _3 = e.node.pipe, s2 = t2.subarray(r, r + a2), n2 = s2.byteLength;
      if (n2 <= 0) return 0;
      var l2 = null;
      _3.buckets.length == 0 ? (l2 = { buffer: new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE), offset: 0, roffset: 0 }, _3.buckets.push(l2)) : l2 = _3.buckets[_3.buckets.length - 1], assert(l2.offset <= PIPEFS.BUCKET_BUFFER_SIZE);
      var d2 = PIPEFS.BUCKET_BUFFER_SIZE - l2.offset;
      if (d2 >= n2) return l2.buffer.set(s2, l2.offset), l2.offset += n2, n2;
      d2 > 0 && (l2.buffer.set(s2.subarray(0, d2), l2.offset), l2.offset += d2, s2 = s2.subarray(d2, s2.byteLength));
      for (var p2 = s2.byteLength / PIPEFS.BUCKET_BUFFER_SIZE | 0, m2 = s2.byteLength % PIPEFS.BUCKET_BUFFER_SIZE, g2 = 0; g2 < p2; g2++) {
        var u2 = { buffer: new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE), offset: PIPEFS.BUCKET_BUFFER_SIZE, roffset: 0 };
        _3.buckets.push(u2), u2.buffer.set(s2.subarray(0, PIPEFS.BUCKET_BUFFER_SIZE)), s2 = s2.subarray(PIPEFS.BUCKET_BUFFER_SIZE, s2.byteLength);
      }
      if (m2 > 0) {
        var u2 = { buffer: new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE), offset: s2.byteLength, roffset: 0 };
        _3.buckets.push(u2), u2.buffer.set(s2);
      }
      return n2;
    }, close(e) {
      var t2 = e.node.pipe;
      t2.refcnt--, t2.refcnt === 0 && (t2.buckets = null);
    } }, nextname() {
      return PIPEFS.nextname.current || (PIPEFS.nextname.current = 0), "pipe[" + PIPEFS.nextname.current++ + "]";
    } };
    function ___syscall_pipe(e) {
      try {
        if (e == 0) throw new FS.ErrnoError(21);
        var t2 = PIPEFS.createPipe();
        return HEAP32[e >> 2] = t2.readable_fd, HEAP32[e + 4 >> 2] = t2.writable_fd, 0;
      } catch (r) {
        if (typeof FS > "u" || r.name !== "ErrnoError") throw r;
        return -r.errno;
      }
    }
    ___syscall_pipe.sig = "ip";
    function ___syscall_readlinkat(e, t2, r, a2) {
      try {
        if (t2 = SYSCALLS.getStr(t2), t2 = SYSCALLS.calculateAt(e, t2), a2 <= 0) return -28;
        var o2 = FS.readlink(t2), _3 = Math.min(a2, lengthBytesUTF8(o2)), s2 = HEAP8[r + _3];
        return stringToUTF8(o2, r, a2 + 1), HEAP8[r + _3] = s2, _3;
      } catch (n2) {
        if (typeof FS > "u" || n2.name !== "ErrnoError") throw n2;
        return -n2.errno;
      }
    }
    ___syscall_readlinkat.sig = "iippp";
    function ___syscall_recvfrom(e, t2, r, a2, o2, _3) {
      try {
        var s2 = getSocketFromFD(e), n2 = s2.sock_ops.recvmsg(s2, r);
        if (!n2) return 0;
        if (o2) var l2 = writeSockaddr(o2, s2.family, DNS.lookup_name(n2.addr), n2.port, _3);
        return HEAPU8.set(n2.buffer, t2), n2.buffer.byteLength;
      } catch (d2) {
        if (typeof FS > "u" || d2.name !== "ErrnoError") throw d2;
        return -d2.errno;
      }
    }
    ___syscall_recvfrom.sig = "iippipp";
    function ___syscall_renameat(e, t2, r, a2) {
      try {
        return t2 = SYSCALLS.getStr(t2), a2 = SYSCALLS.getStr(a2), t2 = SYSCALLS.calculateAt(e, t2), a2 = SYSCALLS.calculateAt(r, a2), FS.rename(t2, a2), 0;
      } catch (o2) {
        if (typeof FS > "u" || o2.name !== "ErrnoError") throw o2;
        return -o2.errno;
      }
    }
    ___syscall_renameat.sig = "iipip";
    function ___syscall_rmdir(e) {
      try {
        return e = SYSCALLS.getStr(e), FS.rmdir(e), 0;
      } catch (t2) {
        if (typeof FS > "u" || t2.name !== "ErrnoError") throw t2;
        return -t2.errno;
      }
    }
    ___syscall_rmdir.sig = "ip";
    function ___syscall_sendto(e, t2, r, a2, o2, _3) {
      try {
        var s2 = getSocketFromFD(e);
        if (!o2) return FS.write(s2.stream, HEAP8, t2, r);
        var n2 = getSocketAddress(o2, _3);
        return s2.sock_ops.sendmsg(s2, HEAP8, t2, r, n2.addr, n2.port);
      } catch (l2) {
        if (typeof FS > "u" || l2.name !== "ErrnoError") throw l2;
        return -l2.errno;
      }
    }
    ___syscall_sendto.sig = "iippipp";
    function ___syscall_socket(e, t2, r) {
      try {
        var a2 = SOCKFS.createSocket(e, t2, r);
        return a2.stream.fd;
      } catch (o2) {
        if (typeof FS > "u" || o2.name !== "ErrnoError") throw o2;
        return -o2.errno;
      }
    }
    ___syscall_socket.sig = "iiiiiii";
    function ___syscall_stat64(e, t2) {
      try {
        return e = SYSCALLS.getStr(e), SYSCALLS.doStat(FS.stat, e, t2);
      } catch (r) {
        if (typeof FS > "u" || r.name !== "ErrnoError") throw r;
        return -r.errno;
      }
    }
    ___syscall_stat64.sig = "ipp";
    function ___syscall_statfs64(e, t2, r) {
      try {
        var a2 = FS.statfs(SYSCALLS.getStr(e));
        return HEAP32[r + 4 >> 2] = a2.bsize, HEAP32[r + 40 >> 2] = a2.bsize, HEAP32[r + 8 >> 2] = a2.blocks, HEAP32[r + 12 >> 2] = a2.bfree, HEAP32[r + 16 >> 2] = a2.bavail, HEAP32[r + 20 >> 2] = a2.files, HEAP32[r + 24 >> 2] = a2.ffree, HEAP32[r + 28 >> 2] = a2.fsid, HEAP32[r + 44 >> 2] = a2.flags, HEAP32[r + 36 >> 2] = a2.namelen, 0;
      } catch (o2) {
        if (typeof FS > "u" || o2.name !== "ErrnoError") throw o2;
        return -o2.errno;
      }
    }
    ___syscall_statfs64.sig = "ippp";
    function ___syscall_symlinkat(e, t2, r) {
      try {
        return e = SYSCALLS.getStr(e), r = SYSCALLS.getStr(r), r = SYSCALLS.calculateAt(t2, r), FS.symlink(e, r), 0;
      } catch (a2) {
        if (typeof FS > "u" || a2.name !== "ErrnoError") throw a2;
        return -a2.errno;
      }
    }
    ___syscall_symlinkat.sig = "ipip";
    function ___syscall_truncate64(e, t2) {
      t2 = bigintToI53Checked(t2);
      try {
        return isNaN(t2) ? 61 : (e = SYSCALLS.getStr(e), FS.truncate(e, t2), 0);
      } catch (r) {
        if (typeof FS > "u" || r.name !== "ErrnoError") throw r;
        return -r.errno;
      }
    }
    ___syscall_truncate64.sig = "ipj";
    function ___syscall_unlinkat(e, t2, r) {
      try {
        return t2 = SYSCALLS.getStr(t2), t2 = SYSCALLS.calculateAt(e, t2), r === 0 ? FS.unlink(t2) : r === 512 ? FS.rmdir(t2) : abort("Invalid flags passed to unlinkat"), 0;
      } catch (a2) {
        if (typeof FS > "u" || a2.name !== "ErrnoError") throw a2;
        return -a2.errno;
      }
    }
    ___syscall_unlinkat.sig = "iipi";
    var readI53FromI64 = (e) => HEAPU32[e >> 2] + HEAP32[e + 4 >> 2] * 4294967296;
    function ___syscall_utimensat(e, t2, r, a2) {
      try {
        t2 = SYSCALLS.getStr(t2), t2 = SYSCALLS.calculateAt(e, t2, true);
        var o2 = Date.now(), _3, s2;
        if (!r) _3 = o2, s2 = o2;
        else {
          var n2 = readI53FromI64(r), l2 = HEAP32[r + 8 >> 2];
          l2 == 1073741823 ? _3 = o2 : l2 == 1073741822 ? _3 = null : _3 = n2 * 1e3 + l2 / 1e6, r += 16, n2 = readI53FromI64(r), l2 = HEAP32[r + 8 >> 2], l2 == 1073741823 ? s2 = o2 : l2 == 1073741822 ? s2 = null : s2 = n2 * 1e3 + l2 / 1e6;
        }
        return (s2 ?? _3) !== null && FS.utime(t2, _3, s2), 0;
      } catch (d2) {
        if (typeof FS > "u" || d2.name !== "ErrnoError") throw d2;
        return -d2.errno;
      }
    }
    ___syscall_utimensat.sig = "iippi";
    var ___table_base = new WebAssembly.Global({ value: "i32", mutable: false }, 1);
    Module.___table_base = ___table_base;
    var __abort_js = () => abort("");
    __abort_js.sig = "v";
    var ENV = {}, stackAlloc = (e) => __emscripten_stack_alloc(e), stringToUTF8OnStack = (e) => {
      var t2 = lengthBytesUTF8(e) + 1, r = stackAlloc(t2);
      return stringToUTF8(e, r, t2), r;
    }, dlSetError = (e) => {
      var t2 = stackSave(), r = stringToUTF8OnStack(e);
      ___dl_seterr(r, 0), stackRestore(t2);
    }, dlopenInternal = (e, t2) => {
      var r = UTF8ToString(e + 36), a2 = HEAP32[e + 4 >> 2];
      r = PATH.normalize(r);
      var o2 = !!(a2 & 256), _3 = o2 ? null : {}, s2 = { global: o2, nodelete: !!(a2 & 4096), loadAsync: t2.loadAsync };
      try {
        return loadDynamicLibrary(r, s2, _3, e);
      } catch (n2) {
        return dlSetError(`Could not load dynamic lib: ${r}
${n2}`), 0;
      }
    }, __dlopen_js = (e) => dlopenInternal(e, { loadAsync: false });
    __dlopen_js.sig = "pp";
    var __dlsym_js = (e, t2, r) => {
      t2 = UTF8ToString(t2);
      var a2, o2, _3 = LDSO.loadedLibsByHandle[e];
      if (!_3.exports.hasOwnProperty(t2) || _3.exports[t2].stub) return dlSetError(`Tried to lookup unknown symbol "${t2}" in dynamic lib: ${_3.name}`), 0;
      if (o2 = Object.keys(_3.exports).indexOf(t2), a2 = _3.exports[t2], typeof a2 == "function") {
        var s2 = getFunctionAddress(a2);
        s2 ? a2 = s2 : (a2 = addFunction(a2, a2.sig), HEAPU32[r >> 2] = o2);
      }
      return a2;
    };
    __dlsym_js.sig = "pppp";
    var runtimeKeepaliveCounter = 0, __emscripten_runtime_keepalive_clear = () => {
      noExitRuntime = false, runtimeKeepaliveCounter = 0;
    };
    __emscripten_runtime_keepalive_clear.sig = "v";
    var __emscripten_throw_longjmp = () => {
      throw 1 / 0;
    };
    __emscripten_throw_longjmp.sig = "v";
    function __gmtime_js(e, t2) {
      e = bigintToI53Checked(e);
      var r = new Date(e * 1e3);
      HEAP32[t2 >> 2] = r.getUTCSeconds(), HEAP32[t2 + 4 >> 2] = r.getUTCMinutes(), HEAP32[t2 + 8 >> 2] = r.getUTCHours(), HEAP32[t2 + 12 >> 2] = r.getUTCDate(), HEAP32[t2 + 16 >> 2] = r.getUTCMonth(), HEAP32[t2 + 20 >> 2] = r.getUTCFullYear() - 1900, HEAP32[t2 + 24 >> 2] = r.getUTCDay();
      var a2 = Date.UTC(r.getUTCFullYear(), 0, 1, 0, 0, 0, 0), o2 = (r.getTime() - a2) / (1e3 * 60 * 60 * 24) | 0;
      HEAP32[t2 + 28 >> 2] = o2;
    }
    __gmtime_js.sig = "vjp";
    var isLeapYear = (e) => e % 4 === 0 && (e % 100 !== 0 || e % 400 === 0), MONTH_DAYS_LEAP_CUMULATIVE = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], MONTH_DAYS_REGULAR_CUMULATIVE = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], ydayFromDate = (e) => {
      var t2 = isLeapYear(e.getFullYear()), r = t2 ? MONTH_DAYS_LEAP_CUMULATIVE : MONTH_DAYS_REGULAR_CUMULATIVE, a2 = r[e.getMonth()] + e.getDate() - 1;
      return a2;
    };
    function __localtime_js(e, t2) {
      e = bigintToI53Checked(e);
      var r = new Date(e * 1e3);
      HEAP32[t2 >> 2] = r.getSeconds(), HEAP32[t2 + 4 >> 2] = r.getMinutes(), HEAP32[t2 + 8 >> 2] = r.getHours(), HEAP32[t2 + 12 >> 2] = r.getDate(), HEAP32[t2 + 16 >> 2] = r.getMonth(), HEAP32[t2 + 20 >> 2] = r.getFullYear() - 1900, HEAP32[t2 + 24 >> 2] = r.getDay();
      var a2 = ydayFromDate(r) | 0;
      HEAP32[t2 + 28 >> 2] = a2, HEAP32[t2 + 36 >> 2] = -(r.getTimezoneOffset() * 60);
      var o2 = new Date(r.getFullYear(), 0, 1), _3 = new Date(r.getFullYear(), 6, 1).getTimezoneOffset(), s2 = o2.getTimezoneOffset(), n2 = (_3 != s2 && r.getTimezoneOffset() == Math.min(s2, _3)) | 0;
      HEAP32[t2 + 32 >> 2] = n2;
    }
    __localtime_js.sig = "vjp";
    function __mmap_js(e, t2, r, a2, o2, _3, s2) {
      o2 = bigintToI53Checked(o2);
      try {
        if (isNaN(o2)) return 61;
        var n2 = SYSCALLS.getStreamFromFD(a2), l2 = FS.mmap(n2, e, o2, t2, r), d2 = l2.ptr;
        return HEAP32[_3 >> 2] = l2.allocated, HEAPU32[s2 >> 2] = d2, 0;
      } catch (p2) {
        if (typeof FS > "u" || p2.name !== "ErrnoError") throw p2;
        return -p2.errno;
      }
    }
    __mmap_js.sig = "ipiiijpp";
    function __munmap_js(e, t2, r, a2, o2, _3) {
      _3 = bigintToI53Checked(_3);
      try {
        var s2 = SYSCALLS.getStreamFromFD(o2);
        r & 2 && SYSCALLS.doMsync(e, s2, t2, a2, _3);
      } catch (n2) {
        if (typeof FS > "u" || n2.name !== "ErrnoError") throw n2;
        return -n2.errno;
      }
    }
    __munmap_js.sig = "ippiiij";
    var timers = {}, handleException = (e) => {
      if (e instanceof ExitStatus || e == "unwind") return EXITSTATUS;
      quit_(1, e);
    }, keepRuntimeAlive = () => noExitRuntime || runtimeKeepaliveCounter > 0, _proc_exit = (e) => {
      EXITSTATUS = e, keepRuntimeAlive() || (Module.onExit?.(e), ABORT = true), quit_(e, new ExitStatus(e));
    };
    _proc_exit.sig = "vi";
    var exitJS = (e, t2) => {
      EXITSTATUS = e, keepRuntimeAlive() || exitRuntime(), _proc_exit(e);
    }, _exit = exitJS;
    Module._exit = _exit, _exit.sig = "vi";
    var maybeExit = () => {
      if (!runtimeExited && !keepRuntimeAlive()) try {
        _exit(EXITSTATUS);
      } catch (e) {
        handleException(e);
      }
    }, callUserCallback = (e) => {
      if (!(runtimeExited || ABORT)) try {
        e(), maybeExit();
      } catch (t2) {
        handleException(t2);
      }
    }, _emscripten_get_now = () => performance.now();
    _emscripten_get_now.sig = "d";
    var __setitimer_js = (e, t2) => {
      if (timers[e] && (clearTimeout(timers[e].id), delete timers[e]), !t2) return 0;
      var r = setTimeout(() => {
        delete timers[e], callUserCallback(() => __emscripten_timeout(e, _emscripten_get_now()));
      }, t2);
      return timers[e] = { id: r, timeout_ms: t2 }, 0;
    };
    __setitimer_js.sig = "iid";
    var __tzset_js = (e, t2, r, a2) => {
      var o2 = (/* @__PURE__ */ new Date()).getFullYear(), _3 = new Date(o2, 0, 1), s2 = new Date(o2, 6, 1), n2 = _3.getTimezoneOffset(), l2 = s2.getTimezoneOffset(), d2 = Math.max(n2, l2);
      HEAPU32[e >> 2] = d2 * 60, HEAP32[t2 >> 2] = +(n2 != l2);
      var p2 = (u2) => {
        var f2 = u2 >= 0 ? "-" : "+", c2 = Math.abs(u2), w2 = String(Math.floor(c2 / 60)).padStart(2, "0"), S2 = String(c2 % 60).padStart(2, "0");
        return `UTC${f2}${w2}${S2}`;
      }, m2 = p2(n2), g2 = p2(l2);
      l2 < n2 ? (stringToUTF8(m2, r, 17), stringToUTF8(g2, a2, 17)) : (stringToUTF8(m2, a2, 17), stringToUTF8(g2, r, 17));
    };
    __tzset_js.sig = "vpppp";
    var _emscripten_date_now = () => Date.now();
    _emscripten_date_now.sig = "d";
    var checkWasiClock = (e) => e >= 0 && e <= 3;
    function _clock_time_get(e, t2, r) {
      if (!checkWasiClock(e)) return 28;
      var a2;
      if (e === 0) a2 = _emscripten_date_now();
      else a2 = _emscripten_get_now();
      var o2 = Math.round(a2 * 1e3 * 1e3);
      return HEAP64[r >> 3] = BigInt(o2), 0;
    }
    _clock_time_get.sig = "iijp";
    var runtimeKeepalivePush = () => {
      runtimeKeepaliveCounter += 1;
    };
    runtimeKeepalivePush.sig = "v";
    var _emscripten_exit_with_live_runtime = () => {
      throw runtimeKeepalivePush(), "unwind";
    };
    _emscripten_exit_with_live_runtime.sig = "v";
    var getHeapMax = () => 2147483648, _emscripten_get_heap_max = () => getHeapMax();
    _emscripten_get_heap_max.sig = "p";
    var growMemory = (e) => {
      var t2 = wasmMemory.buffer, r = (e - t2.byteLength + 65535) / 65536 | 0;
      try {
        return wasmMemory.grow(r), updateMemoryViews(), 1;
      } catch {
      }
    }, _emscripten_resize_heap = (e) => {
      var t2 = HEAPU8.length;
      e >>>= 0;
      var r = getHeapMax();
      if (e > r) return false;
      for (var a2 = 1; a2 <= 4; a2 *= 2) {
        var o2 = t2 * (1 + 0.2 / a2);
        o2 = Math.min(o2, e + 100663296);
        var _3 = Math.min(r, alignMemory(Math.max(e, o2), 65536)), s2 = growMemory(_3);
        if (s2) return true;
      }
      return false;
    };
    _emscripten_resize_heap.sig = "ip";
    var getExecutableName = () => thisProgram || "./this.program", getEnvStrings = () => {
      if (!getEnvStrings.strings) {
        var e = (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", t2 = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: e, _: getExecutableName() };
        for (var r in ENV) ENV[r] === void 0 ? delete t2[r] : t2[r] = ENV[r];
        var a2 = [];
        for (var r in t2) a2.push(`${r}=${t2[r]}`);
        getEnvStrings.strings = a2;
      }
      return getEnvStrings.strings;
    }, stringToAscii = (e, t2) => {
      for (var r = 0; r < e.length; ++r) HEAP8[t2++] = e.charCodeAt(r);
      HEAP8[t2] = 0;
    }, _environ_get = (e, t2) => {
      var r = 0;
      return getEnvStrings().forEach((a2, o2) => {
        var _3 = t2 + r;
        HEAPU32[e + o2 * 4 >> 2] = _3, stringToAscii(a2, _3), r += a2.length + 1;
      }), 0;
    };
    _environ_get.sig = "ipp";
    var _environ_sizes_get = (e, t2) => {
      var r = getEnvStrings();
      HEAPU32[e >> 2] = r.length;
      var a2 = 0;
      return r.forEach((o2) => a2 += o2.length + 1), HEAPU32[t2 >> 2] = a2, 0;
    };
    _environ_sizes_get.sig = "ipp";
    function _fd_close(e) {
      try {
        var t2 = SYSCALLS.getStreamFromFD(e);
        return FS.close(t2), 0;
      } catch (r) {
        if (typeof FS > "u" || r.name !== "ErrnoError") throw r;
        return r.errno;
      }
    }
    _fd_close.sig = "ii";
    function _fd_fdstat_get(e, t2) {
      try {
        var r = 0, a2 = 0, o2 = 0, _3 = SYSCALLS.getStreamFromFD(e), s2 = _3.tty ? 2 : FS.isDir(_3.mode) ? 3 : FS.isLink(_3.mode) ? 7 : 4;
        return HEAP8[t2] = s2, HEAP16[t2 + 2 >> 1] = o2, HEAP64[t2 + 8 >> 3] = BigInt(r), HEAP64[t2 + 16 >> 3] = BigInt(a2), 0;
      } catch (n2) {
        if (typeof FS > "u" || n2.name !== "ErrnoError") throw n2;
        return n2.errno;
      }
    }
    _fd_fdstat_get.sig = "iip";
    var doReadv = (e, t2, r, a2) => {
      for (var o2 = 0, _3 = 0; _3 < r; _3++) {
        var s2 = HEAPU32[t2 >> 2], n2 = HEAPU32[t2 + 4 >> 2];
        t2 += 8;
        var l2 = FS.read(e, HEAP8, s2, n2, a2);
        if (l2 < 0) return -1;
        if (o2 += l2, l2 < n2) break;
        typeof a2 < "u" && (a2 += l2);
      }
      return o2;
    };
    function _fd_pread(e, t2, r, a2, o2) {
      a2 = bigintToI53Checked(a2);
      try {
        if (isNaN(a2)) return 61;
        var _3 = SYSCALLS.getStreamFromFD(e), s2 = doReadv(_3, t2, r, a2);
        return HEAPU32[o2 >> 2] = s2, 0;
      } catch (n2) {
        if (typeof FS > "u" || n2.name !== "ErrnoError") throw n2;
        return n2.errno;
      }
    }
    _fd_pread.sig = "iippjp";
    var doWritev = (e, t2, r, a2) => {
      for (var o2 = 0, _3 = 0; _3 < r; _3++) {
        var s2 = HEAPU32[t2 >> 2], n2 = HEAPU32[t2 + 4 >> 2];
        t2 += 8;
        var l2 = FS.write(e, HEAP8, s2, n2, a2);
        if (l2 < 0) return -1;
        if (o2 += l2, l2 < n2) break;
        typeof a2 < "u" && (a2 += l2);
      }
      return o2;
    };
    function _fd_pwrite(e, t2, r, a2, o2) {
      a2 = bigintToI53Checked(a2);
      try {
        if (isNaN(a2)) return 61;
        var _3 = SYSCALLS.getStreamFromFD(e), s2 = doWritev(_3, t2, r, a2);
        return HEAPU32[o2 >> 2] = s2, 0;
      } catch (n2) {
        if (typeof FS > "u" || n2.name !== "ErrnoError") throw n2;
        return n2.errno;
      }
    }
    _fd_pwrite.sig = "iippjp";
    function _fd_read(e, t2, r, a2) {
      try {
        var o2 = SYSCALLS.getStreamFromFD(e), _3 = doReadv(o2, t2, r);
        return HEAPU32[a2 >> 2] = _3, 0;
      } catch (s2) {
        if (typeof FS > "u" || s2.name !== "ErrnoError") throw s2;
        return s2.errno;
      }
    }
    _fd_read.sig = "iippp";
    function _fd_seek(e, t2, r, a2) {
      t2 = bigintToI53Checked(t2);
      try {
        if (isNaN(t2)) return 61;
        var o2 = SYSCALLS.getStreamFromFD(e);
        return FS.llseek(o2, t2, r), HEAP64[a2 >> 3] = BigInt(o2.position), o2.getdents && t2 === 0 && r === 0 && (o2.getdents = null), 0;
      } catch (_3) {
        if (typeof FS > "u" || _3.name !== "ErrnoError") throw _3;
        return _3.errno;
      }
    }
    _fd_seek.sig = "iijip";
    function _fd_sync(e) {
      try {
        var t2 = SYSCALLS.getStreamFromFD(e);
        return t2.stream_ops?.fsync ? t2.stream_ops.fsync(t2) : 0;
      } catch (r) {
        if (typeof FS > "u" || r.name !== "ErrnoError") throw r;
        return r.errno;
      }
    }
    _fd_sync.sig = "ii";
    function _fd_write(e, t2, r, a2) {
      try {
        var o2 = SYSCALLS.getStreamFromFD(e), _3 = doWritev(o2, t2, r);
        return HEAPU32[a2 >> 2] = _3, 0;
      } catch (s2) {
        if (typeof FS > "u" || s2.name !== "ErrnoError") throw s2;
        return s2.errno;
      }
    }
    _fd_write.sig = "iippp";
    var _getaddrinfo = (e, t2, r, a2) => {
      var o2 = 0, _3 = 0, s2 = 0, n2 = 0, l2 = 0, d2 = 0, p2;
      function m2(g2, u2, f2, c2, w2, S2) {
        var k2, E2, y2, M;
        return E2 = g2 === 10 ? 28 : 16, w2 = g2 === 10 ? inetNtop6(w2) : inetNtop4(w2), k2 = _malloc(E2), M = writeSockaddr(k2, g2, w2, S2), assert(!M), y2 = _malloc(32), HEAP32[y2 + 4 >> 2] = g2, HEAP32[y2 + 8 >> 2] = u2, HEAP32[y2 + 12 >> 2] = f2, HEAPU32[y2 + 24 >> 2] = c2, HEAPU32[y2 + 20 >> 2] = k2, g2 === 10 ? HEAP32[y2 + 16 >> 2] = 28 : HEAP32[y2 + 16 >> 2] = 16, HEAP32[y2 + 28 >> 2] = 0, y2;
      }
      if (r && (s2 = HEAP32[r >> 2], n2 = HEAP32[r + 4 >> 2], l2 = HEAP32[r + 8 >> 2], d2 = HEAP32[r + 12 >> 2]), l2 && !d2 && (d2 = l2 === 2 ? 17 : 6), !l2 && d2 && (l2 = d2 === 17 ? 2 : 1), d2 === 0 && (d2 = 6), l2 === 0 && (l2 = 1), !e && !t2) return -2;
      if (s2 & -1088 || r !== 0 && HEAP32[r >> 2] & 2 && !e) return -1;
      if (s2 & 32) return -2;
      if (l2 !== 0 && l2 !== 1 && l2 !== 2) return -7;
      if (n2 !== 0 && n2 !== 2 && n2 !== 10) return -6;
      if (t2 && (t2 = UTF8ToString(t2), _3 = parseInt(t2, 10), isNaN(_3))) return s2 & 1024 ? -2 : -8;
      if (!e) return n2 === 0 && (n2 = 2), s2 & 1 || (n2 === 2 ? o2 = _htonl(2130706433) : o2 = [0, 0, 0, _htonl(1)]), p2 = m2(n2, l2, d2, null, o2, _3), HEAPU32[a2 >> 2] = p2, 0;
      if (e = UTF8ToString(e), o2 = inetPton4(e), o2 !== null) if (n2 === 0 || n2 === 2) n2 = 2;
      else if (n2 === 10 && s2 & 8) o2 = [0, 0, _htonl(65535), o2], n2 = 10;
      else return -2;
      else if (o2 = inetPton6(e), o2 !== null) if (n2 === 0 || n2 === 10) n2 = 10;
      else return -2;
      return o2 != null ? (p2 = m2(n2, l2, d2, e, o2, _3), HEAPU32[a2 >> 2] = p2, 0) : s2 & 4 ? -2 : (e = DNS.lookup_name(e), o2 = inetPton4(e), n2 === 0 ? n2 = 2 : n2 === 10 && (o2 = [0, 0, _htonl(65535), o2]), p2 = m2(n2, l2, d2, null, o2, _3), HEAPU32[a2 >> 2] = p2, 0);
    };
    _getaddrinfo.sig = "ipppp";
    var _getnameinfo = (e, t2, r, a2, o2, _3, s2) => {
      var n2 = readSockaddr(e, t2);
      if (n2.errno) return -6;
      var l2 = n2.port, d2 = n2.addr, p2 = false;
      if (r && a2) {
        var m2;
        if (s2 & 1 || !(m2 = DNS.lookup_addr(d2))) {
          if (s2 & 8) return -2;
        } else d2 = m2;
        var g2 = stringToUTF8(d2, r, a2);
        g2 + 1 >= a2 && (p2 = true);
      }
      if (o2 && _3) {
        l2 = "" + l2;
        var g2 = stringToUTF8(l2, o2, _3);
        g2 + 1 >= _3 && (p2 = true);
      }
      return p2 ? -12 : 0;
    };
    _getnameinfo.sig = "ipipipii";
    function _random_get(e, t2) {
      try {
        return randomFill(HEAPU8.subarray(e, e + t2)), 0;
      } catch (r) {
        if (typeof FS > "u" || r.name !== "ErrnoError") throw r;
        return r.errno;
      }
    }
    _random_get.sig = "ipp";
    var stringToNewUTF8 = (e) => {
      var t2 = lengthBytesUTF8(e) + 1, r = _malloc(t2);
      return r && stringToUTF8(e, r, t2), r;
    }, removeFunction = (e) => {
      functionsInTableMap.delete(getWasmTableEntry(e)), setWasmTableEntry(e, null), freeTableIndexes.push(e);
    }, FS_createPath = FS.createPath, FS_unlink = (e) => FS.unlink(e), FS_createLazyFile = FS.createLazyFile, FS_createDevice = FS.createDevice, setTempRet0 = (e) => __emscripten_tempret_set(e), _setTempRet0 = setTempRet0;
    Module._setTempRet0 = _setTempRet0;
    var getTempRet0 = (e) => __emscripten_tempret_get(), _getTempRet0 = getTempRet0;
    Module._getTempRet0 = _getTempRet0;
    var _emscripten_force_exit = (e) => {
      __emscripten_runtime_keepalive_clear(), _exit(e);
    };
    Module._emscripten_force_exit = _emscripten_force_exit, _emscripten_force_exit.sig = "vi";
    var _sched_yield = () => 0;
    Module._sched_yield = _sched_yield, _sched_yield.sig = "i";
    var exceptionLast = 0;
    class ExceptionInfo {
      constructor(t2) {
        this.excPtr = t2, this.ptr = t2 - 24;
      }
      set_type(t2) {
        HEAPU32[this.ptr + 4 >> 2] = t2;
      }
      get_type() {
        return HEAPU32[this.ptr + 4 >> 2];
      }
      set_destructor(t2) {
        HEAPU32[this.ptr + 8 >> 2] = t2;
      }
      get_destructor() {
        return HEAPU32[this.ptr + 8 >> 2];
      }
      set_caught(t2) {
        t2 = t2 ? 1 : 0, HEAP8[this.ptr + 12] = t2;
      }
      get_caught() {
        return HEAP8[this.ptr + 12] != 0;
      }
      set_rethrown(t2) {
        t2 = t2 ? 1 : 0, HEAP8[this.ptr + 13] = t2;
      }
      get_rethrown() {
        return HEAP8[this.ptr + 13] != 0;
      }
      init(t2, r) {
        this.set_adjusted_ptr(0), this.set_type(t2), this.set_destructor(r);
      }
      set_adjusted_ptr(t2) {
        HEAPU32[this.ptr + 16 >> 2] = t2;
      }
      get_adjusted_ptr() {
        return HEAPU32[this.ptr + 16 >> 2];
      }
    }
    var ___resumeException = (e) => {
      throw exceptionLast || (exceptionLast = e), exceptionLast;
    };
    Module.___resumeException = ___resumeException, ___resumeException.sig = "vp";
    var findMatchingCatch = (e) => {
      var t2 = exceptionLast;
      if (!t2) return setTempRet0(0), 0;
      var r = new ExceptionInfo(t2);
      r.set_adjusted_ptr(t2);
      var a2 = r.get_type();
      if (!a2) return setTempRet0(0), t2;
      for (var o2 of e) {
        if (o2 === 0 || o2 === a2) break;
        var _3 = r.ptr + 16;
        if (___cxa_can_catch(o2, a2, _3)) return setTempRet0(o2), t2;
      }
      return setTempRet0(a2), t2;
    }, ___cxa_find_matching_catch_2 = () => findMatchingCatch([]);
    Module.___cxa_find_matching_catch_2 = ___cxa_find_matching_catch_2, ___cxa_find_matching_catch_2.sig = "p";
    var ___cxa_find_matching_catch_3 = (e) => findMatchingCatch([e]);
    Module.___cxa_find_matching_catch_3 = ___cxa_find_matching_catch_3, ___cxa_find_matching_catch_3.sig = "pp";
    var uncaughtExceptionCount = 0, ___cxa_throw = (e, t2, r) => {
      var a2 = new ExceptionInfo(e);
      throw a2.init(t2, r), exceptionLast = e, uncaughtExceptionCount++, exceptionLast;
    };
    Module.___cxa_throw = ___cxa_throw, ___cxa_throw.sig = "vppp";
    var exceptionCaught = [], ___cxa_rethrow = () => {
      var e = exceptionCaught.pop();
      e || abort("no exception to throw");
      var t2 = e.excPtr;
      throw e.get_rethrown() || (exceptionCaught.push(e), e.set_rethrown(true), e.set_caught(false), uncaughtExceptionCount++), exceptionLast = t2, exceptionLast;
    };
    Module.___cxa_rethrow = ___cxa_rethrow, ___cxa_rethrow.sig = "v";
    var ___cxa_begin_catch = (e) => {
      var t2 = new ExceptionInfo(e);
      return t2.get_caught() || (t2.set_caught(true), uncaughtExceptionCount--), t2.set_rethrown(false), exceptionCaught.push(t2), ___cxa_increment_exception_refcount(e), ___cxa_get_exception_ptr(e);
    };
    Module.___cxa_begin_catch = ___cxa_begin_catch, ___cxa_begin_catch.sig = "pp";
    var ___cxa_end_catch = () => {
      _setThrew(0, 0);
      var e = exceptionCaught.pop();
      ___cxa_decrement_exception_refcount(e.excPtr), exceptionLast = 0;
    };
    Module.___cxa_end_catch = ___cxa_end_catch, ___cxa_end_catch.sig = "v";
    var ___cxa_uncaught_exceptions = () => uncaughtExceptionCount;
    Module.___cxa_uncaught_exceptions = ___cxa_uncaught_exceptions, ___cxa_uncaught_exceptions.sig = "i";
    var ___cxa_current_primary_exception = () => {
      if (!exceptionCaught.length) return 0;
      var e = exceptionCaught[exceptionCaught.length - 1];
      return ___cxa_increment_exception_refcount(e.excPtr), e.excPtr;
    };
    Module.___cxa_current_primary_exception = ___cxa_current_primary_exception, ___cxa_current_primary_exception.sig = "p";
    var ___cxa_rethrow_primary_exception = (e) => {
      if (e) {
        var t2 = new ExceptionInfo(e);
        exceptionCaught.push(t2), t2.set_rethrown(true), ___cxa_rethrow();
      }
    };
    Module.___cxa_rethrow_primary_exception = ___cxa_rethrow_primary_exception, ___cxa_rethrow_primary_exception.sig = "vp", registerWasmPlugin(), FS.createPreloadedFile = FS_createPreloadedFile, FS.staticInit(), Module.FS_createPath = FS.createPath, Module.FS_createDataFile = FS.createDataFile, Module.FS_createPreloadedFile = FS.createPreloadedFile, Module.FS_unlink = FS.unlink, Module.FS_createLazyFile = FS.createLazyFile, Module.FS_createDevice = FS.createDevice, MEMFS.doesNotExistError = new FS.ErrnoError(44), MEMFS.doesNotExistError.stack = "<generic error, no stack>", ENVIRONMENT_IS_NODE && NODEFS.staticInit();
    var wasmImports = { __assert_fail: ___assert_fail, __call_sighandler: ___call_sighandler, __cxa_begin_catch: ___cxa_begin_catch, __cxa_current_primary_exception: ___cxa_current_primary_exception, __cxa_end_catch: ___cxa_end_catch, __cxa_find_matching_catch_2: ___cxa_find_matching_catch_2, __cxa_find_matching_catch_3: ___cxa_find_matching_catch_3, __cxa_rethrow: ___cxa_rethrow, __cxa_rethrow_primary_exception: ___cxa_rethrow_primary_exception, __cxa_throw: ___cxa_throw, __cxa_uncaught_exceptions: ___cxa_uncaught_exceptions, __heap_base: ___heap_base, __indirect_function_table: wasmTable, __memory_base: ___memory_base, __resumeException: ___resumeException, __stack_pointer: ___stack_pointer, __syscall__newselect: ___syscall__newselect, __syscall_accept4: ___syscall_accept4, __syscall_bind: ___syscall_bind, __syscall_chdir: ___syscall_chdir, __syscall_chmod: ___syscall_chmod, __syscall_connect: ___syscall_connect, __syscall_dup: ___syscall_dup, __syscall_dup3: ___syscall_dup3, __syscall_faccessat: ___syscall_faccessat, __syscall_fadvise64: ___syscall_fadvise64, __syscall_fallocate: ___syscall_fallocate, __syscall_fchmod: ___syscall_fchmod, __syscall_fchmodat2: ___syscall_fchmodat2, __syscall_fchown32: ___syscall_fchown32, __syscall_fchownat: ___syscall_fchownat, __syscall_fcntl64: ___syscall_fcntl64, __syscall_fdatasync: ___syscall_fdatasync, __syscall_fstat64: ___syscall_fstat64, __syscall_ftruncate64: ___syscall_ftruncate64, __syscall_getcwd: ___syscall_getcwd, __syscall_getdents64: ___syscall_getdents64, __syscall_ioctl: ___syscall_ioctl, __syscall_listen: ___syscall_listen, __syscall_lstat64: ___syscall_lstat64, __syscall_mkdirat: ___syscall_mkdirat, __syscall_newfstatat: ___syscall_newfstatat, __syscall_openat: ___syscall_openat, __syscall_pipe: ___syscall_pipe, __syscall_readlinkat: ___syscall_readlinkat, __syscall_recvfrom: ___syscall_recvfrom, __syscall_renameat: ___syscall_renameat, __syscall_rmdir: ___syscall_rmdir, __syscall_sendto: ___syscall_sendto, __syscall_socket: ___syscall_socket, __syscall_stat64: ___syscall_stat64, __syscall_statfs64: ___syscall_statfs64, __syscall_symlinkat: ___syscall_symlinkat, __syscall_truncate64: ___syscall_truncate64, __syscall_unlinkat: ___syscall_unlinkat, __syscall_utimensat: ___syscall_utimensat, __table_base: ___table_base, _abort_js: __abort_js, _dlopen_js: __dlopen_js, _dlsym_js: __dlsym_js, _emscripten_runtime_keepalive_clear: __emscripten_runtime_keepalive_clear, _emscripten_throw_longjmp: __emscripten_throw_longjmp, _gmtime_js: __gmtime_js, _localtime_js: __localtime_js, _mmap_js: __mmap_js, _munmap_js: __munmap_js, _setitimer_js: __setitimer_js, _tzset_js: __tzset_js, clock_time_get: _clock_time_get, emscripten_date_now: _emscripten_date_now, emscripten_exit_with_live_runtime: _emscripten_exit_with_live_runtime, emscripten_force_exit: _emscripten_force_exit, emscripten_get_heap_max: _emscripten_get_heap_max, emscripten_get_now: _emscripten_get_now, emscripten_resize_heap: _emscripten_resize_heap, environ_get: _environ_get, environ_sizes_get: _environ_sizes_get, exit: _exit, fd_close: _fd_close, fd_fdstat_get: _fd_fdstat_get, fd_pread: _fd_pread, fd_pwrite: _fd_pwrite, fd_read: _fd_read, fd_seek: _fd_seek, fd_sync: _fd_sync, fd_write: _fd_write, getTempRet0: _getTempRet0, getaddrinfo: _getaddrinfo, getnameinfo: _getnameinfo, invoke_di, invoke_i, invoke_id, invoke_ii, invoke_iii, invoke_iiii, invoke_iiiii, invoke_iiiiii, invoke_iiiiiii, invoke_iiiiiiii, invoke_iiiiiiiii, invoke_iiiiiiiiii, invoke_iiiiiiiiiii, invoke_iiiiiiiiiiiiii, invoke_iiiiiiiiiiiiiiiiii, invoke_iiiiiji, invoke_iiiij, invoke_iiij, invoke_iiji, invoke_iijj, invoke_ij, invoke_ijiiiii, invoke_ijiiiiii, invoke_ijji, invoke_j, invoke_ji, invoke_jii, invoke_jiii, invoke_jiiii, invoke_jiiiiii, invoke_jiiiiiiiii, invoke_jij, invoke_v, invoke_vi, invoke_vid, invoke_vii, invoke_viii, invoke_viiii, invoke_viiiii, invoke_viiiiii, invoke_viiiiiii, invoke_viiiiiiii, invoke_viiiiiiiii, invoke_viiiiiiiiiiii, invoke_viiiji, invoke_viij, invoke_viiji, invoke_viijii, invoke_viijiiii, invoke_vij, invoke_viji, invoke_vijiji, invoke_vijjii, invoke_vj, invoke_vji, invoke_vjii, memory: wasmMemory, proc_exit: _proc_exit, random_get: _random_get, sched_yield: _sched_yield, setTempRet0: _setTempRet0 }, wasmExports;
    createWasm();
    Module._palloc0 = (e) => (Module._palloc0 = wasmExports.palloc0)(e);
    Module._RelationGetNumberOfBlocksInFork = (e, t2) => (Module._RelationGetNumberOfBlocksInFork = wasmExports.RelationGetNumberOfBlocksInFork)(e, t2);
    Module._ExtendBufferedRel = (e, t2, r, a2) => (Module._ExtendBufferedRel = wasmExports.ExtendBufferedRel)(e, t2, r, a2);
    Module._MarkBufferDirty = (e) => (Module._MarkBufferDirty = wasmExports.MarkBufferDirty)(e);
    Module._XLogBeginInsert = () => (Module._XLogBeginInsert = wasmExports.XLogBeginInsert)();
    Module._XLogRegisterData = (e, t2) => (Module._XLogRegisterData = wasmExports.XLogRegisterData)(e, t2);
    Module._XLogInsert = (e, t2) => (Module._XLogInsert = wasmExports.XLogInsert)(e, t2);
    Module._UnlockReleaseBuffer = (e) => (Module._UnlockReleaseBuffer = wasmExports.UnlockReleaseBuffer)(e);
    Module._palloc = (e) => (Module._palloc = wasmExports.palloc)(e);
    Module._brin_build_desc = (e) => (Module._brin_build_desc = wasmExports.brin_build_desc)(e);
    Module._EnterParallelMode = () => (Module._EnterParallelMode = wasmExports.EnterParallelMode)();
    Module._CreateParallelContext = (e, t2, r) => (Module._CreateParallelContext = wasmExports.CreateParallelContext)(e, t2, r);
    Module._GetTransactionSnapshot = () => (Module._GetTransactionSnapshot = wasmExports.GetTransactionSnapshot)();
    Module._RegisterSnapshot = (e) => (Module._RegisterSnapshot = wasmExports.RegisterSnapshot)(e);
    Module._table_parallelscan_estimate = (e, t2) => (Module._table_parallelscan_estimate = wasmExports.table_parallelscan_estimate)(e, t2);
    Module._add_size = (e, t2) => (Module._add_size = wasmExports.add_size)(e, t2);
    Module._tuplesort_estimate_shared = (e) => (Module._tuplesort_estimate_shared = wasmExports.tuplesort_estimate_shared)(e);
    Module._strlen = (e) => (Module._strlen = wasmExports.strlen)(e);
    Module._InitializeParallelDSM = (e) => (Module._InitializeParallelDSM = wasmExports.InitializeParallelDSM)(e);
    Module._UnregisterSnapshot = (e) => (Module._UnregisterSnapshot = wasmExports.UnregisterSnapshot)(e);
    Module._DestroyParallelContext = (e) => (Module._DestroyParallelContext = wasmExports.DestroyParallelContext)(e);
    Module._ExitParallelMode = () => (Module._ExitParallelMode = wasmExports.ExitParallelMode)();
    Module._shm_toc_allocate = (e, t2) => (Module._shm_toc_allocate = wasmExports.shm_toc_allocate)(e, t2);
    Module._ConditionVariableInit = (e) => (Module._ConditionVariableInit = wasmExports.ConditionVariableInit)(e);
    Module._table_parallelscan_initialize = (e, t2, r) => (Module._table_parallelscan_initialize = wasmExports.table_parallelscan_initialize)(e, t2, r);
    Module._tuplesort_initialize_shared = (e, t2, r) => (Module._tuplesort_initialize_shared = wasmExports.tuplesort_initialize_shared)(e, t2, r);
    Module._shm_toc_insert = (e, t2, r) => (Module._shm_toc_insert = wasmExports.shm_toc_insert)(e, t2, r);
    Module._memcpy = (e, t2, r) => (Module._memcpy = wasmExports.memcpy)(e, t2, r);
    Module._LaunchParallelWorkers = (e) => (Module._LaunchParallelWorkers = wasmExports.LaunchParallelWorkers)(e);
    Module._WaitForParallelWorkersToAttach = (e) => (Module._WaitForParallelWorkersToAttach = wasmExports.WaitForParallelWorkersToAttach)(e);
    Module._s_lock = (e, t2, r, a2) => (Module._s_lock = wasmExports.s_lock)(e, t2, r, a2);
    Module._ConditionVariableSleep = (e, t2) => (Module._ConditionVariableSleep = wasmExports.ConditionVariableSleep)(e, t2);
    Module._ConditionVariableCancelSleep = () => (Module._ConditionVariableCancelSleep = wasmExports.ConditionVariableCancelSleep)();
    Module._tuplesort_performsort = (e) => (Module._tuplesort_performsort = wasmExports.tuplesort_performsort)(e);
    Module._AllocSetContextCreateInternal = (e, t2, r, a2, o2) => (Module._AllocSetContextCreateInternal = wasmExports.AllocSetContextCreateInternal)(e, t2, r, a2, o2);
    Module._tuplesort_end = (e) => (Module._tuplesort_end = wasmExports.tuplesort_end)(e);
    Module._MemoryContextReset = (e) => (Module._MemoryContextReset = wasmExports.MemoryContextReset)(e);
    Module._brin_deform_tuple = (e, t2, r) => (Module._brin_deform_tuple = wasmExports.brin_deform_tuple)(e, t2, r);
    Module._pfree = (e) => (Module._pfree = wasmExports.pfree)(e);
    Module._MemoryContextDelete = (e) => (Module._MemoryContextDelete = wasmExports.MemoryContextDelete)(e);
    Module._errstart_cold = (e, t2) => (Module._errstart_cold = wasmExports.errstart_cold)(e, t2);
    Module._errmsg_internal = (e, t2) => (Module._errmsg_internal = wasmExports.errmsg_internal)(e, t2);
    Module._errfinish = (e, t2, r) => (Module._errfinish = wasmExports.errfinish)(e, t2, r);
    Module._log_newpage_buffer = (e, t2) => (Module._log_newpage_buffer = wasmExports.log_newpage_buffer)(e, t2);
    Module._ProcessInterrupts = () => (Module._ProcessInterrupts = wasmExports.ProcessInterrupts)();
    Module._errstart = (e, t2) => (Module._errstart = wasmExports.errstart)(e, t2);
    Module._errcode = (e) => (Module._errcode = wasmExports.errcode)(e);
    Module._errmsg = (e, t2) => (Module._errmsg = wasmExports.errmsg)(e, t2);
    Module._LockBuffer = (e, t2) => (Module._LockBuffer = wasmExports.LockBuffer)(e, t2);
    Module._ReleaseBuffer = (e) => (Module._ReleaseBuffer = wasmExports.ReleaseBuffer)(e);
    Module._IndexGetRelation = (e, t2) => (Module._IndexGetRelation = wasmExports.IndexGetRelation)(e, t2);
    Module._table_open = (e, t2) => (Module._table_open = wasmExports.table_open)(e, t2);
    Module._ReadBufferExtended = (e, t2, r, a2, o2) => (Module._ReadBufferExtended = wasmExports.ReadBufferExtended)(e, t2, r, a2, o2);
    Module._table_close = (e, t2) => (Module._table_close = wasmExports.table_close)(e, t2);
    Module._build_reloptions = (e, t2, r, a2, o2, _3) => (Module._build_reloptions = wasmExports.build_reloptions)(e, t2, r, a2, o2, _3);
    Module._RelationGetIndexScan = (e, t2, r) => (Module._RelationGetIndexScan = wasmExports.RelationGetIndexScan)(e, t2, r);
    Module._pgstat_assoc_relation = (e) => (Module._pgstat_assoc_relation = wasmExports.pgstat_assoc_relation)(e);
    Module._memset = (e, t2, r) => (Module._memset = wasmExports.memset)(e, t2, r);
    Module._index_getprocinfo = (e, t2, r) => (Module._index_getprocinfo = wasmExports.index_getprocinfo)(e, t2, r);
    Module._fmgr_info_copy = (e, t2, r) => (Module._fmgr_info_copy = wasmExports.fmgr_info_copy)(e, t2, r);
    Module._FunctionCall4Coll = (e, t2, r, a2, o2, _3) => (Module._FunctionCall4Coll = wasmExports.FunctionCall4Coll)(e, t2, r, a2, o2, _3);
    Module._FunctionCall1Coll = (e, t2, r) => (Module._FunctionCall1Coll = wasmExports.FunctionCall1Coll)(e, t2, r);
    Module._brin_free_desc = (e) => (Module._brin_free_desc = wasmExports.brin_free_desc)(e);
    Module._WaitForParallelWorkersToFinish = (e) => (Module._WaitForParallelWorkersToFinish = wasmExports.WaitForParallelWorkersToFinish)(e);
    Module._PageGetFreeSpace = (e) => (Module._PageGetFreeSpace = wasmExports.PageGetFreeSpace)(e);
    Module._BufferGetBlockNumber = (e) => (Module._BufferGetBlockNumber = wasmExports.BufferGetBlockNumber)(e);
    Module._BuildIndexInfo = (e) => (Module._BuildIndexInfo = wasmExports.BuildIndexInfo)(e);
    Module._Int64GetDatum = (e) => (Module._Int64GetDatum = wasmExports.Int64GetDatum)(e);
    Module._DirectFunctionCall2Coll = (e, t2, r, a2) => (Module._DirectFunctionCall2Coll = wasmExports.DirectFunctionCall2Coll)(e, t2, r, a2);
    Module._RecoveryInProgress = () => (Module._RecoveryInProgress = wasmExports.RecoveryInProgress)();
    Module._GetUserIdAndSecContext = (e, t2) => (Module._GetUserIdAndSecContext = wasmExports.GetUserIdAndSecContext)(e, t2);
    Module._SetUserIdAndSecContext = (e, t2) => (Module._SetUserIdAndSecContext = wasmExports.SetUserIdAndSecContext)(e, t2);
    Module._NewGUCNestLevel = () => (Module._NewGUCNestLevel = wasmExports.NewGUCNestLevel)();
    Module._RestrictSearchPath = () => (Module._RestrictSearchPath = wasmExports.RestrictSearchPath)();
    Module._index_open = (e, t2) => (Module._index_open = wasmExports.index_open)(e, t2);
    Module._object_ownercheck = (e, t2, r) => (Module._object_ownercheck = wasmExports.object_ownercheck)(e, t2, r);
    Module._aclcheck_error = (e, t2, r) => (Module._aclcheck_error = wasmExports.aclcheck_error)(e, t2, r);
    Module._AtEOXact_GUC = (e, t2) => (Module._AtEOXact_GUC = wasmExports.AtEOXact_GUC)(e, t2);
    Module._relation_close = (e, t2) => (Module._relation_close = wasmExports.relation_close)(e, t2);
    Module._errhint = (e, t2) => (Module._errhint = wasmExports.errhint)(e, t2);
    Module._GetUserId = () => (Module._GetUserId = wasmExports.GetUserId)();
    Module._ReadBuffer = (e, t2) => (Module._ReadBuffer = wasmExports.ReadBuffer)(e, t2);
    Module._shm_toc_lookup = (e, t2, r) => (Module._shm_toc_lookup = wasmExports.shm_toc_lookup)(e, t2, r);
    Module._pgstat_report_activity = (e, t2) => (Module._pgstat_report_activity = wasmExports.pgstat_report_activity)(e, t2);
    Module._tuplesort_attach_shared = (e, t2) => (Module._tuplesort_attach_shared = wasmExports.tuplesort_attach_shared)(e, t2);
    Module._index_close = (e, t2) => (Module._index_close = wasmExports.index_close)(e, t2);
    Module._table_beginscan_parallel = (e, t2) => (Module._table_beginscan_parallel = wasmExports.table_beginscan_parallel)(e, t2);
    Module._ConditionVariableSignal = (e) => (Module._ConditionVariableSignal = wasmExports.ConditionVariableSignal)(e);
    Module._datumCopy = (e, t2, r) => (Module._datumCopy = wasmExports.datumCopy)(e, t2, r);
    Module._lookup_type_cache = (e, t2) => (Module._lookup_type_cache = wasmExports.lookup_type_cache)(e, t2);
    Module._get_fn_opclass_options = (e) => (Module._get_fn_opclass_options = wasmExports.get_fn_opclass_options)(e);
    Module._log = (e) => (Module._log = wasmExports.log)(e);
    Module._pg_detoast_datum = (e) => (Module._pg_detoast_datum = wasmExports.pg_detoast_datum)(e);
    Module._index_getprocid = (e, t2, r) => (Module._index_getprocid = wasmExports.index_getprocid)(e, t2, r);
    Module._errdetail_internal = (e, t2) => (Module._errdetail_internal = wasmExports.errdetail_internal)(e, t2);
    Module._pg_popcount_optimized = (e, t2) => (Module._pg_popcount_optimized = wasmExports.pg_popcount_optimized)(e, t2);
    Module._init_local_reloptions = (e, t2) => (Module._init_local_reloptions = wasmExports.init_local_reloptions)(e, t2);
    Module._initStringInfo = (e) => (Module._initStringInfo = wasmExports.initStringInfo)(e);
    Module._appendStringInfoChar = (e, t2) => (Module._appendStringInfoChar = wasmExports.appendStringInfoChar)(e, t2);
    Module._appendStringInfo = (e, t2, r) => (Module._appendStringInfo = wasmExports.appendStringInfo)(e, t2, r);
    Module._FunctionCall2Coll = (e, t2, r, a2) => (Module._FunctionCall2Coll = wasmExports.FunctionCall2Coll)(e, t2, r, a2);
    Module._SysCacheGetAttrNotNull = (e, t2, r) => (Module._SysCacheGetAttrNotNull = wasmExports.SysCacheGetAttrNotNull)(e, t2, r);
    Module._ReleaseSysCache = (e) => (Module._ReleaseSysCache = wasmExports.ReleaseSysCache)(e);
    Module._get_opcode = (e) => (Module._get_opcode = wasmExports.get_opcode)(e);
    Module._fmgr_info_cxt = (e, t2, r) => (Module._fmgr_info_cxt = wasmExports.fmgr_info_cxt)(e, t2, r);
    Module._Float8GetDatum = (e) => (Module._Float8GetDatum = wasmExports.Float8GetDatum)(e);
    Module._numeric_float8 = (e) => (Module._numeric_float8 = wasmExports.numeric_float8)(e);
    Module._numeric_sub = (e) => (Module._numeric_sub = wasmExports.numeric_sub)(e);
    Module._DirectFunctionCall1Coll = (e, t2, r) => (Module._DirectFunctionCall1Coll = wasmExports.DirectFunctionCall1Coll)(e, t2, r);
    Module._pg_detoast_datum_packed = (e) => (Module._pg_detoast_datum_packed = wasmExports.pg_detoast_datum_packed)(e);
    Module._pg_qsort = (e, t2, r, a2) => (Module._pg_qsort = wasmExports.pg_qsort)(e, t2, r, a2);
    Module._get_typbyval = (e) => (Module._get_typbyval = wasmExports.get_typbyval)(e);
    Module._get_typlen = (e) => (Module._get_typlen = wasmExports.get_typlen)(e);
    Module._qsort_arg = (e, t2, r, a2, o2) => (Module._qsort_arg = wasmExports.qsort_arg)(e, t2, r, a2, o2);
    Module._memmove = (e, t2, r) => (Module._memmove = wasmExports.memmove)(e, t2, r);
    Module._add_local_int_reloption = (e, t2, r, a2, o2, _3, s2) => (Module._add_local_int_reloption = wasmExports.add_local_int_reloption)(e, t2, r, a2, o2, _3, s2);
    Module._getTypeOutputInfo = (e, t2, r) => (Module._getTypeOutputInfo = wasmExports.getTypeOutputInfo)(e, t2, r);
    Module._fmgr_info = (e, t2) => (Module._fmgr_info = wasmExports.fmgr_info)(e, t2);
    Module._OutputFunctionCall = (e, t2) => (Module._OutputFunctionCall = wasmExports.OutputFunctionCall)(e, t2);
    Module._cstring_to_text_with_len = (e, t2) => (Module._cstring_to_text_with_len = wasmExports.cstring_to_text_with_len)(e, t2);
    Module._accumArrayResult = (e, t2, r, a2, o2) => (Module._accumArrayResult = wasmExports.accumArrayResult)(e, t2, r, a2, o2);
    Module._makeArrayResult = (e, t2) => (Module._makeArrayResult = wasmExports.makeArrayResult)(e, t2);
    Module._OidOutputFunctionCall = (e, t2) => (Module._OidOutputFunctionCall = wasmExports.OidOutputFunctionCall)(e, t2);
    Module._cstring_to_text = (e) => (Module._cstring_to_text = wasmExports.cstring_to_text)(e);
    Module._PageGetExactFreeSpace = (e) => (Module._PageGetExactFreeSpace = wasmExports.PageGetExactFreeSpace)(e);
    Module._PageIndexTupleOverwrite = (e, t2, r, a2) => (Module._PageIndexTupleOverwrite = wasmExports.PageIndexTupleOverwrite)(e, t2, r, a2);
    Module._PageInit = (e, t2, r) => (Module._PageInit = wasmExports.PageInit)(e, t2, r);
    Module._PageAddItemExtended = (e, t2, r, a2, o2) => (Module._PageAddItemExtended = wasmExports.PageAddItemExtended)(e, t2, r, a2, o2);
    Module._LockRelationForExtension = (e, t2) => (Module._LockRelationForExtension = wasmExports.LockRelationForExtension)(e, t2);
    Module._UnlockRelationForExtension = (e, t2) => (Module._UnlockRelationForExtension = wasmExports.UnlockRelationForExtension)(e, t2);
    Module._smgropen = (e, t2) => (Module._smgropen = wasmExports.smgropen)(e, t2);
    Module._smgrpin = (e) => (Module._smgrpin = wasmExports.smgrpin)(e);
    Module._ItemPointerEquals = (e, t2) => (Module._ItemPointerEquals = wasmExports.ItemPointerEquals)(e, t2);
    Module._detoast_external_attr = (e) => (Module._detoast_external_attr = wasmExports.detoast_external_attr)(e);
    Module._CreateTemplateTupleDesc = (e) => (Module._CreateTemplateTupleDesc = wasmExports.CreateTemplateTupleDesc)(e);
    Module._TupleDescInitEntry = (e, t2, r, a2, o2, _3) => (Module._TupleDescInitEntry = wasmExports.TupleDescInitEntry)(e, t2, r, a2, o2, _3);
    Module._repalloc = (e, t2) => (Module._repalloc = wasmExports.repalloc)(e, t2);
    Module._memcmp = (e, t2, r) => (Module._memcmp = wasmExports.memcmp)(e, t2, r);
    Module._SearchSysCache1 = (e, t2) => (Module._SearchSysCache1 = wasmExports.SearchSysCache1)(e, t2);
    Module._get_opfamily_name = (e, t2) => (Module._get_opfamily_name = wasmExports.get_opfamily_name)(e, t2);
    Module._SearchSysCacheList = (e, t2, r, a2, o2) => (Module._SearchSysCacheList = wasmExports.SearchSysCacheList)(e, t2, r, a2, o2);
    Module._check_amproc_signature = (e, t2, r, a2, o2, _3) => (Module._check_amproc_signature = wasmExports.check_amproc_signature)(e, t2, r, a2, o2, _3);
    Module._check_amoptsproc_signature = (e) => (Module._check_amoptsproc_signature = wasmExports.check_amoptsproc_signature)(e);
    Module._format_procedure = (e) => (Module._format_procedure = wasmExports.format_procedure)(e);
    Module._format_operator = (e) => (Module._format_operator = wasmExports.format_operator)(e);
    Module._check_amop_signature = (e, t2, r, a2) => (Module._check_amop_signature = wasmExports.check_amop_signature)(e, t2, r, a2);
    Module._identify_opfamily_groups = (e, t2) => (Module._identify_opfamily_groups = wasmExports.identify_opfamily_groups)(e, t2);
    Module._format_type_be = (e) => (Module._format_type_be = wasmExports.format_type_be)(e);
    Module._ReleaseCatCacheList = (e) => (Module._ReleaseCatCacheList = wasmExports.ReleaseCatCacheList)(e);
    Module._format_type_with_typemod = (e, t2) => (Module._format_type_with_typemod = wasmExports.format_type_with_typemod)(e, t2);
    Module._errdetail = (e, t2) => (Module._errdetail = wasmExports.errdetail)(e, t2);
    Module._strcmp = (e, t2) => (Module._strcmp = wasmExports.strcmp)(e, t2);
    Module._DatumGetEOHP = (e) => (Module._DatumGetEOHP = wasmExports.DatumGetEOHP)(e);
    Module._EOH_get_flat_size = (e) => (Module._EOH_get_flat_size = wasmExports.EOH_get_flat_size)(e);
    Module._EOH_flatten_into = (e, t2, r) => (Module._EOH_flatten_into = wasmExports.EOH_flatten_into)(e, t2, r);
    Module._toast_raw_datum_size = (e) => (Module._toast_raw_datum_size = wasmExports.toast_raw_datum_size)(e);
    Module._getmissingattr = (e, t2, r) => (Module._getmissingattr = wasmExports.getmissingattr)(e, t2, r);
    Module._hash_create = (e, t2, r, a2) => (Module._hash_create = wasmExports.hash_create)(e, t2, r, a2);
    Module._hash_search = (e, t2, r, a2) => (Module._hash_search = wasmExports.hash_search)(e, t2, r, a2);
    Module._nocachegetattr = (e, t2, r) => (Module._nocachegetattr = wasmExports.nocachegetattr)(e, t2, r);
    Module._heap_getsysattr = (e, t2, r, a2) => (Module._heap_getsysattr = wasmExports.heap_getsysattr)(e, t2, r, a2);
    Module._heap_form_tuple = (e, t2, r) => (Module._heap_form_tuple = wasmExports.heap_form_tuple)(e, t2, r);
    Module._heap_modify_tuple = (e, t2, r, a2, o2) => (Module._heap_modify_tuple = wasmExports.heap_modify_tuple)(e, t2, r, a2, o2);
    Module._heap_deform_tuple = (e, t2, r, a2) => (Module._heap_deform_tuple = wasmExports.heap_deform_tuple)(e, t2, r, a2);
    Module._heap_modify_tuple_by_cols = (e, t2, r, a2, o2, _3) => (Module._heap_modify_tuple_by_cols = wasmExports.heap_modify_tuple_by_cols)(e, t2, r, a2, o2, _3);
    Module._heap_freetuple = (e) => (Module._heap_freetuple = wasmExports.heap_freetuple)(e);
    Module._hash_bytes = (e, t2) => (Module._hash_bytes = wasmExports.hash_bytes)(e, t2);
    Module._index_form_tuple = (e, t2, r) => (Module._index_form_tuple = wasmExports.index_form_tuple)(e, t2, r);
    Module._MemoryContextAllocZero = (e, t2) => (Module._MemoryContextAllocZero = wasmExports.MemoryContextAllocZero)(e, t2);
    Module._nocache_index_getattr = (e, t2, r) => (Module._nocache_index_getattr = wasmExports.nocache_index_getattr)(e, t2, r);
    Module._index_deform_tuple = (e, t2, r, a2) => (Module._index_deform_tuple = wasmExports.index_deform_tuple)(e, t2, r, a2);
    Module._CopyIndexTuple = (e) => (Module._CopyIndexTuple = wasmExports.CopyIndexTuple)(e);
    Module._CreateTupleDescTruncatedCopy = (e, t2) => (Module._CreateTupleDescTruncatedCopy = wasmExports.CreateTupleDescTruncatedCopy)(e, t2);
    Module._enlargeStringInfo = (e, t2) => (Module._enlargeStringInfo = wasmExports.enlargeStringInfo)(e, t2);
    Module._slot_getsomeattrs_int = (e, t2) => (Module._slot_getsomeattrs_int = wasmExports.slot_getsomeattrs_int)(e, t2);
    Module._pg_lltoa = (e, t2) => (Module._pg_lltoa = wasmExports.pg_lltoa)(e, t2);
    Module._pg_ltoa = (e, t2) => (Module._pg_ltoa = wasmExports.pg_ltoa)(e, t2);
    Module._pq_sendbytes = (e, t2, r) => (Module._pq_sendbytes = wasmExports.pq_sendbytes)(e, t2, r);
    Module._pg_printf = (e, t2) => (Module._pg_printf = wasmExports.pg_printf)(e, t2);
    Module._relation_open = (e, t2) => (Module._relation_open = wasmExports.relation_open)(e, t2);
    Module._LockRelationOid = (e, t2) => (Module._LockRelationOid = wasmExports.LockRelationOid)(e, t2);
    Module._RelationIdGetRelation = (e) => (Module._RelationIdGetRelation = wasmExports.RelationIdGetRelation)(e);
    Module._try_relation_open = (e, t2) => (Module._try_relation_open = wasmExports.try_relation_open)(e, t2);
    Module._UnlockRelationOid = (e, t2) => (Module._UnlockRelationOid = wasmExports.UnlockRelationOid)(e, t2);
    Module._relation_openrv = (e, t2) => (Module._relation_openrv = wasmExports.relation_openrv)(e, t2);
    Module._AcceptInvalidationMessages = () => (Module._AcceptInvalidationMessages = wasmExports.AcceptInvalidationMessages)();
    Module._RangeVarGetRelidExtended = (e, t2, r, a2, o2) => (Module._RangeVarGetRelidExtended = wasmExports.RangeVarGetRelidExtended)(e, t2, r, a2, o2);
    Module._RelationClose = (e) => (Module._RelationClose = wasmExports.RelationClose)(e);
    Module._add_reloption_kind = () => (Module._add_reloption_kind = wasmExports.add_reloption_kind)();
    Module._register_reloptions_validator = (e, t2) => (Module._register_reloptions_validator = wasmExports.register_reloptions_validator)(e, t2);
    Module._lappend = (e, t2) => (Module._lappend = wasmExports.lappend)(e, t2);
    Module._pstrdup = (e) => (Module._pstrdup = wasmExports.pstrdup)(e);
    Module._add_int_reloption = (e, t2, r, a2, o2, _3, s2) => (Module._add_int_reloption = wasmExports.add_int_reloption)(e, t2, r, a2, o2, _3, s2);
    Module._add_real_reloption = (e, t2, r, a2, o2, _3, s2) => (Module._add_real_reloption = wasmExports.add_real_reloption)(e, t2, r, a2, o2, _3, s2);
    Module._add_string_reloption = (e, t2, r, a2, o2, _3) => (Module._add_string_reloption = wasmExports.add_string_reloption)(e, t2, r, a2, o2, _3);
    Module._strdup = (e) => (Module._strdup = wasmExports.strdup)(e);
    Module._MemoryContextStrdup = (e, t2) => (Module._MemoryContextStrdup = wasmExports.MemoryContextStrdup)(e, t2);
    Module._transformRelOptions = (e, t2, r, a2, o2, _3) => (Module._transformRelOptions = wasmExports.transformRelOptions)(e, t2, r, a2, o2, _3);
    Module._deconstruct_array_builtin = (e, t2, r, a2, o2) => (Module._deconstruct_array_builtin = wasmExports.deconstruct_array_builtin)(e, t2, r, a2, o2);
    Module._strncmp = (e, t2, r) => (Module._strncmp = wasmExports.strncmp)(e, t2, r);
    Module._defGetString = (e) => (Module._defGetString = wasmExports.defGetString)(e);
    Module._strchr = (e, t2) => (Module._strchr = wasmExports.strchr)(e, t2);
    Module._defGetBoolean = (e) => (Module._defGetBoolean = wasmExports.defGetBoolean)(e);
    Module._pg_sprintf = (e, t2, r) => (Module._pg_sprintf = wasmExports.pg_sprintf)(e, t2, r);
    Module._untransformRelOptions = (e) => (Module._untransformRelOptions = wasmExports.untransformRelOptions)(e);
    Module._text_to_cstring = (e) => (Module._text_to_cstring = wasmExports.text_to_cstring)(e);
    Module._makeString = (e) => (Module._makeString = wasmExports.makeString)(e);
    Module._makeDefElem = (e, t2, r) => (Module._makeDefElem = wasmExports.makeDefElem)(e, t2, r);
    Module._heap_reloptions = (e, t2, r) => (Module._heap_reloptions = wasmExports.heap_reloptions)(e, t2, r);
    Module._strcpy = (e, t2) => (Module._strcpy = wasmExports.strcpy)(e, t2);
    Module._MemoryContextAlloc = (e, t2) => (Module._MemoryContextAlloc = wasmExports.MemoryContextAlloc)(e, t2);
    Module._parse_bool = (e, t2) => (Module._parse_bool = wasmExports.parse_bool)(e, t2);
    Module._parse_int = (e, t2, r, a2) => (Module._parse_int = wasmExports.parse_int)(e, t2, r, a2);
    Module._parse_real = (e, t2, r, a2) => (Module._parse_real = wasmExports.parse_real)(e, t2, r, a2);
    Module._pg_strcasecmp = (e, t2) => (Module._pg_strcasecmp = wasmExports.pg_strcasecmp)(e, t2);
    Module._ScanKeyInit = (e, t2, r, a2, o2) => (Module._ScanKeyInit = wasmExports.ScanKeyInit)(e, t2, r, a2, o2);
    Module._dsm_segment_handle = (e) => (Module._dsm_segment_handle = wasmExports.dsm_segment_handle)(e);
    Module._dsm_create = (e, t2) => (Module._dsm_create = wasmExports.dsm_create)(e, t2);
    Module._dsm_segment_address = (e) => (Module._dsm_segment_address = wasmExports.dsm_segment_address)(e);
    Module._dsa_pin_mapping = (e) => (Module._dsa_pin_mapping = wasmExports.dsa_pin_mapping)(e);
    Module._dsm_attach = (e) => (Module._dsm_attach = wasmExports.dsm_attach)(e);
    Module._dsm_detach = (e) => (Module._dsm_detach = wasmExports.dsm_detach)(e);
    Module._dsa_detach = (e) => (Module._dsa_detach = wasmExports.dsa_detach)(e);
    Module._ShmemInitStruct = (e, t2, r) => (Module._ShmemInitStruct = wasmExports.ShmemInitStruct)(e, t2, r);
    Module._LWLockAcquire = (e, t2) => (Module._LWLockAcquire = wasmExports.LWLockAcquire)(e, t2);
    Module._LWLockRelease = (e) => (Module._LWLockRelease = wasmExports.LWLockRelease)(e);
    Module._LWLockConditionalAcquire = (e, t2) => (Module._LWLockConditionalAcquire = wasmExports.LWLockConditionalAcquire)(e, t2);
    Module._dsa_create_ext = (e, t2, r) => (Module._dsa_create_ext = wasmExports.dsa_create_ext)(e, t2, r);
    Module._dsa_allocate_extended = (e, t2, r) => (Module._dsa_allocate_extended = wasmExports.dsa_allocate_extended)(e, t2, r);
    Module._dsa_get_address = (e, t2) => (Module._dsa_get_address = wasmExports.dsa_get_address)(e, t2);
    Module._LWLockInitialize = (e, t2) => (Module._LWLockInitialize = wasmExports.LWLockInitialize)(e, t2);
    Module._dsa_attach = (e) => (Module._dsa_attach = wasmExports.dsa_attach)(e);
    Module._dsa_free = (e, t2) => (Module._dsa_free = wasmExports.dsa_free)(e, t2);
    Module._dsa_get_total_size = (e) => (Module._dsa_get_total_size = wasmExports.dsa_get_total_size)(e);
    Module._MemoryContextMemAllocated = (e, t2) => (Module._MemoryContextMemAllocated = wasmExports.MemoryContextMemAllocated)(e, t2);
    Module._check_stack_depth = () => (Module._check_stack_depth = wasmExports.check_stack_depth)();
    Module._GetCurrentCommandId = (e) => (Module._GetCurrentCommandId = wasmExports.GetCurrentCommandId)(e);
    Module._toast_open_indexes = (e, t2, r, a2) => (Module._toast_open_indexes = wasmExports.toast_open_indexes)(e, t2, r, a2);
    Module._heap_insert = (e, t2, r, a2, o2) => (Module._heap_insert = wasmExports.heap_insert)(e, t2, r, a2, o2);
    Module._RelationGetIndexList = (e) => (Module._RelationGetIndexList = wasmExports.RelationGetIndexList)(e);
    Module._list_free = (e) => (Module._list_free = wasmExports.list_free)(e);
    Module._systable_beginscan = (e, t2, r, a2, o2, _3) => (Module._systable_beginscan = wasmExports.systable_beginscan)(e, t2, r, a2, o2, _3);
    Module._systable_getnext = (e) => (Module._systable_getnext = wasmExports.systable_getnext)(e);
    Module._systable_endscan = (e) => (Module._systable_endscan = wasmExports.systable_endscan)(e);
    Module._toast_close_indexes = (e, t2, r) => (Module._toast_close_indexes = wasmExports.toast_close_indexes)(e, t2, r);
    Module._systable_beginscan_ordered = (e, t2, r, a2, o2) => (Module._systable_beginscan_ordered = wasmExports.systable_beginscan_ordered)(e, t2, r, a2, o2);
    Module._systable_getnext_ordered = (e, t2) => (Module._systable_getnext_ordered = wasmExports.systable_getnext_ordered)(e, t2);
    Module._systable_endscan_ordered = (e) => (Module._systable_endscan_ordered = wasmExports.systable_endscan_ordered)(e);
    Module._get_toast_snapshot = () => (Module._get_toast_snapshot = wasmExports.get_toast_snapshot)();
    Module._convert_tuples_by_position = (e, t2, r) => (Module._convert_tuples_by_position = wasmExports.convert_tuples_by_position)(e, t2, r);
    Module._execute_attr_map_tuple = (e, t2) => (Module._execute_attr_map_tuple = wasmExports.execute_attr_map_tuple)(e, t2);
    Module._ExecStoreVirtualTuple = (e) => (Module._ExecStoreVirtualTuple = wasmExports.ExecStoreVirtualTuple)(e);
    Module._bms_is_member = (e, t2) => (Module._bms_is_member = wasmExports.bms_is_member)(e, t2);
    Module._bms_add_member = (e, t2) => (Module._bms_add_member = wasmExports.bms_add_member)(e, t2);
    Module._CreateTupleDescCopy = (e) => (Module._CreateTupleDescCopy = wasmExports.CreateTupleDescCopy)(e);
    Module._ResourceOwnerEnlarge = (e) => (Module._ResourceOwnerEnlarge = wasmExports.ResourceOwnerEnlarge)(e);
    Module._ResourceOwnerRemember = (e, t2, r) => (Module._ResourceOwnerRemember = wasmExports.ResourceOwnerRemember)(e, t2, r);
    Module._DecrTupleDescRefCount = (e) => (Module._DecrTupleDescRefCount = wasmExports.DecrTupleDescRefCount)(e);
    Module._ResourceOwnerForget = (e, t2, r) => (Module._ResourceOwnerForget = wasmExports.ResourceOwnerForget)(e, t2, r);
    Module._datumIsEqual = (e, t2, r, a2) => (Module._datumIsEqual = wasmExports.datumIsEqual)(e, t2, r, a2);
    Module._namestrcpy = (e, t2) => (Module._namestrcpy = wasmExports.namestrcpy)(e, t2);
    Module._TupleDescInitEntryCollation = (e, t2, r) => (Module._TupleDescInitEntryCollation = wasmExports.TupleDescInitEntryCollation)(e, t2, r);
    Module._stringToNode = (e) => (Module._stringToNode = wasmExports.stringToNode)(e);
    Module._psprintf = (e, t2) => (Module._psprintf = wasmExports.psprintf)(e, t2);
    Module._pg_detoast_datum_copy = (e) => (Module._pg_detoast_datum_copy = wasmExports.pg_detoast_datum_copy)(e);
    Module._get_typlenbyvalalign = (e, t2, r, a2) => (Module._get_typlenbyvalalign = wasmExports.get_typlenbyvalalign)(e, t2, r, a2);
    Module._deconstruct_array = (e, t2, r, a2, o2, _3, s2, n2) => (Module._deconstruct_array = wasmExports.deconstruct_array)(e, t2, r, a2, o2, _3, s2, n2);
    Module._ginCompareAttEntries = (e, t2, r, a2, o2, _3, s2) => (Module._ginCompareAttEntries = wasmExports.ginCompareAttEntries)(e, t2, r, a2, o2, _3, s2);
    Module._repalloc_huge = (e, t2) => (Module._repalloc_huge = wasmExports.repalloc_huge)(e, t2);
    Module._GinDataLeafPageGetItems = (e, t2, r) => (Module._GinDataLeafPageGetItems = wasmExports.GinDataLeafPageGetItems)(e, t2, r);
    Module._tbm_add_tuples = (e, t2, r, a2) => (Module._tbm_add_tuples = wasmExports.tbm_add_tuples)(e, t2, r, a2);
    Module._ginPostingListDecode = (e, t2) => (Module._ginPostingListDecode = wasmExports.ginPostingListDecode)(e, t2);
    Module._ItemPointerCompare = (e, t2) => (Module._ItemPointerCompare = wasmExports.ItemPointerCompare)(e, t2);
    Module._gintuple_get_attrnum = (e, t2) => (Module._gintuple_get_attrnum = wasmExports.gintuple_get_attrnum)(e, t2);
    Module._gintuple_get_key = (e, t2, r) => (Module._gintuple_get_key = wasmExports.gintuple_get_key)(e, t2, r);
    Module._LockPage = (e, t2, r) => (Module._LockPage = wasmExports.LockPage)(e, t2, r);
    Module._UnlockPage = (e, t2, r) => (Module._UnlockPage = wasmExports.UnlockPage)(e, t2, r);
    Module._vacuum_delay_point = (e) => (Module._vacuum_delay_point = wasmExports.vacuum_delay_point)(e);
    Module._RecordFreeIndexPage = (e, t2) => (Module._RecordFreeIndexPage = wasmExports.RecordFreeIndexPage)(e, t2);
    Module._IndexFreeSpaceMapVacuum = (e) => (Module._IndexFreeSpaceMapVacuum = wasmExports.IndexFreeSpaceMapVacuum)(e);
    Module._initGinState = (e, t2) => (Module._initGinState = wasmExports.initGinState)(e, t2);
    Module._pg_prng_double = (e) => (Module._pg_prng_double = wasmExports.pg_prng_double)(e);
    Module._pgstat_progress_update_param = (e, t2) => (Module._pgstat_progress_update_param = wasmExports.pgstat_progress_update_param)(e, t2);
    Module._log_newpage_range = (e, t2, r, a2, o2) => (Module._log_newpage_range = wasmExports.log_newpage_range)(e, t2, r, a2, o2);
    Module._GetFreeIndexPage = (e) => (Module._GetFreeIndexPage = wasmExports.GetFreeIndexPage)(e);
    Module._ConditionalLockBuffer = (e) => (Module._ConditionalLockBuffer = wasmExports.ConditionalLockBuffer)(e);
    Module._LockBufferForCleanup = (e) => (Module._LockBufferForCleanup = wasmExports.LockBufferForCleanup)(e);
    Module._ReadNextFullTransactionId = () => (Module._ReadNextFullTransactionId = wasmExports.ReadNextFullTransactionId)();
    Module._PageIndexMultiDelete = (e, t2, r) => (Module._PageIndexMultiDelete = wasmExports.PageIndexMultiDelete)(e, t2, r);
    Module._list_make1_impl = (e, t2) => (Module._list_make1_impl = wasmExports.list_make1_impl)(e, t2);
    Module._lcons = (e, t2) => (Module._lcons = wasmExports.lcons)(e, t2);
    Module._pow = (e, t2) => (Module._pow = wasmExports.pow)(e, t2);
    Module._smgrnblocks = (e, t2) => (Module._smgrnblocks = wasmExports.smgrnblocks)(e, t2);
    Module._list_free_deep = (e) => (Module._list_free_deep = wasmExports.list_free_deep)(e);
    Module._BufFileWrite = (e, t2, r) => (Module._BufFileWrite = wasmExports.BufFileWrite)(e, t2, r);
    Module._BufFileReadExact = (e, t2, r) => (Module._BufFileReadExact = wasmExports.BufFileReadExact)(e, t2, r);
    Module._BufFileClose = (e) => (Module._BufFileClose = wasmExports.BufFileClose)(e);
    Module._pairingheap_remove_first = (e) => (Module._pairingheap_remove_first = wasmExports.pairingheap_remove_first)(e);
    Module._pairingheap_add = (e, t2) => (Module._pairingheap_add = wasmExports.pairingheap_add)(e, t2);
    Module._float_overflow_error = () => (Module._float_overflow_error = wasmExports.float_overflow_error)();
    Module._float8_cmp_internal = (e, t2) => (Module._float8_cmp_internal = wasmExports.float8_cmp_internal)(e, t2);
    Module._float_underflow_error = () => (Module._float_underflow_error = wasmExports.float_underflow_error)();
    Module._DirectFunctionCall5Coll = (e, t2, r, a2, o2, _3, s2) => (Module._DirectFunctionCall5Coll = wasmExports.DirectFunctionCall5Coll)(e, t2, r, a2, o2, _3, s2);
    Module._pairingheap_allocate = (e, t2) => (Module._pairingheap_allocate = wasmExports.pairingheap_allocate)(e, t2);
    Module._GetXLogInsertRecPtr = () => (Module._GetXLogInsertRecPtr = wasmExports.GetXLogInsertRecPtr)();
    Module._OidFunctionCall1Coll = (e, t2, r) => (Module._OidFunctionCall1Coll = wasmExports.OidFunctionCall1Coll)(e, t2, r);
    Module._GenerationContextCreate = (e, t2, r, a2, o2) => (Module._GenerationContextCreate = wasmExports.GenerationContextCreate)(e, t2, r, a2, o2);
    Module._block_range_read_stream_cb = (e, t2, r) => (Module._block_range_read_stream_cb = wasmExports.block_range_read_stream_cb)(e, t2, r);
    Module._read_stream_begin_relation = (e, t2, r, a2, o2, _3, s2) => (Module._read_stream_begin_relation = wasmExports.read_stream_begin_relation)(e, t2, r, a2, o2, _3, s2);
    Module._read_stream_next_buffer = (e, t2) => (Module._read_stream_next_buffer = wasmExports.read_stream_next_buffer)(e, t2);
    Module._read_stream_end = (e) => (Module._read_stream_end = wasmExports.read_stream_end)(e);
    Module.__hash_getbuf = (e, t2, r, a2) => (Module.__hash_getbuf = wasmExports._hash_getbuf)(e, t2, r, a2);
    Module.__hash_relbuf = (e, t2) => (Module.__hash_relbuf = wasmExports._hash_relbuf)(e, t2);
    Module.__hash_get_indextuple_hashkey = (e) => (Module.__hash_get_indextuple_hashkey = wasmExports._hash_get_indextuple_hashkey)(e);
    Module._hashcharextended = (e) => (Module._hashcharextended = wasmExports.hashcharextended)(e);
    Module._hashint8 = (e) => (Module._hashint8 = wasmExports.hashint8)(e);
    Module._hashint8extended = (e) => (Module._hashint8extended = wasmExports.hashint8extended)(e);
    Module._hash_bytes_extended = (e, t2, r) => (Module._hash_bytes_extended = wasmExports.hash_bytes_extended)(e, t2, r);
    Module._hashfloat8 = (e) => (Module._hashfloat8 = wasmExports.hashfloat8)(e);
    Module._hashfloat8extended = (e) => (Module._hashfloat8extended = wasmExports.hashfloat8extended)(e);
    Module._pg_newlocale_from_collation = (e) => (Module._pg_newlocale_from_collation = wasmExports.pg_newlocale_from_collation)(e);
    Module.__hash_ovflblkno_to_bitno = (e, t2) => (Module.__hash_ovflblkno_to_bitno = wasmExports._hash_ovflblkno_to_bitno)(e, t2);
    Module._hash_destroy = (e) => (Module._hash_destroy = wasmExports.hash_destroy)(e);
    Module._list_member_oid = (e, t2) => (Module._list_member_oid = wasmExports.list_member_oid)(e, t2);
    Module._CommandCounterIncrement = () => (Module._CommandCounterIncrement = wasmExports.CommandCounterIncrement)();
    Module._list_concat_copy = (e, t2) => (Module._list_concat_copy = wasmExports.list_concat_copy)(e, t2);
    Module._HeapTupleSatisfiesVisibility = (e, t2, r) => (Module._HeapTupleSatisfiesVisibility = wasmExports.HeapTupleSatisfiesVisibility)(e, t2, r);
    Module._GetAccessStrategy = (e) => (Module._GetAccessStrategy = wasmExports.GetAccessStrategy)(e);
    Module._FreeAccessStrategy = (e) => (Module._FreeAccessStrategy = wasmExports.FreeAccessStrategy)(e);
    Module._heap_getnext = (e, t2) => (Module._heap_getnext = wasmExports.heap_getnext)(e, t2);
    Module._ExecStoreBufferHeapTuple = (e, t2, r) => (Module._ExecStoreBufferHeapTuple = wasmExports.ExecStoreBufferHeapTuple)(e, t2, r);
    Module._heap_fetch = (e, t2, r, a2, o2) => (Module._heap_fetch = wasmExports.heap_fetch)(e, t2, r, a2, o2);
    Module._HeapTupleSatisfiesVacuum = (e, t2, r) => (Module._HeapTupleSatisfiesVacuum = wasmExports.HeapTupleSatisfiesVacuum)(e, t2, r);
    Module._GetMultiXactIdMembers = (e, t2, r, a2) => (Module._GetMultiXactIdMembers = wasmExports.GetMultiXactIdMembers)(e, t2, r, a2);
    Module._TransactionIdPrecedes = (e, t2) => (Module._TransactionIdPrecedes = wasmExports.TransactionIdPrecedes)(e, t2);
    Module._GetBulkInsertState = () => (Module._GetBulkInsertState = wasmExports.GetBulkInsertState)();
    Module._FreeBulkInsertState = (e) => (Module._FreeBulkInsertState = wasmExports.FreeBulkInsertState)(e);
    Module._visibilitymap_clear = (e, t2, r, a2) => (Module._visibilitymap_clear = wasmExports.visibilitymap_clear)(e, t2, r, a2);
    Module._pgstat_count_heap_insert = (e, t2) => (Module._pgstat_count_heap_insert = wasmExports.pgstat_count_heap_insert)(e, t2);
    Module._heap_multi_insert = (e, t2, r, a2, o2, _3) => (Module._heap_multi_insert = wasmExports.heap_multi_insert)(e, t2, r, a2, o2, _3);
    Module._ExecFetchSlotHeapTuple = (e, t2, r) => (Module._ExecFetchSlotHeapTuple = wasmExports.ExecFetchSlotHeapTuple)(e, t2, r);
    Module._heap_delete = (e, t2, r, a2, o2, _3, s2) => (Module._heap_delete = wasmExports.heap_delete)(e, t2, r, a2, o2, _3, s2);
    Module._visibilitymap_pin = (e, t2, r) => (Module._visibilitymap_pin = wasmExports.visibilitymap_pin)(e, t2, r);
    Module._HeapTupleSatisfiesUpdate = (e, t2, r) => (Module._HeapTupleSatisfiesUpdate = wasmExports.HeapTupleSatisfiesUpdate)(e, t2, r);
    Module._TransactionIdIsCurrentTransactionId = (e) => (Module._TransactionIdIsCurrentTransactionId = wasmExports.TransactionIdIsCurrentTransactionId)(e);
    Module._TransactionIdDidCommit = (e) => (Module._TransactionIdDidCommit = wasmExports.TransactionIdDidCommit)(e);
    Module._TransactionIdIsInProgress = (e) => (Module._TransactionIdIsInProgress = wasmExports.TransactionIdIsInProgress)(e);
    Module._bms_free = (e) => (Module._bms_free = wasmExports.bms_free)(e);
    Module._bms_add_members = (e, t2) => (Module._bms_add_members = wasmExports.bms_add_members)(e, t2);
    Module._bms_next_member = (e, t2) => (Module._bms_next_member = wasmExports.bms_next_member)(e, t2);
    Module._bms_overlap = (e, t2) => (Module._bms_overlap = wasmExports.bms_overlap)(e, t2);
    Module._HeapTupleGetUpdateXid = (e) => (Module._HeapTupleGetUpdateXid = wasmExports.HeapTupleGetUpdateXid)(e);
    Module._heap_lock_tuple = (e, t2, r, a2, o2, _3, s2, n2) => (Module._heap_lock_tuple = wasmExports.heap_lock_tuple)(e, t2, r, a2, o2, _3, s2, n2);
    Module._MultiXactIdPrecedes = (e, t2) => (Module._MultiXactIdPrecedes = wasmExports.MultiXactIdPrecedes)(e, t2);
    Module._heap_tuple_needs_eventual_freeze = (e) => (Module._heap_tuple_needs_eventual_freeze = wasmExports.heap_tuple_needs_eventual_freeze)(e);
    Module._PrefetchBuffer = (e, t2, r, a2) => (Module._PrefetchBuffer = wasmExports.PrefetchBuffer)(e, t2, r, a2);
    Module._RelationTruncate = (e, t2) => (Module._RelationTruncate = wasmExports.RelationTruncate)(e, t2);
    Module._FlushRelationBuffers = (e) => (Module._FlushRelationBuffers = wasmExports.FlushRelationBuffers)(e);
    Module._smgrexists = (e, t2) => (Module._smgrexists = wasmExports.smgrexists)(e, t2);
    Module._table_slot_create = (e, t2) => (Module._table_slot_create = wasmExports.table_slot_create)(e, t2);
    Module._ExecDropSingleTupleTableSlot = (e) => (Module._ExecDropSingleTupleTableSlot = wasmExports.ExecDropSingleTupleTableSlot)(e);
    Module._CreateExecutorState = () => (Module._CreateExecutorState = wasmExports.CreateExecutorState)();
    Module._MakePerTupleExprContext = (e) => (Module._MakePerTupleExprContext = wasmExports.MakePerTupleExprContext)(e);
    Module._ExecPrepareQual = (e, t2) => (Module._ExecPrepareQual = wasmExports.ExecPrepareQual)(e, t2);
    Module._GetOldestNonRemovableTransactionId = (e) => (Module._GetOldestNonRemovableTransactionId = wasmExports.GetOldestNonRemovableTransactionId)(e);
    Module._FormIndexDatum = (e, t2, r, a2, o2) => (Module._FormIndexDatum = wasmExports.FormIndexDatum)(e, t2, r, a2, o2);
    Module._FreeExecutorState = (e) => (Module._FreeExecutorState = wasmExports.FreeExecutorState)(e);
    Module._MakeSingleTupleTableSlot = (e, t2) => (Module._MakeSingleTupleTableSlot = wasmExports.MakeSingleTupleTableSlot)(e, t2);
    Module._tuplesort_getdatum = (e, t2, r, a2, o2, _3) => (Module._tuplesort_getdatum = wasmExports.tuplesort_getdatum)(e, t2, r, a2, o2, _3);
    Module._ExecStoreHeapTuple = (e, t2, r) => (Module._ExecStoreHeapTuple = wasmExports.ExecStoreHeapTuple)(e, t2, r);
    Module._XidInMVCCSnapshot = (e, t2) => (Module._XidInMVCCSnapshot = wasmExports.XidInMVCCSnapshot)(e, t2);
    Module._bsearch = (e, t2, r, a2, o2) => (Module._bsearch = wasmExports.bsearch)(e, t2, r, a2, o2);
    Module._XLogRecGetBlockTagExtended = (e, t2, r, a2, o2, _3) => (Module._XLogRecGetBlockTagExtended = wasmExports.XLogRecGetBlockTagExtended)(e, t2, r, a2, o2, _3);
    Module._hash_seq_init = (e, t2) => (Module._hash_seq_init = wasmExports.hash_seq_init)(e, t2);
    Module._hash_seq_search = (e) => (Module._hash_seq_search = wasmExports.hash_seq_search)(e);
    Module._errcode_for_file_access = () => (Module._errcode_for_file_access = wasmExports.errcode_for_file_access)();
    Module._pg_snprintf = (e, t2, r, a2) => (Module._pg_snprintf = wasmExports.pg_snprintf)(e, t2, r, a2);
    Module._OpenTransientFile = (e, t2) => (Module._OpenTransientFile = wasmExports.OpenTransientFile)(e, t2);
    Module._ftruncate = (e, t2) => (Module._ftruncate = wasmExports.ftruncate)(e, t2);
    Module.___errno_location = () => (Module.___errno_location = wasmExports.__errno_location)();
    Module._pwrite = (e, t2, r, a2) => (Module._pwrite = wasmExports.pwrite)(e, t2, r, a2);
    Module._CloseTransientFile = (e) => (Module._CloseTransientFile = wasmExports.CloseTransientFile)(e);
    Module._sscanf = (e, t2, r) => (Module._sscanf = wasmExports.sscanf)(e, t2, r);
    Module._unlink = (e) => (Module._unlink = wasmExports.unlink)(e);
    Module._fsync_fname = (e, t2) => (Module._fsync_fname = wasmExports.fsync_fname)(e, t2);
    Module._GetCurrentTimestamp = () => (Module._GetCurrentTimestamp = wasmExports.GetCurrentTimestamp)();
    Module._get_namespace_name = (e) => (Module._get_namespace_name = wasmExports.get_namespace_name)(e);
    Module._pg_prng_uint32 = (e) => (Module._pg_prng_uint32 = wasmExports.pg_prng_uint32)(e);
    Module._GetRecordedFreeSpace = (e, t2) => (Module._GetRecordedFreeSpace = wasmExports.GetRecordedFreeSpace)(e, t2);
    Module._visibilitymap_get_status = (e, t2, r) => (Module._visibilitymap_get_status = wasmExports.visibilitymap_get_status)(e, t2, r);
    Module._vac_estimate_reltuples = (e, t2, r, a2) => (Module._vac_estimate_reltuples = wasmExports.vac_estimate_reltuples)(e, t2, r, a2);
    Module._WaitLatch = (e, t2, r, a2) => (Module._WaitLatch = wasmExports.WaitLatch)(e, t2, r, a2);
    Module._ResetLatch = (e) => (Module._ResetLatch = wasmExports.ResetLatch)(e);
    Module._clock_gettime = (e, t2) => (Module._clock_gettime = wasmExports.clock_gettime)(e, t2);
    Module._WalUsageAccumDiff = (e, t2, r) => (Module._WalUsageAccumDiff = wasmExports.WalUsageAccumDiff)(e, t2, r);
    Module._BufferUsageAccumDiff = (e, t2, r) => (Module._BufferUsageAccumDiff = wasmExports.BufferUsageAccumDiff)(e, t2, r);
    Module._appendStringInfoString = (e, t2) => (Module._appendStringInfoString = wasmExports.appendStringInfoString)(e, t2);
    Module._set_errcontext_domain = (e) => (Module._set_errcontext_domain = wasmExports.set_errcontext_domain)(e);
    Module._errcontext_msg = (e, t2) => (Module._errcontext_msg = wasmExports.errcontext_msg)(e, t2);
    Module._visibilitymap_prepare_truncate = (e, t2) => (Module._visibilitymap_prepare_truncate = wasmExports.visibilitymap_prepare_truncate)(e, t2);
    Module._check_enable_rls = (e, t2, r) => (Module._check_enable_rls = wasmExports.check_enable_rls)(e, t2, r);
    Module._pg_class_aclcheck = (e, t2, r) => (Module._pg_class_aclcheck = wasmExports.pg_class_aclcheck)(e, t2, r);
    Module._try_index_open = (e, t2) => (Module._try_index_open = wasmExports.try_index_open)(e, t2);
    Module._btboolcmp = (e) => (Module._btboolcmp = wasmExports.btboolcmp)(e);
    Module._btint2cmp = (e) => (Module._btint2cmp = wasmExports.btint2cmp)(e);
    Module._btint4cmp = (e) => (Module._btint4cmp = wasmExports.btint4cmp)(e);
    Module._btint8cmp = (e) => (Module._btint8cmp = wasmExports.btint8cmp)(e);
    Module._btoidcmp = (e) => (Module._btoidcmp = wasmExports.btoidcmp)(e);
    Module._btcharcmp = (e) => (Module._btcharcmp = wasmExports.btcharcmp)(e);
    Module.__bt_form_posting = (e, t2, r) => (Module.__bt_form_posting = wasmExports._bt_form_posting)(e, t2, r);
    Module.__bt_mkscankey = (e, t2) => (Module.__bt_mkscankey = wasmExports._bt_mkscankey)(e, t2);
    Module.__bt_checkpage = (e, t2) => (Module.__bt_checkpage = wasmExports._bt_checkpage)(e, t2);
    Module.__bt_compare = (e, t2, r, a2) => (Module.__bt_compare = wasmExports._bt_compare)(e, t2, r, a2);
    Module.__bt_relbuf = (e, t2) => (Module.__bt_relbuf = wasmExports._bt_relbuf)(e, t2);
    Module.__bt_search = (e, t2, r, a2, o2) => (Module.__bt_search = wasmExports._bt_search)(e, t2, r, a2, o2);
    Module.__bt_binsrch_insert = (e, t2) => (Module.__bt_binsrch_insert = wasmExports._bt_binsrch_insert)(e, t2);
    Module.__bt_freestack = (e) => (Module.__bt_freestack = wasmExports._bt_freestack)(e);
    Module.__bt_metaversion = (e, t2, r) => (Module.__bt_metaversion = wasmExports._bt_metaversion)(e, t2, r);
    Module._get_opfamily_member = (e, t2, r, a2) => (Module._get_opfamily_member = wasmExports.get_opfamily_member)(e, t2, r, a2);
    Module.__bt_allequalimage = (e, t2) => (Module.__bt_allequalimage = wasmExports._bt_allequalimage)(e, t2);
    Module.___wasm_setjmp_test = (e, t2) => (Module.___wasm_setjmp_test = wasmExports.__wasm_setjmp_test)(e, t2);
    Module._before_shmem_exit = (e, t2) => (Module._before_shmem_exit = wasmExports.before_shmem_exit)(e, t2);
    Module.___wasm_setjmp = (e, t2, r) => (Module.___wasm_setjmp = wasmExports.__wasm_setjmp)(e, t2, r);
    Module._cancel_before_shmem_exit = (e, t2) => (Module._cancel_before_shmem_exit = wasmExports.cancel_before_shmem_exit)(e, t2);
    Module._pg_re_throw = () => (Module._pg_re_throw = wasmExports.pg_re_throw)();
    Module._emscripten_longjmp = (e, t2) => (Module._emscripten_longjmp = wasmExports.emscripten_longjmp)(e, t2);
    Module._ConditionVariableBroadcast = (e) => (Module._ConditionVariableBroadcast = wasmExports.ConditionVariableBroadcast)(e);
    Module._datum_image_eq = (e, t2, r, a2) => (Module._datum_image_eq = wasmExports.datum_image_eq)(e, t2, r, a2);
    Module._time = (e) => (Module._time = wasmExports.time)(e);
    Module.__bt_check_natts = (e, t2, r, a2) => (Module.__bt_check_natts = wasmExports._bt_check_natts)(e, t2, r, a2);
    Module._strlcpy = (e, t2, r) => (Module._strlcpy = wasmExports.strlcpy)(e, t2, r);
    Module._strncpy = (e, t2, r) => (Module._strncpy = wasmExports.strncpy)(e, t2, r);
    Module._timestamptz_to_str = (e) => (Module._timestamptz_to_str = wasmExports.timestamptz_to_str)(e);
    Module._XLogRecGetBlockRefInfo = (e, t2, r, a2, o2) => (Module._XLogRecGetBlockRefInfo = wasmExports.XLogRecGetBlockRefInfo)(e, t2, r, a2, o2);
    Module._varstr_cmp = (e, t2, r, a2, o2) => (Module._varstr_cmp = wasmExports.varstr_cmp)(e, t2, r, a2, o2);
    Module._getBaseType = (e) => (Module._getBaseType = wasmExports.getBaseType)(e);
    Module._exprType = (e) => (Module._exprType = wasmExports.exprType)(e);
    Module._GetActiveSnapshot = () => (Module._GetActiveSnapshot = wasmExports.GetActiveSnapshot)();
    Module._errdetail_relkind_not_supported = (e) => (Module._errdetail_relkind_not_supported = wasmExports.errdetail_relkind_not_supported)(e);
    Module._table_openrv = (e, t2) => (Module._table_openrv = wasmExports.table_openrv)(e, t2);
    Module._table_slot_callbacks = (e) => (Module._table_slot_callbacks = wasmExports.table_slot_callbacks)(e);
    Module._clamp_row_est = (e) => (Module._clamp_row_est = wasmExports.clamp_row_est)(e);
    Module._pre_format_elog_string = (e, t2) => (Module._pre_format_elog_string = wasmExports.pre_format_elog_string)(e, t2);
    Module._format_elog_string = (e, t2) => (Module._format_elog_string = wasmExports.format_elog_string)(e, t2);
    Module._IsTransactionState = () => (Module._IsTransactionState = wasmExports.IsTransactionState)();
    Module._estimate_expression_value = (e, t2) => (Module._estimate_expression_value = wasmExports.estimate_expression_value)(e, t2);
    Module._SetConfigOption = (e, t2, r, a2) => (Module._SetConfigOption = wasmExports.SetConfigOption)(e, t2, r, a2);
    Module._XLogFlush = (e) => (Module._XLogFlush = wasmExports.XLogFlush)(e);
    Module._get_call_result_type = (e, t2, r) => (Module._get_call_result_type = wasmExports.get_call_result_type)(e, t2, r);
    Module._HeapTupleHeaderGetDatum = (e) => (Module._HeapTupleHeaderGetDatum = wasmExports.HeapTupleHeaderGetDatum)(e);
    Module._GenericXLogStart = (e) => (Module._GenericXLogStart = wasmExports.GenericXLogStart)(e);
    Module._GenericXLogRegisterBuffer = (e, t2, r) => (Module._GenericXLogRegisterBuffer = wasmExports.GenericXLogRegisterBuffer)(e, t2, r);
    Module._GenericXLogFinish = (e) => (Module._GenericXLogFinish = wasmExports.GenericXLogFinish)(e);
    Module._GenericXLogAbort = (e) => (Module._GenericXLogAbort = wasmExports.GenericXLogAbort)(e);
    Module._errmsg_plural = (e, t2, r, a2) => (Module._errmsg_plural = wasmExports.errmsg_plural)(e, t2, r, a2);
    Module._ReadNextMultiXactId = () => (Module._ReadNextMultiXactId = wasmExports.ReadNextMultiXactId)();
    Module._ReadMultiXactIdRange = (e, t2) => (Module._ReadMultiXactIdRange = wasmExports.ReadMultiXactIdRange)(e, t2);
    Module._MultiXactIdPrecedesOrEquals = (e, t2) => (Module._MultiXactIdPrecedesOrEquals = wasmExports.MultiXactIdPrecedesOrEquals)(e, t2);
    Module._init_MultiFuncCall = (e) => (Module._init_MultiFuncCall = wasmExports.init_MultiFuncCall)(e);
    Module._TupleDescGetAttInMetadata = (e) => (Module._TupleDescGetAttInMetadata = wasmExports.TupleDescGetAttInMetadata)(e);
    Module._per_MultiFuncCall = (e) => (Module._per_MultiFuncCall = wasmExports.per_MultiFuncCall)(e);
    Module._BuildTupleFromCStrings = (e, t2) => (Module._BuildTupleFromCStrings = wasmExports.BuildTupleFromCStrings)(e, t2);
    Module._end_MultiFuncCall = (e, t2) => (Module._end_MultiFuncCall = wasmExports.end_MultiFuncCall)(e, t2);
    Module._GetCurrentSubTransactionId = () => (Module._GetCurrentSubTransactionId = wasmExports.GetCurrentSubTransactionId)();
    Module._WaitForBackgroundWorkerShutdown = (e) => (Module._WaitForBackgroundWorkerShutdown = wasmExports.WaitForBackgroundWorkerShutdown)(e);
    Module._RegisterDynamicBackgroundWorker = (e, t2) => (Module._RegisterDynamicBackgroundWorker = wasmExports.RegisterDynamicBackgroundWorker)(e, t2);
    Module._appendBinaryStringInfo = (e, t2, r) => (Module._appendBinaryStringInfo = wasmExports.appendBinaryStringInfo)(e, t2, r);
    Module._pq_getmsgbyte = (e) => (Module._pq_getmsgbyte = wasmExports.pq_getmsgbyte)(e);
    Module._pq_getmsgint = (e, t2) => (Module._pq_getmsgint = wasmExports.pq_getmsgint)(e, t2);
    Module._pq_getmsgint64 = (e) => (Module._pq_getmsgint64 = wasmExports.pq_getmsgint64)(e);
    Module._die = (e) => (Module._die = wasmExports.die)(e);
    Module._pqsignal_be = (e, t2) => (Module._pqsignal_be = wasmExports.pqsignal_be)(e, t2);
    Module._BackgroundWorkerUnblockSignals = () => (Module._BackgroundWorkerUnblockSignals = wasmExports.BackgroundWorkerUnblockSignals)();
    Module._BackgroundWorkerInitializeConnectionByOid = (e, t2, r) => (Module._BackgroundWorkerInitializeConnectionByOid = wasmExports.BackgroundWorkerInitializeConnectionByOid)(e, t2, r);
    Module._GetDatabaseEncoding = () => (Module._GetDatabaseEncoding = wasmExports.GetDatabaseEncoding)();
    Module._StartTransactionCommand = () => (Module._StartTransactionCommand = wasmExports.StartTransactionCommand)();
    Module._CommitTransactionCommand = () => (Module._CommitTransactionCommand = wasmExports.CommitTransactionCommand)();
    Module._PushActiveSnapshot = (e) => (Module._PushActiveSnapshot = wasmExports.PushActiveSnapshot)(e);
    Module._PopActiveSnapshot = () => (Module._PopActiveSnapshot = wasmExports.PopActiveSnapshot)();
    Module._RmgrNotFound = (e) => (Module._RmgrNotFound = wasmExports.RmgrNotFound)(e);
    Module._InitMaterializedSRF = (e, t2) => (Module._InitMaterializedSRF = wasmExports.InitMaterializedSRF)(e, t2);
    Module._tuplestore_putvalues = (e, t2, r, a2) => (Module._tuplestore_putvalues = wasmExports.tuplestore_putvalues)(e, t2, r, a2);
    Module._pread = (e, t2, r, a2) => (Module._pread = wasmExports.pread)(e, t2, r, a2);
    Module._strspn = (e, t2) => (Module._strspn = wasmExports.strspn)(e, t2);
    Module._strtoll = (e, t2, r) => (Module._strtoll = wasmExports.strtoll)(e, t2, r);
    Module._AllocateFile = (e, t2) => (Module._AllocateFile = wasmExports.AllocateFile)(e, t2);
    Module._ferror = (e) => (Module._ferror = wasmExports.ferror)(e);
    Module._FreeFile = (e) => (Module._FreeFile = wasmExports.FreeFile)(e);
    Module._getpid = () => (Module._getpid = wasmExports.getpid)();
    Module._read = (e, t2, r) => (Module._read = wasmExports.read)(e, t2, r);
    Module._write = (e, t2, r) => (Module._write = wasmExports.write)(e, t2, r);
    Module._durable_rename = (e, t2, r) => (Module._durable_rename = wasmExports.durable_rename)(e, t2, r);
    Module._BlessTupleDesc = (e) => (Module._BlessTupleDesc = wasmExports.BlessTupleDesc)(e);
    Module._fstat = (e, t2) => (Module._fstat = wasmExports.fstat)(e, t2);
    Module._superuser_arg = (e) => (Module._superuser_arg = wasmExports.superuser_arg)(e);
    Module._wal_segment_close = (e) => (Module._wal_segment_close = wasmExports.wal_segment_close)(e);
    Module._wal_segment_open = (e, t2, r) => (Module._wal_segment_open = wasmExports.wal_segment_open)(e, t2, r);
    Module._XLogReaderAllocate = (e, t2, r, a2) => (Module._XLogReaderAllocate = wasmExports.XLogReaderAllocate)(e, t2, r, a2);
    Module._XLogReadRecord = (e, t2) => (Module._XLogReadRecord = wasmExports.XLogReadRecord)(e, t2);
    Module._XLogReaderFree = (e) => (Module._XLogReaderFree = wasmExports.XLogReaderFree)(e);
    Module._strtoull = (e, t2, r) => (Module._strtoull = wasmExports.strtoull)(e, t2, r);
    Module._access = (e, t2) => (Module._access = wasmExports.access)(e, t2);
    Module._IsAbortedTransactionBlockState = () => (Module._IsAbortedTransactionBlockState = wasmExports.IsAbortedTransactionBlockState)();
    Module._GetTopFullTransactionId = () => (Module._GetTopFullTransactionId = wasmExports.GetTopFullTransactionId)();
    Module._GetCurrentTransactionNestLevel = () => (Module._GetCurrentTransactionNestLevel = wasmExports.GetCurrentTransactionNestLevel)();
    Module._ResourceOwnerCreate = (e, t2) => (Module._ResourceOwnerCreate = wasmExports.ResourceOwnerCreate)(e, t2);
    Module._AbortCurrentTransaction = () => (Module._AbortCurrentTransaction = wasmExports.AbortCurrentTransaction)();
    Module._IsTransactionBlock = () => (Module._IsTransactionBlock = wasmExports.IsTransactionBlock)();
    Module._RegisterXactCallback = (e, t2) => (Module._RegisterXactCallback = wasmExports.RegisterXactCallback)(e, t2);
    Module._UnregisterXactCallback = (e, t2) => (Module._UnregisterXactCallback = wasmExports.UnregisterXactCallback)(e, t2);
    Module._RegisterSubXactCallback = (e, t2) => (Module._RegisterSubXactCallback = wasmExports.RegisterSubXactCallback)(e, t2);
    Module._BeginInternalSubTransaction = (e) => (Module._BeginInternalSubTransaction = wasmExports.BeginInternalSubTransaction)(e);
    Module._ReleaseCurrentSubTransaction = () => (Module._ReleaseCurrentSubTransaction = wasmExports.ReleaseCurrentSubTransaction)();
    Module._ResourceOwnerDelete = (e) => (Module._ResourceOwnerDelete = wasmExports.ResourceOwnerDelete)(e);
    Module._RollbackAndReleaseCurrentSubTransaction = () => (Module._RollbackAndReleaseCurrentSubTransaction = wasmExports.RollbackAndReleaseCurrentSubTransaction)();
    Module._pg_usleep = (e) => (Module._pg_usleep = wasmExports.pg_usleep)(e);
    Module._close = (e) => (Module._close = wasmExports.close)(e);
    Module._ReleaseExternalFD = () => (Module._ReleaseExternalFD = wasmExports.ReleaseExternalFD)();
    Module._GetDefaultCharSignedness = () => (Module._GetDefaultCharSignedness = wasmExports.GetDefaultCharSignedness)();
    Module._SplitIdentifierString = (e, t2, r) => (Module._SplitIdentifierString = wasmExports.SplitIdentifierString)(e, t2, r);
    Module._guc_malloc = (e, t2) => (Module._guc_malloc = wasmExports.guc_malloc)(e, t2);
    Module._find_option = (e, t2, r, a2) => (Module._find_option = wasmExports.find_option)(e, t2, r, a2);
    Module._gettimeofday = (e, t2) => (Module._gettimeofday = wasmExports.gettimeofday)(e, t2);
    Module._pg_strong_random = (e, t2) => (Module._pg_strong_random = wasmExports.pg_strong_random)(e, t2);
    Module._stat = (e, t2) => (Module._stat = wasmExports.stat)(e, t2);
    Module._GetFlushRecPtr = (e) => (Module._GetFlushRecPtr = wasmExports.GetFlushRecPtr)(e);
    Module._GetXLogReplayRecPtr = (e) => (Module._GetXLogReplayRecPtr = wasmExports.GetXLogReplayRecPtr)(e);
    Module._TimestampDifferenceMilliseconds = (e, t2) => (Module._TimestampDifferenceMilliseconds = wasmExports.TimestampDifferenceMilliseconds)(e, t2);
    Module._strtoul = (e, t2, r) => (Module._strtoul = wasmExports.strtoul)(e, t2, r);
    Module._readlink = (e, t2, r) => (Module._readlink = wasmExports.readlink)(e, t2, r);
    Module._pg_fprintf = (e, t2, r) => (Module._pg_fprintf = wasmExports.pg_fprintf)(e, t2, r);
    var _fflush = Module._fflush = (e) => (_fflush = Module._fflush = wasmExports.fflush)(e);
    Module._pgl_system = (e) => (Module._pgl_system = wasmExports.pgl_system)(e);
    Module._wait_result_to_str = (e) => (Module._wait_result_to_str = wasmExports.wait_result_to_str)(e);
    Module._replace_percent_placeholders = (e, t2, r, a2) => (Module._replace_percent_placeholders = wasmExports.replace_percent_placeholders)(e, t2, r, a2);
    Module._makeStringInfo = () => (Module._makeStringInfo = wasmExports.makeStringInfo)();
    Module._pg_toupper = (e) => (Module._pg_toupper = wasmExports.pg_toupper)(e);
    Module._numeric_in = (e) => (Module._numeric_in = wasmExports.numeric_in)(e);
    Module._DirectFunctionCall3Coll = (e, t2, r, a2, o2) => (Module._DirectFunctionCall3Coll = wasmExports.DirectFunctionCall3Coll)(e, t2, r, a2, o2);
    Module._palloc_extended = (e, t2) => (Module._palloc_extended = wasmExports.palloc_extended)(e, t2);
    Module._pg_vsnprintf = (e, t2, r, a2) => (Module._pg_vsnprintf = wasmExports.pg_vsnprintf)(e, t2, r, a2);
    Module._XLogFindNextRecord = (e, t2) => (Module._XLogFindNextRecord = wasmExports.XLogFindNextRecord)(e, t2);
    Module._RestoreBlockImage = (e, t2, r) => (Module._RestoreBlockImage = wasmExports.RestoreBlockImage)(e, t2, r);
    Module._timestamptz_in = (e) => (Module._timestamptz_in = wasmExports.timestamptz_in)(e);
    Module._fscanf = (e, t2, r) => (Module._fscanf = wasmExports.fscanf)(e, t2, r);
    Module._symlink = (e, t2) => (Module._symlink = wasmExports.symlink)(e, t2);
    Module._ConditionVariableTimedSleep = (e, t2, r) => (Module._ConditionVariableTimedSleep = wasmExports.ConditionVariableTimedSleep)(e, t2, r);
    Module._ParseDateTime = (e, t2, r, a2, o2, _3, s2) => (Module._ParseDateTime = wasmExports.ParseDateTime)(e, t2, r, a2, o2, _3, s2);
    Module._DecodeDateTime = (e, t2, r, a2, o2, _3, s2, n2) => (Module._DecodeDateTime = wasmExports.DecodeDateTime)(e, t2, r, a2, o2, _3, s2, n2);
    Module._tm2timestamp = (e, t2, r, a2) => (Module._tm2timestamp = wasmExports.tm2timestamp)(e, t2, r, a2);
    Module._XLogRecStoreStats = (e, t2) => (Module._XLogRecStoreStats = wasmExports.XLogRecStoreStats)(e, t2);
    Module._hash_get_num_entries = (e) => (Module._hash_get_num_entries = wasmExports.hash_get_num_entries)(e);
    Module._read_local_xlog_page_no_wait = (e, t2, r, a2, o2) => (Module._read_local_xlog_page_no_wait = wasmExports.read_local_xlog_page_no_wait)(e, t2, r, a2, o2);
    Module._escape_json_with_len = (e, t2, r) => (Module._escape_json_with_len = wasmExports.escape_json_with_len)(e, t2, r);
    Module._BufFileSeek = (e, t2, r, a2) => (Module._BufFileSeek = wasmExports.BufFileSeek)(e, t2, r, a2);
    Module._lstat = (e, t2) => (Module._lstat = wasmExports.lstat)(e, t2);
    Module._destroyStringInfo = (e) => (Module._destroyStringInfo = wasmExports.destroyStringInfo)(e);
    Module._list_sort = (e, t2) => (Module._list_sort = wasmExports.list_sort)(e, t2);
    Module._pgl_geteuid = () => (Module._pgl_geteuid = wasmExports.pgl_geteuid)();
    Module._getegid = () => (Module._getegid = wasmExports.getegid)();
    Module._pg_checksum_page = (e, t2) => (Module._pg_checksum_page = wasmExports.pg_checksum_page)(e, t2);
    Module._CreateDestReceiver = (e) => (Module._CreateDestReceiver = wasmExports.CreateDestReceiver)(e);
    Module._bbsink_forward_end_archive = (e) => (Module._bbsink_forward_end_archive = wasmExports.bbsink_forward_end_archive)(e);
    Module._bbsink_forward_begin_manifest = (e) => (Module._bbsink_forward_begin_manifest = wasmExports.bbsink_forward_begin_manifest)(e);
    Module._bbsink_forward_end_manifest = (e) => (Module._bbsink_forward_end_manifest = wasmExports.bbsink_forward_end_manifest)(e);
    Module._bbsink_forward_end_backup = (e, t2, r) => (Module._bbsink_forward_end_backup = wasmExports.bbsink_forward_end_backup)(e, t2, r);
    Module._bbsink_forward_cleanup = (e) => (Module._bbsink_forward_cleanup = wasmExports.bbsink_forward_cleanup)(e);
    Module._MemoryContextAllocExtended = (e, t2, r) => (Module._MemoryContextAllocExtended = wasmExports.MemoryContextAllocExtended)(e, t2, r);
    Module._appendStringInfoVA = (e, t2, r) => (Module._appendStringInfoVA = wasmExports.appendStringInfoVA)(e, t2, r);
    Module._list_concat = (e, t2) => (Module._list_concat = wasmExports.list_concat)(e, t2);
    Module._strrchr = (e, t2) => (Module._strrchr = wasmExports.strrchr)(e, t2);
    Module._bbsink_forward_begin_backup = (e) => (Module._bbsink_forward_begin_backup = wasmExports.bbsink_forward_begin_backup)(e);
    Module._bbsink_forward_archive_contents = (e, t2) => (Module._bbsink_forward_archive_contents = wasmExports.bbsink_forward_archive_contents)(e, t2);
    Module._bbsink_forward_begin_archive = (e, t2) => (Module._bbsink_forward_begin_archive = wasmExports.bbsink_forward_begin_archive)(e, t2);
    Module._bbsink_forward_manifest_contents = (e, t2) => (Module._bbsink_forward_manifest_contents = wasmExports.bbsink_forward_manifest_contents)(e, t2);
    Module._has_privs_of_role = (e, t2) => (Module._has_privs_of_role = wasmExports.has_privs_of_role)(e, t2);
    Module._BaseBackupAddTarget = (e, t2, r) => (Module._BaseBackupAddTarget = wasmExports.BaseBackupAddTarget)(e, t2, r);
    Module._list_copy = (e) => (Module._list_copy = wasmExports.list_copy)(e);
    Module._tuplestore_puttuple = (e, t2) => (Module._tuplestore_puttuple = wasmExports.tuplestore_puttuple)(e, t2);
    Module._isatty = (e) => (Module._isatty = wasmExports.isatty)(e);
    Module._makeRangeVar = (e, t2, r) => (Module._makeRangeVar = wasmExports.makeRangeVar)(e, t2, r);
    Module._DefineIndex = (e, t2, r, a2, o2, _3, s2, n2, l2, d2, p2, m2) => (Module._DefineIndex = wasmExports.DefineIndex)(e, t2, r, a2, o2, _3, s2, n2, l2, d2, p2, m2);
    Module._getc = (e) => (Module._getc = wasmExports.getc)(e);
    Module._fread = (e, t2, r, a2) => (Module._fread = wasmExports.fread)(e, t2, r, a2);
    Module._clearerr = (e) => (Module._clearerr = wasmExports.clearerr)(e);
    Module._copyObjectImpl = (e) => (Module._copyObjectImpl = wasmExports.copyObjectImpl)(e);
    Module._get_object_address = (e, t2, r, a2, o2, _3) => (Module._get_object_address = wasmExports.get_object_address)(e, t2, r, a2, o2, _3);
    Module._lappend_oid = (e, t2) => (Module._lappend_oid = wasmExports.lappend_oid)(e, t2);
    Module._makeTypeNameFromNameList = (e) => (Module._makeTypeNameFromNameList = wasmExports.makeTypeNameFromNameList)(e);
    Module._SearchSysCache2 = (e, t2, r) => (Module._SearchSysCache2 = wasmExports.SearchSysCache2)(e, t2, r);
    Module._SysCacheGetAttr = (e, t2, r, a2) => (Module._SysCacheGetAttr = wasmExports.SysCacheGetAttr)(e, t2, r, a2);
    Module._CatalogTupleUpdate = (e, t2, r) => (Module._CatalogTupleUpdate = wasmExports.CatalogTupleUpdate)(e, t2, r);
    Module._get_attnum = (e, t2) => (Module._get_attnum = wasmExports.get_attnum)(e, t2);
    Module._get_rel_name = (e) => (Module._get_rel_name = wasmExports.get_rel_name)(e);
    Module._CatalogTupleDelete = (e, t2) => (Module._CatalogTupleDelete = wasmExports.CatalogTupleDelete)(e, t2);
    Module._get_namespace_oid = (e, t2) => (Module._get_namespace_oid = wasmExports.get_namespace_oid)(e, t2);
    Module._SearchSysCache3 = (e, t2, r, a2) => (Module._SearchSysCache3 = wasmExports.SearchSysCache3)(e, t2, r, a2);
    Module._performDeletion = (e, t2, r) => (Module._performDeletion = wasmExports.performDeletion)(e, t2, r);
    Module._CatalogTupleInsert = (e, t2) => (Module._CatalogTupleInsert = wasmExports.CatalogTupleInsert)(e, t2);
    Module._recordDependencyOn = (e, t2, r) => (Module._recordDependencyOn = wasmExports.recordDependencyOn)(e, t2, r);
    Module._get_element_type = (e) => (Module._get_element_type = wasmExports.get_element_type)(e);
    Module._object_aclcheck = (e, t2, r, a2) => (Module._object_aclcheck = wasmExports.object_aclcheck)(e, t2, r, a2);
    Module._isTempNamespace = (e) => (Module._isTempNamespace = wasmExports.isTempNamespace)(e);
    Module._superuser = () => (Module._superuser = wasmExports.superuser)();
    Module._SearchSysCacheAttName = (e, t2) => (Module._SearchSysCacheAttName = wasmExports.SearchSysCacheAttName)(e, t2);
    Module._new_object_addresses = () => (Module._new_object_addresses = wasmExports.new_object_addresses)();
    Module._free_object_addresses = (e) => (Module._free_object_addresses = wasmExports.free_object_addresses)(e);
    Module._performMultipleDeletions = (e, t2, r) => (Module._performMultipleDeletions = wasmExports.performMultipleDeletions)(e, t2, r);
    Module._recordDependencyOnExpr = (e, t2, r, a2) => (Module._recordDependencyOnExpr = wasmExports.recordDependencyOnExpr)(e, t2, r, a2);
    Module._query_tree_walker_impl = (e, t2, r, a2) => (Module._query_tree_walker_impl = wasmExports.query_tree_walker_impl)(e, t2, r, a2);
    Module._expression_tree_walker_impl = (e, t2, r) => (Module._expression_tree_walker_impl = wasmExports.expression_tree_walker_impl)(e, t2, r);
    Module._add_exact_object_address = (e, t2) => (Module._add_exact_object_address = wasmExports.add_exact_object_address)(e, t2);
    Module._get_rel_relkind = (e) => (Module._get_rel_relkind = wasmExports.get_rel_relkind)(e);
    Module._get_typtype = (e) => (Module._get_typtype = wasmExports.get_typtype)(e);
    Module._list_delete_last = (e) => (Module._list_delete_last = wasmExports.list_delete_last)(e);
    Module._type_is_collatable = (e) => (Module._type_is_collatable = wasmExports.type_is_collatable)(e);
    Module._CatalogOpenIndexes = (e) => (Module._CatalogOpenIndexes = wasmExports.CatalogOpenIndexes)(e);
    Module._CatalogCloseIndexes = (e) => (Module._CatalogCloseIndexes = wasmExports.CatalogCloseIndexes)(e);
    Module._get_relname_relid = (e, t2) => (Module._get_relname_relid = wasmExports.get_relname_relid)(e, t2);
    Module._GetSysCacheOid = (e, t2, r, a2, o2, _3) => (Module._GetSysCacheOid = wasmExports.GetSysCacheOid)(e, t2, r, a2, o2, _3);
    Module._CheckTableNotInUse = (e, t2) => (Module._CheckTableNotInUse = wasmExports.CheckTableNotInUse)(e, t2);
    Module._construct_array = (e, t2, r, a2, o2, _3) => (Module._construct_array = wasmExports.construct_array)(e, t2, r, a2, o2, _3);
    Module._make_parsestate = (e) => (Module._make_parsestate = wasmExports.make_parsestate)(e);
    Module._addRangeTableEntryForRelation = (e, t2, r, a2, o2, _3) => (Module._addRangeTableEntryForRelation = wasmExports.addRangeTableEntryForRelation)(e, t2, r, a2, o2, _3);
    Module._addNSItemToQuery = (e, t2, r, a2, o2) => (Module._addNSItemToQuery = wasmExports.addNSItemToQuery)(e, t2, r, a2, o2);
    Module._transformExpr = (e, t2, r) => (Module._transformExpr = wasmExports.transformExpr)(e, t2, r);
    Module._coerce_to_boolean = (e, t2, r) => (Module._coerce_to_boolean = wasmExports.coerce_to_boolean)(e, t2, r);
    Module._assign_expr_collations = (e, t2) => (Module._assign_expr_collations = wasmExports.assign_expr_collations)(e, t2);
    Module._equal = (e, t2) => (Module._equal = wasmExports.equal)(e, t2);
    Module._pull_var_clause = (e, t2) => (Module._pull_var_clause = wasmExports.pull_var_clause)(e, t2);
    Module._get_attname = (e, t2, r) => (Module._get_attname = wasmExports.get_attname)(e, t2, r);
    Module._coerce_to_target_type = (e, t2, r, a2, o2, _3, s2, n2) => (Module._coerce_to_target_type = wasmExports.coerce_to_target_type)(e, t2, r, a2, o2, _3, s2, n2);
    Module._nodeToString = (e) => (Module._nodeToString = wasmExports.nodeToString)(e);
    Module._lappend_int = (e, t2) => (Module._lappend_int = wasmExports.lappend_int)(e, t2);
    Module._list_delete_nth_cell = (e, t2) => (Module._list_delete_nth_cell = wasmExports.list_delete_nth_cell)(e, t2);
    Module._CatalogTupleInsertWithInfo = (e, t2, r) => (Module._CatalogTupleInsertWithInfo = wasmExports.CatalogTupleInsertWithInfo)(e, t2, r);
    Module._buildoidvector = (e, t2) => (Module._buildoidvector = wasmExports.buildoidvector)(e, t2);
    Module._parser_errposition = (e, t2) => (Module._parser_errposition = wasmExports.parser_errposition)(e, t2);
    Module._exprLocation = (e) => (Module._exprLocation = wasmExports.exprLocation)(e);
    Module._exprTypmod = (e) => (Module._exprTypmod = wasmExports.exprTypmod)(e);
    Module._get_base_element_type = (e) => (Module._get_base_element_type = wasmExports.get_base_element_type)(e);
    Module._SystemFuncName = (e) => (Module._SystemFuncName = wasmExports.SystemFuncName)(e);
    Module._CreateTrigger = (e, t2, r, a2, o2, _3, s2, n2, l2, d2, p2, m2) => (Module._CreateTrigger = wasmExports.CreateTrigger)(e, t2, r, a2, o2, _3, s2, n2, l2, d2, p2, m2);
    Module._plan_create_index_workers = (e, t2) => (Module._plan_create_index_workers = wasmExports.plan_create_index_workers)(e, t2);
    Module._tuplesort_begin_datum = (e, t2, r, a2, o2, _3, s2) => (Module._tuplesort_begin_datum = wasmExports.tuplesort_begin_datum)(e, t2, r, a2, o2, _3, s2);
    Module._tuplesort_putdatum = (e, t2, r) => (Module._tuplesort_putdatum = wasmExports.tuplesort_putdatum)(e, t2, r);
    Module._get_rel_namespace = (e) => (Module._get_rel_namespace = wasmExports.get_rel_namespace)(e);
    Module._ExecOpenIndices = (e, t2) => (Module._ExecOpenIndices = wasmExports.ExecOpenIndices)(e, t2);
    Module._ExecCloseIndices = (e) => (Module._ExecCloseIndices = wasmExports.ExecCloseIndices)(e);
    Module._ConditionalLockRelationOid = (e, t2) => (Module._ConditionalLockRelationOid = wasmExports.ConditionalLockRelationOid)(e, t2);
    Module._RelnameGetRelid = (e) => (Module._RelnameGetRelid = wasmExports.RelnameGetRelid)(e);
    Module._get_relkind_objtype = (e) => (Module._get_relkind_objtype = wasmExports.get_relkind_objtype)(e);
    Module._RelationIsVisible = (e) => (Module._RelationIsVisible = wasmExports.RelationIsVisible)(e);
    Module._TypenameGetTypid = (e) => (Module._TypenameGetTypid = wasmExports.TypenameGetTypid)(e);
    Module._get_func_arg_info = (e, t2, r, a2) => (Module._get_func_arg_info = wasmExports.get_func_arg_info)(e, t2, r, a2);
    Module._NameListToString = (e) => (Module._NameListToString = wasmExports.NameListToString)(e);
    Module._OpernameGetOprid = (e, t2, r) => (Module._OpernameGetOprid = wasmExports.OpernameGetOprid)(e, t2, r);
    Module._get_ts_config_oid = (e, t2) => (Module._get_ts_config_oid = wasmExports.get_ts_config_oid)(e, t2);
    Module._makeRangeVarFromNameList = (e) => (Module._makeRangeVarFromNameList = wasmExports.makeRangeVarFromNameList)(e);
    Module._quote_identifier = (e) => (Module._quote_identifier = wasmExports.quote_identifier)(e);
    Module._atoi = (e) => (Module._atoi = wasmExports.atoi)(e);
    Module._GetSearchPathMatcher = (e) => (Module._GetSearchPathMatcher = wasmExports.GetSearchPathMatcher)(e);
    Module._SearchPathMatchesCurrentEnvironment = (e) => (Module._SearchPathMatchesCurrentEnvironment = wasmExports.SearchPathMatchesCurrentEnvironment)(e);
    Module._get_collation_oid = (e, t2) => (Module._get_collation_oid = wasmExports.get_collation_oid)(e, t2);
    Module._GetDatabaseEncodingName = () => (Module._GetDatabaseEncodingName = wasmExports.GetDatabaseEncodingName)();
    Module._CacheRegisterSyscacheCallback = (e, t2, r) => (Module._CacheRegisterSyscacheCallback = wasmExports.CacheRegisterSyscacheCallback)(e, t2, r);
    Module._fetch_search_path = (e) => (Module._fetch_search_path = wasmExports.fetch_search_path)(e);
    Module._get_extension_oid = (e, t2) => (Module._get_extension_oid = wasmExports.get_extension_oid)(e, t2);
    Module._get_role_oid = (e, t2) => (Module._get_role_oid = wasmExports.get_role_oid)(e, t2);
    Module._get_am_oid = (e, t2) => (Module._get_am_oid = wasmExports.get_am_oid)(e, t2);
    Module._GetForeignServerByName = (e, t2) => (Module._GetForeignServerByName = wasmExports.GetForeignServerByName)(e, t2);
    Module._typeStringToTypeName = (e, t2) => (Module._typeStringToTypeName = wasmExports.typeStringToTypeName)(e, t2);
    Module._makeFloat = (e) => (Module._makeFloat = wasmExports.makeFloat)(e);
    Module._list_make2_impl = (e, t2, r) => (Module._list_make2_impl = wasmExports.list_make2_impl)(e, t2, r);
    Module._check_object_ownership = (e, t2, r, a2, o2) => (Module._check_object_ownership = wasmExports.check_object_ownership)(e, t2, r, a2, o2);
    Module._GetUserNameFromId = (e, t2) => (Module._GetUserNameFromId = wasmExports.GetUserNameFromId)(e, t2);
    Module._format_type_extended = (e, t2, r) => (Module._format_type_extended = wasmExports.format_type_extended)(e, t2, r);
    Module._quote_qualified_identifier = (e, t2) => (Module._quote_qualified_identifier = wasmExports.quote_qualified_identifier)(e, t2);
    Module._get_tablespace_name = (e) => (Module._get_tablespace_name = wasmExports.get_tablespace_name)(e);
    Module._GetForeignServerExtended = (e, t2) => (Module._GetForeignServerExtended = wasmExports.GetForeignServerExtended)(e, t2);
    Module._GetForeignServer = (e) => (Module._GetForeignServer = wasmExports.GetForeignServer)(e);
    Module._get_extension_name = (e) => (Module._get_extension_name = wasmExports.get_extension_name)(e);
    Module._construct_empty_array = (e) => (Module._construct_empty_array = wasmExports.construct_empty_array)(e);
    Module._format_type_be_qualified = (e) => (Module._format_type_be_qualified = wasmExports.format_type_be_qualified)(e);
    Module._get_namespace_name_or_temp = (e) => (Module._get_namespace_name_or_temp = wasmExports.get_namespace_name_or_temp)(e);
    Module._list_make3_impl = (e, t2, r, a2) => (Module._list_make3_impl = wasmExports.list_make3_impl)(e, t2, r, a2);
    Module._construct_md_array = (e, t2, r, a2, o2, _3, s2, n2, l2) => (Module._construct_md_array = wasmExports.construct_md_array)(e, t2, r, a2, o2, _3, s2, n2, l2);
    Module._pull_varattnos = (e, t2, r) => (Module._pull_varattnos = wasmExports.pull_varattnos)(e, t2, r);
    Module._makeBoolExpr = (e, t2, r) => (Module._makeBoolExpr = wasmExports.makeBoolExpr)(e, t2, r);
    Module._eval_const_expressions = (e, t2) => (Module._eval_const_expressions = wasmExports.eval_const_expressions)(e, t2);
    Module._get_func_name = (e) => (Module._get_func_name = wasmExports.get_func_name)(e);
    Module._construct_array_builtin = (e, t2, r) => (Module._construct_array_builtin = wasmExports.construct_array_builtin)(e, t2, r);
    Module._makeObjectName = (e, t2, r) => (Module._makeObjectName = wasmExports.makeObjectName)(e, t2, r);
    Module._get_primary_key_attnos = (e, t2, r) => (Module._get_primary_key_attnos = wasmExports.get_primary_key_attnos)(e, t2, r);
    Module._check_functional_grouping = (e, t2, r, a2, o2) => (Module._check_functional_grouping = wasmExports.check_functional_grouping)(e, t2, r, a2, o2);
    Module._bms_is_subset = (e, t2) => (Module._bms_is_subset = wasmExports.bms_is_subset)(e, t2);
    Module._getExtensionOfObject = (e, t2) => (Module._getExtensionOfObject = wasmExports.getExtensionOfObject)(e, t2);
    Module._find_inheritance_children = (e, t2) => (Module._find_inheritance_children = wasmExports.find_inheritance_children)(e, t2);
    Module._find_all_inheritors = (e, t2, r) => (Module._find_all_inheritors = wasmExports.find_all_inheritors)(e, t2, r);
    Module._has_superclass = (e) => (Module._has_superclass = wasmExports.has_superclass)(e);
    Module._strstr = (e, t2) => (Module._strstr = wasmExports.strstr)(e, t2);
    Module._memchr = (e, t2, r) => (Module._memchr = wasmExports.memchr)(e, t2, r);
    Module._CheckFunctionValidatorAccess = (e, t2) => (Module._CheckFunctionValidatorAccess = wasmExports.CheckFunctionValidatorAccess)(e, t2);
    Module._AcquireRewriteLocks = (e, t2, r) => (Module._AcquireRewriteLocks = wasmExports.AcquireRewriteLocks)(e, t2, r);
    Module._pg_parse_query = (e) => (Module._pg_parse_query = wasmExports.pg_parse_query)(e);
    Module._get_func_result_type = (e, t2, r) => (Module._get_func_result_type = wasmExports.get_func_result_type)(e, t2, r);
    Module._function_parse_error_transpose = (e) => (Module._function_parse_error_transpose = wasmExports.function_parse_error_transpose)(e);
    Module._geterrposition = () => (Module._geterrposition = wasmExports.geterrposition)();
    Module._getinternalerrposition = () => (Module._getinternalerrposition = wasmExports.getinternalerrposition)();
    Module._pg_mblen_cstr = (e) => (Module._pg_mblen_cstr = wasmExports.pg_mblen_cstr)(e);
    Module._pg_mbstrlen_with_len = (e, t2) => (Module._pg_mbstrlen_with_len = wasmExports.pg_mbstrlen_with_len)(e, t2);
    Module._errposition = (e) => (Module._errposition = wasmExports.errposition)(e);
    Module._internalerrposition = (e) => (Module._internalerrposition = wasmExports.internalerrposition)(e);
    Module._internalerrquery = (e) => (Module._internalerrquery = wasmExports.internalerrquery)(e);
    Module._bms_num_members = (e) => (Module._bms_num_members = wasmExports.bms_num_members)(e);
    Module._quote_literal_cstr = (e) => (Module._quote_literal_cstr = wasmExports.quote_literal_cstr)(e);
    Module._get_array_type = (e) => (Module._get_array_type = wasmExports.get_array_type)(e);
    Module._pnstrdup = (e, t2) => (Module._pnstrdup = wasmExports.pnstrdup)(e, t2);
    Module._smgrtruncate = (e, t2, r, a2, o2) => (Module._smgrtruncate = wasmExports.smgrtruncate)(e, t2, r, a2, o2);
    Module._smgrreadv = (e, t2, r, a2, o2) => (Module._smgrreadv = wasmExports.smgrreadv)(e, t2, r, a2, o2);
    Module._NewRelationCreateToastTable = (e, t2) => (Module._NewRelationCreateToastTable = wasmExports.NewRelationCreateToastTable)(e, t2);
    Module._transformStmt = (e, t2) => (Module._transformStmt = wasmExports.transformStmt)(e, t2);
    Module._free_parsestate = (e) => (Module._free_parsestate = wasmExports.free_parsestate)(e);
    Module._makeFromExpr = (e, t2) => (Module._makeFromExpr = wasmExports.makeFromExpr)(e, t2);
    Module._assign_query_collations = (e, t2) => (Module._assign_query_collations = wasmExports.assign_query_collations)(e, t2);
    Module._ParseFuncOrColumn = (e, t2, r, a2, o2, _3, s2) => (Module._ParseFuncOrColumn = wasmExports.ParseFuncOrColumn)(e, t2, r, a2, o2, _3, s2);
    Module._exprCollation = (e) => (Module._exprCollation = wasmExports.exprCollation)(e);
    Module._transformSortClause = (e, t2, r, a2, o2) => (Module._transformSortClause = wasmExports.transformSortClause)(e, t2, r, a2, o2);
    Module._transformDistinctClause = (e, t2, r, a2) => (Module._transformDistinctClause = wasmExports.transformDistinctClause)(e, t2, r, a2);
    Module._makeTargetEntry = (e, t2, r, a2) => (Module._makeTargetEntry = wasmExports.makeTargetEntry)(e, t2, r, a2);
    Module._select_common_type = (e, t2, r, a2) => (Module._select_common_type = wasmExports.select_common_type)(e, t2, r, a2);
    Module._coerce_to_common_type = (e, t2, r, a2) => (Module._coerce_to_common_type = wasmExports.coerce_to_common_type)(e, t2, r, a2);
    Module._select_common_collation = (e, t2, r) => (Module._select_common_collation = wasmExports.select_common_collation)(e, t2, r);
    Module._contain_vars_of_level = (e, t2) => (Module._contain_vars_of_level = wasmExports.contain_vars_of_level)(e, t2);
    Module._expandNSItemAttrs = (e, t2, r, a2, o2) => (Module._expandNSItemAttrs = wasmExports.expandNSItemAttrs)(e, t2, r, a2, o2);
    Module._makeAlias = (e, t2) => (Module._makeAlias = wasmExports.makeAlias)(e, t2);
    Module._addRangeTableEntryForSubquery = (e, t2, r, a2, o2) => (Module._addRangeTableEntryForSubquery = wasmExports.addRangeTableEntryForSubquery)(e, t2, r, a2, o2);
    Module._assign_list_collations = (e, t2) => (Module._assign_list_collations = wasmExports.assign_list_collations)(e, t2);
    Module._expandNSItemVars = (e, t2, r, a2, o2) => (Module._expandNSItemVars = wasmExports.expandNSItemVars)(e, t2, r, a2, o2);
    Module._markTargetListOrigins = (e, t2) => (Module._markTargetListOrigins = wasmExports.markTargetListOrigins)(e, t2);
    Module._addRangeTableEntryForJoin = (e, t2, r, a2, o2, _3, s2, n2, l2, d2, p2) => (Module._addRangeTableEntryForJoin = wasmExports.addRangeTableEntryForJoin)(e, t2, r, a2, o2, _3, s2, n2, l2, d2, p2);
    Module._list_truncate = (e, t2) => (Module._list_truncate = wasmExports.list_truncate)(e, t2);
    Module._makeVar = (e, t2, r, a2, o2, _3) => (Module._makeVar = wasmExports.makeVar)(e, t2, r, a2, o2, _3);
    Module._makeNullConst = (e, t2, r) => (Module._makeNullConst = wasmExports.makeNullConst)(e, t2, r);
    Module._get_sort_group_operators = (e, t2, r, a2, o2, _3, s2, n2) => (Module._get_sort_group_operators = wasmExports.get_sort_group_operators)(e, t2, r, a2, o2, _3, s2, n2);
    Module._refnameNamespaceItem = (e, t2, r, a2, o2) => (Module._refnameNamespaceItem = wasmExports.refnameNamespaceItem)(e, t2, r, a2, o2);
    Module._setup_parser_errposition_callback = (e, t2, r) => (Module._setup_parser_errposition_callback = wasmExports.setup_parser_errposition_callback)(e, t2, r);
    Module._cancel_parser_errposition_callback = (e) => (Module._cancel_parser_errposition_callback = wasmExports.cancel_parser_errposition_callback)(e);
    Module._locate_var_of_level = (e, t2) => (Module._locate_var_of_level = wasmExports.locate_var_of_level)(e, t2);
    Module._makeBoolean = (e) => (Module._makeBoolean = wasmExports.makeBoolean)(e);
    Module._makeInteger = (e) => (Module._makeInteger = wasmExports.makeInteger)(e);
    Module._makeSimpleA_Expr = (e, t2, r, a2, o2) => (Module._makeSimpleA_Expr = wasmExports.makeSimpleA_Expr)(e, t2, r, a2, o2);
    Module._makeTypeName = (e) => (Module._makeTypeName = wasmExports.makeTypeName)(e);
    Module._SystemTypeName = (e) => (Module._SystemTypeName = wasmExports.SystemTypeName)(e);
    Module._makeFuncCall = (e, t2, r, a2) => (Module._makeFuncCall = wasmExports.makeFuncCall)(e, t2, r, a2);
    Module._makeA_Expr = (e, t2, r, a2, o2) => (Module._makeA_Expr = wasmExports.makeA_Expr)(e, t2, r, a2, o2);
    Module._list_make4_impl = (e, t2, r, a2, o2) => (Module._list_make4_impl = wasmExports.list_make4_impl)(e, t2, r, a2, o2);
    Module._addTargetToSortList = (e, t2, r, a2, o2) => (Module._addTargetToSortList = wasmExports.addTargetToSortList)(e, t2, r, a2, o2);
    Module._locate_agg_of_level = (e, t2) => (Module._locate_agg_of_level = wasmExports.locate_agg_of_level)(e, t2);
    Module._list_intersection_int = (e, t2) => (Module._list_intersection_int = wasmExports.list_intersection_int)(e, t2);
    Module._get_sortgroupclause_tle = (e, t2) => (Module._get_sortgroupclause_tle = wasmExports.get_sortgroupclause_tle)(e, t2);
    Module._flatten_join_alias_vars = (e, t2, r) => (Module._flatten_join_alias_vars = wasmExports.flatten_join_alias_vars)(e, t2, r);
    Module._list_member_int = (e, t2) => (Module._list_member_int = wasmExports.list_member_int)(e, t2);
    Module._list_union_int = (e, t2) => (Module._list_union_int = wasmExports.list_union_int)(e, t2);
    Module._makeFuncExpr = (e, t2, r, a2, o2, _3) => (Module._makeFuncExpr = wasmExports.makeFuncExpr)(e, t2, r, a2, o2, _3);
    Module._get_rte_attribute_name = (e, t2) => (Module._get_rte_attribute_name = wasmExports.get_rte_attribute_name)(e, t2);
    Module._expression_tree_mutator_impl = (e, t2, r) => (Module._expression_tree_mutator_impl = wasmExports.expression_tree_mutator_impl)(e, t2, r);
    Module._checkNameSpaceConflicts = (e, t2, r) => (Module._checkNameSpaceConflicts = wasmExports.checkNameSpaceConflicts)(e, t2, r);
    Module._addRangeTableEntryForENR = (e, t2, r) => (Module._addRangeTableEntryForENR = wasmExports.addRangeTableEntryForENR)(e, t2, r);
    Module._addRangeTableEntry = (e, t2, r, a2, o2) => (Module._addRangeTableEntry = wasmExports.addRangeTableEntry)(e, t2, r, a2, o2);
    Module._FigureColname = (e) => (Module._FigureColname = wasmExports.FigureColname)(e);
    Module._coerce_to_specific_type = (e, t2, r, a2) => (Module._coerce_to_specific_type = wasmExports.coerce_to_specific_type)(e, t2, r, a2);
    Module._typenameTypeIdAndMod = (e, t2, r, a2) => (Module._typenameTypeIdAndMod = wasmExports.typenameTypeIdAndMod)(e, t2, r, a2);
    Module._get_typcollation = (e) => (Module._get_typcollation = wasmExports.get_typcollation)(e);
    Module._markNullableIfNeeded = (e, t2) => (Module._markNullableIfNeeded = wasmExports.markNullableIfNeeded)(e, t2);
    Module._markVarForSelectPriv = (e, t2) => (Module._markVarForSelectPriv = wasmExports.markVarForSelectPriv)(e, t2);
    Module._coerce_type = (e, t2, r, a2, o2, _3, s2, n2) => (Module._coerce_type = wasmExports.coerce_type)(e, t2, r, a2, o2, _3, s2, n2);
    Module._LookupFuncName = (e, t2, r, a2) => (Module._LookupFuncName = wasmExports.LookupFuncName)(e, t2, r, a2);
    Module._addRangeTableEntryForFunction = (e, t2, r, a2, o2, _3, s2) => (Module._addRangeTableEntryForFunction = wasmExports.addRangeTableEntryForFunction)(e, t2, r, a2, o2, _3, s2);
    Module._parserOpenTable = (e, t2, r) => (Module._parserOpenTable = wasmExports.parserOpenTable)(e, t2, r);
    Module._strip_implicit_coercions = (e) => (Module._strip_implicit_coercions = wasmExports.strip_implicit_coercions)(e);
    Module._colNameToVar = (e, t2, r, a2) => (Module._colNameToVar = wasmExports.colNameToVar)(e, t2, r, a2);
    Module._op_hashjoinable = (e, t2) => (Module._op_hashjoinable = wasmExports.op_hashjoinable)(e, t2);
    Module._get_commutator = (e) => (Module._get_commutator = wasmExports.get_commutator)(e);
    Module._can_coerce_type = (e, t2, r, a2) => (Module._can_coerce_type = wasmExports.can_coerce_type)(e, t2, r, a2);
    Module._get_sortgroupref_tle = (e, t2) => (Module._get_sortgroupref_tle = wasmExports.get_sortgroupref_tle)(e, t2);
    Module._assignSortGroupRef = (e, t2) => (Module._assignSortGroupRef = wasmExports.assignSortGroupRef)(e, t2);
    Module._targetIsInSortList = (e, t2, r) => (Module._targetIsInSortList = wasmExports.targetIsInSortList)(e, t2, r);
    Module._contain_aggs_of_level = (e, t2) => (Module._contain_aggs_of_level = wasmExports.contain_aggs_of_level)(e, t2);
    Module._find_coercion_pathway = (e, t2, r, a2) => (Module._find_coercion_pathway = wasmExports.find_coercion_pathway)(e, t2, r, a2);
    Module._typeidType = (e) => (Module._typeidType = wasmExports.typeidType)(e);
    Module._typeTypeCollation = (e) => (Module._typeTypeCollation = wasmExports.typeTypeCollation)(e);
    Module._typeLen = (e) => (Module._typeLen = wasmExports.typeLen)(e);
    Module._typeByVal = (e) => (Module._typeByVal = wasmExports.typeByVal)(e);
    Module._makeConst = (e, t2, r, a2, o2, _3, s2) => (Module._makeConst = wasmExports.makeConst)(e, t2, r, a2, o2, _3, s2);
    Module._lookup_rowtype_tupdesc = (e, t2) => (Module._lookup_rowtype_tupdesc = wasmExports.lookup_rowtype_tupdesc)(e, t2);
    Module._verify_common_type = (e, t2) => (Module._verify_common_type = wasmExports.verify_common_type)(e, t2);
    Module._bms_del_member = (e, t2) => (Module._bms_del_member = wasmExports.bms_del_member)(e, t2);
    Module._list_member = (e, t2) => (Module._list_member = wasmExports.list_member)(e, t2);
    Module._raw_expression_tree_walker_impl = (e, t2, r) => (Module._raw_expression_tree_walker_impl = wasmExports.raw_expression_tree_walker_impl)(e, t2, r);
    Module._type_is_rowtype = (e) => (Module._type_is_rowtype = wasmExports.type_is_rowtype)(e);
    Module._scanNSItemForColumn = (e, t2, r, a2, o2) => (Module._scanNSItemForColumn = wasmExports.scanNSItemForColumn)(e, t2, r, a2, o2);
    Module._make_op = (e, t2, r, a2, o2, _3) => (Module._make_op = wasmExports.make_op)(e, t2, r, a2, o2, _3);
    Module._make_scalar_array_op = (e, t2, r, a2, o2, _3) => (Module._make_scalar_array_op = wasmExports.make_scalar_array_op)(e, t2, r, a2, o2, _3);
    Module._count_nonjunk_tlist_entries = (e) => (Module._count_nonjunk_tlist_entries = wasmExports.count_nonjunk_tlist_entries)(e);
    Module._makeWholeRowVar = (e, t2, r, a2) => (Module._makeWholeRowVar = wasmExports.makeWholeRowVar)(e, t2, r, a2);
    Module._expandRTE = (e, t2, r, a2, o2, _3, s2, n2) => (Module._expandRTE = wasmExports.expandRTE)(e, t2, r, a2, o2, _3, s2, n2);
    Module._bms_int_members = (e, t2) => (Module._bms_int_members = wasmExports.bms_int_members)(e, t2);
    Module._contain_var_clause = (e) => (Module._contain_var_clause = wasmExports.contain_var_clause)(e);
    Module._jsonb_in = (e) => (Module._jsonb_in = wasmExports.jsonb_in)(e);
    Module._escape_json = (e, t2) => (Module._escape_json = wasmExports.escape_json)(e, t2);
    Module._geterrcode = () => (Module._geterrcode = wasmExports.geterrcode)();
    Module._bit_in = (e) => (Module._bit_in = wasmExports.bit_in)(e);
    Module._repalloc0 = (e, t2, r) => (Module._repalloc0 = wasmExports.repalloc0)(e, t2, r);
    Module._bms_union = (e, t2) => (Module._bms_union = wasmExports.bms_union)(e, t2);
    Module._varstr_levenshtein_less_equal = (e, t2, r, a2, o2, _3, s2, n2, l2) => (Module._varstr_levenshtein_less_equal = wasmExports.varstr_levenshtein_less_equal)(e, t2, r, a2, o2, _3, s2, n2, l2);
    Module._raw_parser = (e, t2) => (Module._raw_parser = wasmExports.raw_parser)(e, t2);
    Module._errsave_start = (e, t2) => (Module._errsave_start = wasmExports.errsave_start)(e, t2);
    Module._errsave_finish = (e, t2, r, a2) => (Module._errsave_finish = wasmExports.errsave_finish)(e, t2, r, a2);
    Module._makeColumnDef = (e, t2, r, a2) => (Module._makeColumnDef = wasmExports.makeColumnDef)(e, t2, r, a2);
    Module._GetDefaultOpClass = (e, t2) => (Module._GetDefaultOpClass = wasmExports.GetDefaultOpClass)(e, t2);
    Module._ChooseRelationName = (e, t2, r, a2, o2) => (Module._ChooseRelationName = wasmExports.ChooseRelationName)(e, t2, r, a2, o2);
    Module._scanner_init = (e, t2, r, a2) => (Module._scanner_init = wasmExports.scanner_init)(e, t2, r, a2);
    Module._scanner_finish = (e) => (Module._scanner_finish = wasmExports.scanner_finish)(e);
    Module._core_yylex = (e, t2, r) => (Module._core_yylex = wasmExports.core_yylex)(e, t2, r);
    Module._isxdigit = (e) => (Module._isxdigit = wasmExports.isxdigit)(e);
    Module._scanner_isspace = (e) => (Module._scanner_isspace = wasmExports.scanner_isspace)(e);
    Module._truncate_identifier = (e, t2, r) => (Module._truncate_identifier = wasmExports.truncate_identifier)(e, t2, r);
    Module._ScanKeywordLookup = (e, t2) => (Module._ScanKeywordLookup = wasmExports.ScanKeywordLookup)(e, t2);
    Module._pg_verifymbstr = (e, t2, r) => (Module._pg_verifymbstr = wasmExports.pg_verifymbstr)(e, t2, r);
    Module._downcase_truncate_identifier = (e, t2, r) => (Module._downcase_truncate_identifier = wasmExports.downcase_truncate_identifier)(e, t2, r);
    Module._pg_database_encoding_max_length = () => (Module._pg_database_encoding_max_length = wasmExports.pg_database_encoding_max_length)();
    Module._getTypeInputInfo = (e, t2, r) => (Module._getTypeInputInfo = wasmExports.getTypeInputInfo)(e, t2, r);
    Module._RenameSchema = (e, t2, r) => (Module._RenameSchema = wasmExports.RenameSchema)(e, t2, r);
    Module._namein = (e) => (Module._namein = wasmExports.namein)(e);
    Module._BlockSampler_Init = (e, t2, r, a2) => (Module._BlockSampler_Init = wasmExports.BlockSampler_Init)(e, t2, r, a2);
    Module._reservoir_init_selection_state = (e, t2) => (Module._reservoir_init_selection_state = wasmExports.reservoir_init_selection_state)(e, t2);
    Module._reservoir_get_next_S = (e, t2, r) => (Module._reservoir_get_next_S = wasmExports.reservoir_get_next_S)(e, t2, r);
    Module._sampler_random_fract = (e) => (Module._sampler_random_fract = wasmExports.sampler_random_fract)(e);
    Module._std_typanalyze = (e) => (Module._std_typanalyze = wasmExports.std_typanalyze)(e);
    Module._BlockSampler_HasMore = (e) => (Module._BlockSampler_HasMore = wasmExports.BlockSampler_HasMore)(e);
    Module._BlockSampler_Next = (e) => (Module._BlockSampler_Next = wasmExports.BlockSampler_Next)(e);
    Module._Async_Notify = (e, t2) => (Module._Async_Notify = wasmExports.Async_Notify)(e, t2);
    Module._RangeVarCallbackMaintainsTable = (e, t2, r, a2) => (Module._RangeVarCallbackMaintainsTable = wasmExports.RangeVarCallbackMaintainsTable)(e, t2, r, a2);
    Module._make_new_heap = (e, t2, r, a2, o2) => (Module._make_new_heap = wasmExports.make_new_heap)(e, t2, r, a2, o2);
    Module._finish_heap_swap = (e, t2, r, a2, o2, _3, s2, n2, l2) => (Module._finish_heap_swap = wasmExports.finish_heap_swap)(e, t2, r, a2, o2, _3, s2, n2, l2);
    Module._OpenPipeStream = (e, t2) => (Module._OpenPipeStream = wasmExports.OpenPipeStream)(e, t2);
    Module._pg_is_ascii = (e) => (Module._pg_is_ascii = wasmExports.pg_is_ascii)(e);
    Module._ClosePipeStream = (e) => (Module._ClosePipeStream = wasmExports.ClosePipeStream)(e);
    Module._BeginCopyFrom = (e, t2, r, a2, o2, _3, s2, n2) => (Module._BeginCopyFrom = wasmExports.BeginCopyFrom)(e, t2, r, a2, o2, _3, s2, n2);
    Module._EndCopyFrom = (e) => (Module._EndCopyFrom = wasmExports.EndCopyFrom)(e);
    Module._ProcessCopyOptions = (e, t2, r, a2) => (Module._ProcessCopyOptions = wasmExports.ProcessCopyOptions)(e, t2, r, a2);
    Module._pg_strtoint64 = (e) => (Module._pg_strtoint64 = wasmExports.pg_strtoint64)(e);
    Module._CopyFromErrorCallback = (e) => (Module._CopyFromErrorCallback = wasmExports.CopyFromErrorCallback)(e);
    Module._bms_make_singleton = (e) => (Module._bms_make_singleton = wasmExports.bms_make_singleton)(e);
    Module._ExecInitRangeTable = (e, t2, r, a2) => (Module._ExecInitRangeTable = wasmExports.ExecInitRangeTable)(e, t2, r, a2);
    Module._ExecInitResultRelation = (e, t2, r) => (Module._ExecInitResultRelation = wasmExports.ExecInitResultRelation)(e, t2, r);
    Module._ExecInitQual = (e, t2) => (Module._ExecInitQual = wasmExports.ExecInitQual)(e, t2);
    Module._NextCopyFrom = (e, t2, r, a2) => (Module._NextCopyFrom = wasmExports.NextCopyFrom)(e, t2, r, a2);
    Module._ExecCloseResultRelations = (e) => (Module._ExecCloseResultRelations = wasmExports.ExecCloseResultRelations)(e);
    Module._ExecCloseRangeTableRelations = (e) => (Module._ExecCloseRangeTableRelations = wasmExports.ExecCloseRangeTableRelations)(e);
    Module._ExecConstraints = (e, t2, r) => (Module._ExecConstraints = wasmExports.ExecConstraints)(e, t2, r);
    Module._ExecInsertIndexTuples = (e, t2, r, a2, o2, _3, s2, n2) => (Module._ExecInsertIndexTuples = wasmExports.ExecInsertIndexTuples)(e, t2, r, a2, o2, _3, s2, n2);
    Module._build_column_default = (e, t2) => (Module._build_column_default = wasmExports.build_column_default)(e, t2);
    Module._ExecInitExpr = (e, t2) => (Module._ExecInitExpr = wasmExports.ExecInitExpr)(e, t2);
    Module._fileno = (e) => (Module._fileno = wasmExports.fileno)(e);
    Module._NextCopyFromRawFields = (e, t2, r) => (Module._NextCopyFromRawFields = wasmExports.NextCopyFromRawFields)(e, t2, r);
    Module._resetStringInfo = (e) => (Module._resetStringInfo = wasmExports.resetStringInfo)(e);
    Module._pq_copymsgbytes = (e, t2, r) => (Module._pq_copymsgbytes = wasmExports.pq_copymsgbytes)(e, t2, r);
    Module._pg_encoding_max_length = (e) => (Module._pg_encoding_max_length = wasmExports.pg_encoding_max_length)(e);
    Module._tolower = (e) => (Module._tolower = wasmExports.tolower)(e);
    Module._pg_plan_query = (e, t2, r, a2) => (Module._pg_plan_query = wasmExports.pg_plan_query)(e, t2, r, a2);
    Module._PushCopiedSnapshot = (e) => (Module._PushCopiedSnapshot = wasmExports.PushCopiedSnapshot)(e);
    Module._UpdateActiveSnapshotCommandId = () => (Module._UpdateActiveSnapshotCommandId = wasmExports.UpdateActiveSnapshotCommandId)();
    Module._CreateQueryDesc = (e, t2, r, a2, o2, _3, s2, n2) => (Module._CreateQueryDesc = wasmExports.CreateQueryDesc)(e, t2, r, a2, o2, _3, s2, n2);
    Module._ExecutorStart = (e, t2) => (Module._ExecutorStart = wasmExports.ExecutorStart)(e, t2);
    Module._ExecutorFinish = (e) => (Module._ExecutorFinish = wasmExports.ExecutorFinish)(e);
    Module._ExecutorEnd = (e) => (Module._ExecutorEnd = wasmExports.ExecutorEnd)(e);
    Module._FreeQueryDesc = (e) => (Module._FreeQueryDesc = wasmExports.FreeQueryDesc)(e);
    Module._ExecutorRun = (e, t2, r) => (Module._ExecutorRun = wasmExports.ExecutorRun)(e, t2, r);
    Module._pg_server_to_any = (e, t2, r) => (Module._pg_server_to_any = wasmExports.pg_server_to_any)(e, t2, r);
    Module._fwrite = (e, t2, r, a2) => (Module._fwrite = wasmExports.fwrite)(e, t2, r, a2);
    Module._CreateTableAsRelExists = (e) => (Module._CreateTableAsRelExists = wasmExports.CreateTableAsRelExists)(e);
    Module._QueryRewrite = (e) => (Module._QueryRewrite = wasmExports.QueryRewrite)(e);
    Module._DefineRelation = (e, t2, r, a2, o2, _3) => (Module._DefineRelation = wasmExports.DefineRelation)(e, t2, r, a2, o2, _3);
    Module._rmdir = (e) => (Module._rmdir = wasmExports.rmdir)(e);
    Module._atof = (e) => (Module._atof = wasmExports.atof)(e);
    Module._int8in = (e) => (Module._int8in = wasmExports.int8in)(e);
    Module._oidin = (e) => (Module._oidin = wasmExports.oidin)(e);
    Module._RemoveObjects = (e) => (Module._RemoveObjects = wasmExports.RemoveObjects)(e);
    Module._GetCommandTagName = (e) => (Module._GetCommandTagName = wasmExports.GetCommandTagName)(e);
    Module._NewExplainState = () => (Module._NewExplainState = wasmExports.NewExplainState)();
    Module._ExplainBeginOutput = (e) => (Module._ExplainBeginOutput = wasmExports.ExplainBeginOutput)(e);
    Module._ExplainEndOutput = (e) => (Module._ExplainEndOutput = wasmExports.ExplainEndOutput)(e);
    Module._ExplainOpenGroup = (e, t2, r, a2) => (Module._ExplainOpenGroup = wasmExports.ExplainOpenGroup)(e, t2, r, a2);
    Module._ExplainPrintPlan = (e, t2) => (Module._ExplainPrintPlan = wasmExports.ExplainPrintPlan)(e, t2);
    Module._ExplainIndentText = (e) => (Module._ExplainIndentText = wasmExports.ExplainIndentText)(e);
    Module._ExplainPropertyInteger = (e, t2, r, a2) => (Module._ExplainPropertyInteger = wasmExports.ExplainPropertyInteger)(e, t2, r, a2);
    Module._ExplainCloseGroup = (e, t2, r, a2) => (Module._ExplainCloseGroup = wasmExports.ExplainCloseGroup)(e, t2, r, a2);
    Module._ExplainPropertyFloat = (e, t2, r, a2, o2) => (Module._ExplainPropertyFloat = wasmExports.ExplainPropertyFloat)(e, t2, r, a2, o2);
    Module._ExplainPrintTriggers = (e, t2) => (Module._ExplainPrintTriggers = wasmExports.ExplainPrintTriggers)(e, t2);
    Module._ExplainPropertyUInteger = (e, t2, r, a2) => (Module._ExplainPropertyUInteger = wasmExports.ExplainPropertyUInteger)(e, t2, r, a2);
    Module._ExplainPropertyText = (e, t2, r) => (Module._ExplainPropertyText = wasmExports.ExplainPropertyText)(e, t2, r);
    Module._GetConfigOptionByName = (e, t2, r) => (Module._GetConfigOptionByName = wasmExports.GetConfigOptionByName)(e, t2, r);
    Module._ExplainPrintJITSummary = (e, t2) => (Module._ExplainPrintJITSummary = wasmExports.ExplainPrintJITSummary)(e, t2);
    Module._ExplainPropertyBool = (e, t2, r) => (Module._ExplainPropertyBool = wasmExports.ExplainPropertyBool)(e, t2, r);
    Module._InstrEndLoop = (e) => (Module._InstrEndLoop = wasmExports.InstrEndLoop)(e);
    Module._appendStringInfoSpaces = (e, t2) => (Module._appendStringInfoSpaces = wasmExports.appendStringInfoSpaces)(e, t2);
    Module._ExplainQueryText = (e, t2) => (Module._ExplainQueryText = wasmExports.ExplainQueryText)(e, t2);
    Module._ExplainQueryParameters = (e, t2, r) => (Module._ExplainQueryParameters = wasmExports.ExplainQueryParameters)(e, t2, r);
    Module._get_func_namespace = (e) => (Module._get_func_namespace = wasmExports.get_func_namespace)(e);
    Module._GetExplainExtensionId = (e) => (Module._GetExplainExtensionId = wasmExports.GetExplainExtensionId)(e);
    Module._GetExplainExtensionState = (e, t2) => (Module._GetExplainExtensionState = wasmExports.GetExplainExtensionState)(e, t2);
    Module._SetExplainExtensionState = (e, t2, r) => (Module._SetExplainExtensionState = wasmExports.SetExplainExtensionState)(e, t2, r);
    Module._RegisterExtensionExplainOption = (e, t2) => (Module._RegisterExtensionExplainOption = wasmExports.RegisterExtensionExplainOption)(e, t2);
    Module._get_function_sibling_type = (e, t2) => (Module._get_function_sibling_type = wasmExports.get_function_sibling_type)(e, t2);
    Module._GetSysCacheHashValue = (e, t2, r, a2, o2) => (Module._GetSysCacheHashValue = wasmExports.GetSysCacheHashValue)(e, t2, r, a2, o2);
    Module._CreateSchemaCommand = (e, t2, r, a2) => (Module._CreateSchemaCommand = wasmExports.CreateSchemaCommand)(e, t2, r, a2);
    Module._get_rel_type_id = (e) => (Module._get_rel_type_id = wasmExports.get_rel_type_id)(e);
    Module._set_config_option = (e, t2, r, a2, o2, _3, s2, n2) => (Module._set_config_option = wasmExports.set_config_option)(e, t2, r, a2, o2, _3, s2, n2);
    Module._pg_any_to_server = (e, t2, r) => (Module._pg_any_to_server = wasmExports.pg_any_to_server)(e, t2, r);
    Module._DirectFunctionCall4Coll = (e, t2, r, a2, o2, _3) => (Module._DirectFunctionCall4Coll = wasmExports.DirectFunctionCall4Coll)(e, t2, r, a2, o2, _3);
    Module._replace_text = (e) => (Module._replace_text = wasmExports.replace_text)(e);
    Module._ProcessUtility = (e, t2, r, a2, o2, _3, s2, n2) => (Module._ProcessUtility = wasmExports.ProcessUtility)(e, t2, r, a2, o2, _3, s2, n2);
    Module._CleanQuerytext = (e, t2, r) => (Module._CleanQuerytext = wasmExports.CleanQuerytext)(e, t2, r);
    Module._list_delete_cell = (e, t2) => (Module._list_delete_cell = wasmExports.list_delete_cell)(e, t2);
    Module._GetForeignDataWrapper = (e) => (Module._GetForeignDataWrapper = wasmExports.GetForeignDataWrapper)(e);
    Module._CreateExprContext = (e) => (Module._CreateExprContext = wasmExports.CreateExprContext)(e);
    Module._EnsurePortalSnapshotExists = () => (Module._EnsurePortalSnapshotExists = wasmExports.EnsurePortalSnapshotExists)();
    Module._CheckIndexCompatible = (e, t2, r, a2, o2) => (Module._CheckIndexCompatible = wasmExports.CheckIndexCompatible)(e, t2, r, a2, o2);
    Module._get_opfamily_member_for_cmptype = (e, t2, r, a2) => (Module._get_opfamily_member_for_cmptype = wasmExports.get_opfamily_member_for_cmptype)(e, t2, r, a2);
    Module._pgstat_count_truncate = (e) => (Module._pgstat_count_truncate = wasmExports.pgstat_count_truncate)(e);
    Module._SPI_connect = () => (Module._SPI_connect = wasmExports.SPI_connect)();
    Module._SPI_exec = (e, t2) => (Module._SPI_exec = wasmExports.SPI_exec)(e, t2);
    Module._SPI_execute = (e, t2, r) => (Module._SPI_execute = wasmExports.SPI_execute)(e, t2, r);
    Module._SPI_getvalue = (e, t2, r) => (Module._SPI_getvalue = wasmExports.SPI_getvalue)(e, t2, r);
    Module._generate_operator_clause = (e, t2, r, a2, o2, _3) => (Module._generate_operator_clause = wasmExports.generate_operator_clause)(e, t2, r, a2, o2, _3);
    Module._SPI_finish = () => (Module._SPI_finish = wasmExports.SPI_finish)();
    Module._CreateTransientRelDestReceiver = (e) => (Module._CreateTransientRelDestReceiver = wasmExports.CreateTransientRelDestReceiver)(e);
    Module._MemoryContextSetIdentifier = (e, t2) => (Module._MemoryContextSetIdentifier = wasmExports.MemoryContextSetIdentifier)(e, t2);
    Module._checkExprHasSubLink = (e) => (Module._checkExprHasSubLink = wasmExports.checkExprHasSubLink)(e);
    Module._MemoryContextSetParent = (e, t2) => (Module._MemoryContextSetParent = wasmExports.MemoryContextSetParent)(e, t2);
    Module._SetTuplestoreDestReceiverParams = (e, t2, r, a2, o2, _3) => (Module._SetTuplestoreDestReceiverParams = wasmExports.SetTuplestoreDestReceiverParams)(e, t2, r, a2, o2, _3);
    Module._tuplestore_rescan = (e) => (Module._tuplestore_rescan = wasmExports.tuplestore_rescan)(e);
    Module._MemoryContextDeleteChildren = (e) => (Module._MemoryContextDeleteChildren = wasmExports.MemoryContextDeleteChildren)(e);
    Module._makeParamList = (e) => (Module._makeParamList = wasmExports.makeParamList)(e);
    Module._ReleaseCachedPlan = (e, t2) => (Module._ReleaseCachedPlan = wasmExports.ReleaseCachedPlan)(e, t2);
    Module._bms_equal = (e, t2) => (Module._bms_equal = wasmExports.bms_equal)(e, t2);
    Module._func_volatile = (e) => (Module._func_volatile = wasmExports.func_volatile)(e);
    Module._register_label_provider = (e, t2) => (Module._register_label_provider = wasmExports.register_label_provider)(e, t2);
    Module._DefineSequence = (e, t2, r) => (Module._DefineSequence = wasmExports.DefineSequence)(e, t2, r);
    Module._AlterSequence = (e, t2, r) => (Module._AlterSequence = wasmExports.AlterSequence)(e, t2, r);
    Module._nextval = (e) => (Module._nextval = wasmExports.nextval)(e);
    Module._textToQualifiedNameList = (e) => (Module._textToQualifiedNameList = wasmExports.textToQualifiedNameList)(e);
    Module._nextval_internal = (e, t2) => (Module._nextval_internal = wasmExports.nextval_internal)(e, t2);
    Module._setval_oid = (e) => (Module._setval_oid = wasmExports.setval_oid)(e);
    Module._tuplestore_gettupleslot = (e, t2, r, a2) => (Module._tuplestore_gettupleslot = wasmExports.tuplestore_gettupleslot)(e, t2, r, a2);
    Module._list_delete = (e, t2) => (Module._list_delete = wasmExports.list_delete)(e, t2);
    Module._tuplestore_end = (e) => (Module._tuplestore_end = wasmExports.tuplestore_end)(e);
    Module._list_append_unique = (e, t2) => (Module._list_append_unique = wasmExports.list_append_unique)(e, t2);
    Module._contain_mutable_functions = (e) => (Module._contain_mutable_functions = wasmExports.contain_mutable_functions)(e);
    Module._RemoveRelations = (e) => (Module._RemoveRelations = wasmExports.RemoveRelations)(e);
    Module._ExecuteTruncateGuts = (e, t2, r, a2, o2, _3) => (Module._ExecuteTruncateGuts = wasmExports.ExecuteTruncateGuts)(e, t2, r, a2, o2, _3);
    Module._InitResultRelInfo = (e, t2, r, a2, o2) => (Module._InitResultRelInfo = wasmExports.InitResultRelInfo)(e, t2, r, a2, o2);
    Module._AlterTable = (e, t2, r) => (Module._AlterTable = wasmExports.AlterTable)(e, t2, r);
    Module._ExecStoreAllNullTuple = (e) => (Module._ExecStoreAllNullTuple = wasmExports.ExecStoreAllNullTuple)(e);
    Module._ChangeVarNodes = (e, t2, r, a2) => (Module._ChangeVarNodes = wasmExports.ChangeVarNodes)(e, t2, r, a2);
    Module._tuplestore_begin_heap = (e, t2, r) => (Module._tuplestore_begin_heap = wasmExports.tuplestore_begin_heap)(e, t2, r);
    Module._tuplestore_puttupleslot = (e, t2) => (Module._tuplestore_puttupleslot = wasmExports.tuplestore_puttupleslot)(e, t2);
    Module._ExecForceStoreHeapTuple = (e, t2, r) => (Module._ExecForceStoreHeapTuple = wasmExports.ExecForceStoreHeapTuple)(e, t2, r);
    Module._ExecUpdateLockMode = (e, t2) => (Module._ExecUpdateLockMode = wasmExports.ExecUpdateLockMode)(e, t2);
    Module._bms_copy = (e) => (Module._bms_copy = wasmExports.bms_copy)(e);
    Module._strtoint = (e, t2, r) => (Module._strtoint = wasmExports.strtoint)(e, t2, r);
    Module._strtod = (e, t2) => (Module._strtod = wasmExports.strtod)(e, t2);
    Module._plain_crypt_verify = (e, t2, r, a2) => (Module._plain_crypt_verify = wasmExports.plain_crypt_verify)(e, t2, r, a2);
    Module._ProcessConfigFile = (e) => (Module._ProcessConfigFile = wasmExports.ProcessConfigFile)(e);
    Module._pgl_exit = (e) => (Module._pgl_exit = wasmExports.pgl_exit)(e);
    Module._dsa_get_handle = (e) => (Module._dsa_get_handle = wasmExports.dsa_get_handle)(e);
    Module._pg_strncasecmp = (e, t2, r) => (Module._pg_strncasecmp = wasmExports.pg_strncasecmp)(e, t2, r);
    Module._ExecReScan = (e) => (Module._ExecReScan = wasmExports.ExecReScan)(e);
    Module._ExecAsyncResponse = (e) => (Module._ExecAsyncResponse = wasmExports.ExecAsyncResponse)(e);
    Module._ExecAsyncRequestDone = (e, t2) => (Module._ExecAsyncRequestDone = wasmExports.ExecAsyncRequestDone)(e, t2);
    Module._ExecAsyncRequestPending = (e) => (Module._ExecAsyncRequestPending = wasmExports.ExecAsyncRequestPending)(e);
    Module._ExprEvalPushStep = (e, t2) => (Module._ExprEvalPushStep = wasmExports.ExprEvalPushStep)(e, t2);
    Module._ExecInitExprWithParams = (e, t2) => (Module._ExecInitExprWithParams = wasmExports.ExecInitExprWithParams)(e, t2);
    Module._ExecInitExprList = (e, t2) => (Module._ExecInitExprList = wasmExports.ExecInitExprList)(e, t2);
    Module._ExecGetResultType = (e) => (Module._ExecGetResultType = wasmExports.ExecGetResultType)(e);
    Module._ExecInitExtraTupleSlot = (e, t2, r) => (Module._ExecInitExtraTupleSlot = wasmExports.ExecInitExtraTupleSlot)(e, t2, r);
    Module._MakeExpandedObjectReadOnlyInternal = (e) => (Module._MakeExpandedObjectReadOnlyInternal = wasmExports.MakeExpandedObjectReadOnlyInternal)(e);
    Module._tuplesort_puttupleslot = (e, t2) => (Module._tuplesort_puttupleslot = wasmExports.tuplesort_puttupleslot)(e, t2);
    Module._ArrayGetNItems = (e, t2) => (Module._ArrayGetNItems = wasmExports.ArrayGetNItems)(e, t2);
    Module._expanded_record_fetch_tupdesc = (e) => (Module._expanded_record_fetch_tupdesc = wasmExports.expanded_record_fetch_tupdesc)(e);
    Module._expanded_record_fetch_field = (e, t2, r) => (Module._expanded_record_fetch_field = wasmExports.expanded_record_fetch_field)(e, t2, r);
    Module._json_validate = (e, t2, r) => (Module._json_validate = wasmExports.json_validate)(e, t2, r);
    Module._JsonbValueToJsonb = (e) => (Module._JsonbValueToJsonb = wasmExports.JsonbValueToJsonb)(e);
    Module._numeric_out = (e) => (Module._numeric_out = wasmExports.numeric_out)(e);
    Module._boolout = (e) => (Module._boolout = wasmExports.boolout)(e);
    Module._bool_int4 = (e) => (Module._bool_int4 = wasmExports.bool_int4)(e);
    Module._lookup_rowtype_tupdesc_domain = (e, t2, r) => (Module._lookup_rowtype_tupdesc_domain = wasmExports.lookup_rowtype_tupdesc_domain)(e, t2, r);
    Module._MemoryContextGetParent = (e) => (Module._MemoryContextGetParent = wasmExports.MemoryContextGetParent)(e);
    Module._DeleteExpandedObject = (e) => (Module._DeleteExpandedObject = wasmExports.DeleteExpandedObject)(e);
    Module._ExecFindJunkAttributeInTlist = (e, t2) => (Module._ExecFindJunkAttributeInTlist = wasmExports.ExecFindJunkAttributeInTlist)(e, t2);
    Module._standard_ExecutorStart = (e, t2) => (Module._standard_ExecutorStart = wasmExports.standard_ExecutorStart)(e, t2);
    Module._ExecInitNode = (e, t2, r) => (Module._ExecInitNode = wasmExports.ExecInitNode)(e, t2, r);
    Module._standard_ExecutorRun = (e, t2, r) => (Module._standard_ExecutorRun = wasmExports.standard_ExecutorRun)(e, t2, r);
    Module._standard_ExecutorFinish = (e) => (Module._standard_ExecutorFinish = wasmExports.standard_ExecutorFinish)(e);
    Module._standard_ExecutorEnd = (e) => (Module._standard_ExecutorEnd = wasmExports.standard_ExecutorEnd)(e);
    Module._ExecEndNode = (e) => (Module._ExecEndNode = wasmExports.ExecEndNode)(e);
    Module._InstrAlloc = (e, t2, r) => (Module._InstrAlloc = wasmExports.InstrAlloc)(e, t2, r);
    Module._MakeTupleTableSlot = (e, t2) => (Module._MakeTupleTableSlot = wasmExports.MakeTupleTableSlot)(e, t2);
    Module._ExecWithCheckOptions = (e, t2, r, a2) => (Module._ExecWithCheckOptions = wasmExports.ExecWithCheckOptions)(e, t2, r, a2);
    Module._get_typlenbyval = (e, t2, r) => (Module._get_typlenbyval = wasmExports.get_typlenbyval)(e, t2, r);
    Module._ExecInitScanTupleSlot = (e, t2, r, a2) => (Module._ExecInitScanTupleSlot = wasmExports.ExecInitScanTupleSlot)(e, t2, r, a2);
    Module._InputFunctionCall = (e, t2, r, a2) => (Module._InputFunctionCall = wasmExports.InputFunctionCall)(e, t2, r, a2);
    Module._list_delete_ptr = (e, t2) => (Module._list_delete_ptr = wasmExports.list_delete_ptr)(e, t2);
    Module._FreeExprContext = (e, t2) => (Module._FreeExprContext = wasmExports.FreeExprContext)(e, t2);
    Module._ExecAssignExprContext = (e, t2) => (Module._ExecAssignExprContext = wasmExports.ExecAssignExprContext)(e, t2);
    Module._ExecAssignProjectionInfo = (e, t2) => (Module._ExecAssignProjectionInfo = wasmExports.ExecAssignProjectionInfo)(e, t2);
    Module._ExecOpenScanRelation = (e, t2, r) => (Module._ExecOpenScanRelation = wasmExports.ExecOpenScanRelation)(e, t2, r);
    Module._bms_intersect = (e, t2) => (Module._bms_intersect = wasmExports.bms_intersect)(e, t2);
    Module._GetAttributeByName = (e, t2, r) => (Module._GetAttributeByName = wasmExports.GetAttributeByName)(e, t2, r);
    Module._GetAttributeByNum = (e, t2, r) => (Module._GetAttributeByNum = wasmExports.GetAttributeByNum)(e, t2, r);
    Module._ExecGetReturningSlot = (e, t2) => (Module._ExecGetReturningSlot = wasmExports.ExecGetReturningSlot)(e, t2);
    Module._ExecGetResultRelCheckAsUser = (e, t2) => (Module._ExecGetResultRelCheckAsUser = wasmExports.ExecGetResultRelCheckAsUser)(e, t2);
    Module._MemoryContextRegisterResetCallback = (e, t2) => (Module._MemoryContextRegisterResetCallback = wasmExports.MemoryContextRegisterResetCallback)(e, t2);
    Module._cached_function_compile = (e, t2, r, a2, o2, _3, s2) => (Module._cached_function_compile = wasmExports.cached_function_compile)(e, t2, r, a2, o2, _3, s2);
    Module._InstrUpdateTupleCount = (e, t2) => (Module._InstrUpdateTupleCount = wasmExports.InstrUpdateTupleCount)(e, t2);
    Module._tuplesort_begin_heap = (e, t2, r, a2, o2, _3, s2, n2, l2) => (Module._tuplesort_begin_heap = wasmExports.tuplesort_begin_heap)(e, t2, r, a2, o2, _3, s2, n2, l2);
    Module._AggCheckCallContext = (e, t2) => (Module._AggCheckCallContext = wasmExports.AggCheckCallContext)(e, t2);
    Module._tuplesort_gettupleslot = (e, t2, r, a2, o2) => (Module._tuplesort_gettupleslot = wasmExports.tuplesort_gettupleslot)(e, t2, r, a2, o2);
    Module._bms_del_members = (e, t2) => (Module._bms_del_members = wasmExports.bms_del_members)(e, t2);
    Module._AddWaitEventToSet = (e, t2, r, a2, o2) => (Module._AddWaitEventToSet = wasmExports.AddWaitEventToSet)(e, t2, r, a2, o2);
    Module._GetNumRegisteredWaitEvents = (e) => (Module._GetNumRegisteredWaitEvents = wasmExports.GetNumRegisteredWaitEvents)(e);
    Module._tuplestore_clear = (e) => (Module._tuplestore_clear = wasmExports.tuplestore_clear)(e);
    Module._get_attstatsslot = (e, t2, r, a2, o2) => (Module._get_attstatsslot = wasmExports.get_attstatsslot)(e, t2, r, a2, o2);
    Module._free_attstatsslot = (e) => (Module._free_attstatsslot = wasmExports.free_attstatsslot)(e);
    Module._SharedFileSetInit = (e, t2) => (Module._SharedFileSetInit = wasmExports.SharedFileSetInit)(e, t2);
    Module._SharedFileSetAttach = (e, t2) => (Module._SharedFileSetAttach = wasmExports.SharedFileSetAttach)(e, t2);
    Module._tuplesort_reset = (e) => (Module._tuplesort_reset = wasmExports.tuplesort_reset)(e);
    Module._pairingheap_first = (e) => (Module._pairingheap_first = wasmExports.pairingheap_first)(e);
    Module._bms_nonempty_difference = (e, t2) => (Module._bms_nonempty_difference = wasmExports.bms_nonempty_difference)(e, t2);
    Module._datum_image_hash = (e, t2, r) => (Module._datum_image_hash = wasmExports.datum_image_hash)(e, t2, r);
    Module._tuplesort_rescan = (e) => (Module._tuplesort_rescan = wasmExports.tuplesort_rescan)(e);
    Module._WinGetPartitionLocalMemory = (e, t2) => (Module._WinGetPartitionLocalMemory = wasmExports.WinGetPartitionLocalMemory)(e, t2);
    Module._WinGetCurrentPosition = (e) => (Module._WinGetCurrentPosition = wasmExports.WinGetCurrentPosition)(e);
    Module._WinGetPartitionRowCount = (e) => (Module._WinGetPartitionRowCount = wasmExports.WinGetPartitionRowCount)(e);
    Module._WinGetFuncArgInPartition = (e, t2, r, a2, o2, _3, s2) => (Module._WinGetFuncArgInPartition = wasmExports.WinGetFuncArgInPartition)(e, t2, r, a2, o2, _3, s2);
    Module._WinGetFuncArgCurrent = (e, t2, r) => (Module._WinGetFuncArgCurrent = wasmExports.WinGetFuncArgCurrent)(e, t2, r);
    Module._SPI_connect_ext = (e) => (Module._SPI_connect_ext = wasmExports.SPI_connect_ext)(e);
    Module._SPI_commit = () => (Module._SPI_commit = wasmExports.SPI_commit)();
    Module._CopyErrorData = () => (Module._CopyErrorData = wasmExports.CopyErrorData)();
    Module._FlushErrorState = () => (Module._FlushErrorState = wasmExports.FlushErrorState)();
    Module._ReThrowError = (e) => (Module._ReThrowError = wasmExports.ReThrowError)(e);
    Module._SPI_commit_and_chain = () => (Module._SPI_commit_and_chain = wasmExports.SPI_commit_and_chain)();
    Module._SPI_rollback = () => (Module._SPI_rollback = wasmExports.SPI_rollback)();
    Module._SPI_rollback_and_chain = () => (Module._SPI_rollback_and_chain = wasmExports.SPI_rollback_and_chain)();
    Module._SPI_freetuptable = (e) => (Module._SPI_freetuptable = wasmExports.SPI_freetuptable)(e);
    Module._SPI_execute_extended = (e, t2) => (Module._SPI_execute_extended = wasmExports.SPI_execute_extended)(e, t2);
    Module._SPI_execute_plan = (e, t2, r, a2, o2) => (Module._SPI_execute_plan = wasmExports.SPI_execute_plan)(e, t2, r, a2, o2);
    Module._SPI_execp = (e, t2, r, a2) => (Module._SPI_execp = wasmExports.SPI_execp)(e, t2, r, a2);
    Module._SPI_execute_plan_extended = (e, t2) => (Module._SPI_execute_plan_extended = wasmExports.SPI_execute_plan_extended)(e, t2);
    Module._SPI_execute_plan_with_paramlist = (e, t2, r, a2) => (Module._SPI_execute_plan_with_paramlist = wasmExports.SPI_execute_plan_with_paramlist)(e, t2, r, a2);
    Module._SPI_execute_with_args = (e, t2, r, a2, o2, _3, s2) => (Module._SPI_execute_with_args = wasmExports.SPI_execute_with_args)(e, t2, r, a2, o2, _3, s2);
    Module._SPI_prepare = (e, t2, r) => (Module._SPI_prepare = wasmExports.SPI_prepare)(e, t2, r);
    Module._SPI_prepare_extended = (e, t2) => (Module._SPI_prepare_extended = wasmExports.SPI_prepare_extended)(e, t2);
    Module._SPI_keepplan = (e) => (Module._SPI_keepplan = wasmExports.SPI_keepplan)(e);
    Module._SPI_freeplan = (e) => (Module._SPI_freeplan = wasmExports.SPI_freeplan)(e);
    Module._SPI_copytuple = (e) => (Module._SPI_copytuple = wasmExports.SPI_copytuple)(e);
    Module._SPI_returntuple = (e, t2) => (Module._SPI_returntuple = wasmExports.SPI_returntuple)(e, t2);
    Module._SPI_modifytuple = (e, t2, r, a2, o2, _3) => (Module._SPI_modifytuple = wasmExports.SPI_modifytuple)(e, t2, r, a2, o2, _3);
    Module._SPI_fnumber = (e, t2) => (Module._SPI_fnumber = wasmExports.SPI_fnumber)(e, t2);
    Module._SPI_fname = (e, t2) => (Module._SPI_fname = wasmExports.SPI_fname)(e, t2);
    Module._SPI_getbinval = (e, t2, r, a2) => (Module._SPI_getbinval = wasmExports.SPI_getbinval)(e, t2, r, a2);
    Module._SPI_gettype = (e, t2) => (Module._SPI_gettype = wasmExports.SPI_gettype)(e, t2);
    Module._SPI_gettypeid = (e, t2) => (Module._SPI_gettypeid = wasmExports.SPI_gettypeid)(e, t2);
    Module._SPI_getrelname = (e) => (Module._SPI_getrelname = wasmExports.SPI_getrelname)(e);
    Module._SPI_palloc = (e) => (Module._SPI_palloc = wasmExports.SPI_palloc)(e);
    Module._SPI_repalloc = (e, t2) => (Module._SPI_repalloc = wasmExports.SPI_repalloc)(e, t2);
    Module._SPI_pfree = (e) => (Module._SPI_pfree = wasmExports.SPI_pfree)(e);
    Module._SPI_datumTransfer = (e, t2, r) => (Module._SPI_datumTransfer = wasmExports.SPI_datumTransfer)(e, t2, r);
    Module._datumTransfer = (e, t2, r) => (Module._datumTransfer = wasmExports.datumTransfer)(e, t2, r);
    Module._SPI_cursor_open_with_args = (e, t2, r, a2, o2, _3, s2, n2) => (Module._SPI_cursor_open_with_args = wasmExports.SPI_cursor_open_with_args)(e, t2, r, a2, o2, _3, s2, n2);
    Module._SPI_cursor_open_with_paramlist = (e, t2, r, a2) => (Module._SPI_cursor_open_with_paramlist = wasmExports.SPI_cursor_open_with_paramlist)(e, t2, r, a2);
    Module._SPI_cursor_parse_open = (e, t2, r) => (Module._SPI_cursor_parse_open = wasmExports.SPI_cursor_parse_open)(e, t2, r);
    Module._SPI_cursor_find = (e) => (Module._SPI_cursor_find = wasmExports.SPI_cursor_find)(e);
    Module._SPI_cursor_fetch = (e, t2, r) => (Module._SPI_cursor_fetch = wasmExports.SPI_cursor_fetch)(e, t2, r);
    Module._SPI_scroll_cursor_fetch = (e, t2, r) => (Module._SPI_scroll_cursor_fetch = wasmExports.SPI_scroll_cursor_fetch)(e, t2, r);
    Module._SPI_scroll_cursor_move = (e, t2, r) => (Module._SPI_scroll_cursor_move = wasmExports.SPI_scroll_cursor_move)(e, t2, r);
    Module._SPI_cursor_close = (e) => (Module._SPI_cursor_close = wasmExports.SPI_cursor_close)(e);
    Module._SPI_plan_is_valid = (e) => (Module._SPI_plan_is_valid = wasmExports.SPI_plan_is_valid)(e);
    Module._SPI_result_code_string = (e) => (Module._SPI_result_code_string = wasmExports.SPI_result_code_string)(e);
    Module._SPI_plan_get_plan_sources = (e) => (Module._SPI_plan_get_plan_sources = wasmExports.SPI_plan_get_plan_sources)(e);
    Module._SPI_plan_get_cached_plan = (e) => (Module._SPI_plan_get_cached_plan = wasmExports.SPI_plan_get_cached_plan)(e);
    Module._SPI_register_relation = (e) => (Module._SPI_register_relation = wasmExports.SPI_register_relation)(e);
    Module._create_queryEnv = () => (Module._create_queryEnv = wasmExports.create_queryEnv)();
    Module._register_ENR = (e, t2) => (Module._register_ENR = wasmExports.register_ENR)(e, t2);
    Module._SPI_register_trigger_data = (e) => (Module._SPI_register_trigger_data = wasmExports.SPI_register_trigger_data)(e);
    Module._tuplestore_tuple_count = (e) => (Module._tuplestore_tuple_count = wasmExports.tuplestore_tuple_count)(e);
    Module._GetUserMapping = (e, t2) => (Module._GetUserMapping = wasmExports.GetUserMapping)(e, t2);
    Module._GetForeignTable = (e) => (Module._GetForeignTable = wasmExports.GetForeignTable)(e);
    Module._GetForeignColumnOptions = (e, t2) => (Module._GetForeignColumnOptions = wasmExports.GetForeignColumnOptions)(e, t2);
    Module._initClosestMatch = (e, t2, r) => (Module._initClosestMatch = wasmExports.initClosestMatch)(e, t2, r);
    Module._updateClosestMatch = (e, t2) => (Module._updateClosestMatch = wasmExports.updateClosestMatch)(e, t2);
    Module._getClosestMatch = (e) => (Module._getClosestMatch = wasmExports.getClosestMatch)(e);
    Module._GetExistingLocalJoinPath = (e) => (Module._GetExistingLocalJoinPath = wasmExports.GetExistingLocalJoinPath)(e);
    Module._pathkeys_contained_in = (e, t2) => (Module._pathkeys_contained_in = wasmExports.pathkeys_contained_in)(e, t2);
    Module._bloom_create = (e, t2, r) => (Module._bloom_create = wasmExports.bloom_create)(e, t2, r);
    Module._bloom_free = (e) => (Module._bloom_free = wasmExports.bloom_free)(e);
    Module._bloom_add_element = (e, t2, r) => (Module._bloom_add_element = wasmExports.bloom_add_element)(e, t2, r);
    Module._bloom_lacks_element = (e, t2, r) => (Module._bloom_lacks_element = wasmExports.bloom_lacks_element)(e, t2, r);
    Module._bloom_prop_bits_set = (e) => (Module._bloom_prop_bits_set = wasmExports.bloom_prop_bits_set)(e);
    Module._dshash_create = (e, t2, r) => (Module._dshash_create = wasmExports.dshash_create)(e, t2, r);
    Module._dshash_attach = (e, t2, r, a2) => (Module._dshash_attach = wasmExports.dshash_attach)(e, t2, r, a2);
    Module._dshash_detach = (e) => (Module._dshash_detach = wasmExports.dshash_detach)(e);
    Module._dshash_destroy = (e) => (Module._dshash_destroy = wasmExports.dshash_destroy)(e);
    Module._dshash_get_hash_table_handle = (e) => (Module._dshash_get_hash_table_handle = wasmExports.dshash_get_hash_table_handle)(e);
    Module._dshash_find = (e, t2, r) => (Module._dshash_find = wasmExports.dshash_find)(e, t2, r);
    Module._dshash_find_or_insert = (e, t2, r) => (Module._dshash_find_or_insert = wasmExports.dshash_find_or_insert)(e, t2, r);
    Module._dshash_delete_key = (e, t2) => (Module._dshash_delete_key = wasmExports.dshash_delete_key)(e, t2);
    Module._dshash_release_lock = (e, t2) => (Module._dshash_release_lock = wasmExports.dshash_release_lock)(e, t2);
    Module._tag_hash = (e, t2) => (Module._tag_hash = wasmExports.tag_hash)(e, t2);
    Module._dshash_seq_init = (e, t2, r) => (Module._dshash_seq_init = wasmExports.dshash_seq_init)(e, t2, r);
    Module._dshash_seq_next = (e) => (Module._dshash_seq_next = wasmExports.dshash_seq_next)(e);
    Module._dshash_seq_term = (e) => (Module._dshash_seq_term = wasmExports.dshash_seq_term)(e);
    Module._dshash_delete_current = (e) => (Module._dshash_delete_current = wasmExports.dshash_delete_current)(e);
    Module._ldexp = (e, t2) => (Module._ldexp = wasmExports.ldexp)(e, t2);
    Module._pg_b64_enc_len = (e) => (Module._pg_b64_enc_len = wasmExports.pg_b64_enc_len)(e);
    Module._pg_b64_encode = (e, t2, r, a2) => (Module._pg_b64_encode = wasmExports.pg_b64_encode)(e, t2, r, a2);
    Module._strtol = (e, t2, r) => (Module._strtol = wasmExports.strtol)(e, t2, r);
    Module._gai_strerror = (e) => (Module._gai_strerror = wasmExports.gai_strerror)(e);
    Module._socket = (e, t2, r) => (Module._socket = wasmExports.socket)(e, t2, r);
    Module._pgl_connect = (e, t2, r) => (Module._pgl_connect = wasmExports.pgl_connect)(e, t2, r);
    Module._pgl_send = (e, t2, r, a2) => (Module._pgl_send = wasmExports.pgl_send)(e, t2, r, a2);
    Module._pgl_recv = (e, t2, r, a2) => (Module._pgl_recv = wasmExports.pgl_recv)(e, t2, r, a2);
    Module._be_lo_unlink = (e) => (Module._be_lo_unlink = wasmExports.be_lo_unlink)(e);
    Module._text_to_cstring_buffer = (e, t2, r) => (Module._text_to_cstring_buffer = wasmExports.text_to_cstring_buffer)(e, t2, r);
    Module._pg_mb2wchar_with_len = (e, t2, r) => (Module._pg_mb2wchar_with_len = wasmExports.pg_mb2wchar_with_len)(e, t2, r);
    Module._pg_regcomp = (e, t2, r, a2, o2) => (Module._pg_regcomp = wasmExports.pg_regcomp)(e, t2, r, a2, o2);
    Module._pg_regerror = (e, t2, r, a2) => (Module._pg_regerror = wasmExports.pg_regerror)(e, t2, r, a2);
    Module._strcat = (e, t2) => (Module._strcat = wasmExports.strcat)(e, t2);
    Module._pgl_getsockname = (e, t2, r) => (Module._pgl_getsockname = wasmExports.pgl_getsockname)(e, t2, r);
    Module._pgl_setsockopt = (e, t2, r, a2, o2) => (Module._pgl_setsockopt = wasmExports.pgl_setsockopt)(e, t2, r, a2, o2);
    Module._pgl_fcntl = (e, t2, r) => (Module._pgl_fcntl = wasmExports.pgl_fcntl)(e, t2, r);
    Module._utime = (e, t2) => (Module._utime = wasmExports.utime)(e, t2);
    Module._pq_buffer_remaining_data = () => (Module._pq_buffer_remaining_data = wasmExports.pq_buffer_remaining_data)();
    Module._pgl_getsockopt = (e, t2, r, a2, o2) => (Module._pgl_getsockopt = wasmExports.pgl_getsockopt)(e, t2, r, a2, o2);
    Module._pq_sendtext = (e, t2, r) => (Module._pq_sendtext = wasmExports.pq_sendtext)(e, t2, r);
    Module._pq_sendfloat4 = (e, t2) => (Module._pq_sendfloat4 = wasmExports.pq_sendfloat4)(e, t2);
    Module._pq_sendfloat8 = (e, t2) => (Module._pq_sendfloat8 = wasmExports.pq_sendfloat8)(e, t2);
    Module._pq_begintypsend = (e) => (Module._pq_begintypsend = wasmExports.pq_begintypsend)(e);
    Module._pq_endtypsend = (e) => (Module._pq_endtypsend = wasmExports.pq_endtypsend)(e);
    Module._pq_getmsgfloat4 = (e) => (Module._pq_getmsgfloat4 = wasmExports.pq_getmsgfloat4)(e);
    Module._pq_getmsgfloat8 = (e) => (Module._pq_getmsgfloat8 = wasmExports.pq_getmsgfloat8)(e);
    Module._pq_getmsgtext = (e, t2, r) => (Module._pq_getmsgtext = wasmExports.pq_getmsgtext)(e, t2, r);
    Module._pg_strtoint32 = (e) => (Module._pg_strtoint32 = wasmExports.pg_strtoint32)(e);
    Module._main = (e, t2) => (Module._main = wasmExports.__main_argc_argv)(e, t2);
    Module._pgl_getuid = () => (Module._pgl_getuid = wasmExports.pgl_getuid)();
    Module._getenv = (e) => (Module._getenv = wasmExports.getenv)(e);
    Module._bms_membership = (e) => (Module._bms_membership = wasmExports.bms_membership)(e);
    Module._RegisterExtensibleNodeMethods = (e) => (Module._RegisterExtensibleNodeMethods = wasmExports.RegisterExtensibleNodeMethods)(e);
    Module._list_make5_impl = (e, t2, r, a2, o2, _3) => (Module._list_make5_impl = wasmExports.list_make5_impl)(e, t2, r, a2, o2, _3);
    Module._GetMemoryChunkContext = (e) => (Module._GetMemoryChunkContext = wasmExports.GetMemoryChunkContext)(e);
    Module._list_insert_nth = (e, t2, r) => (Module._list_insert_nth = wasmExports.list_insert_nth)(e, t2, r);
    Module._list_member_ptr = (e, t2) => (Module._list_member_ptr = wasmExports.list_member_ptr)(e, t2);
    Module._list_append_unique_ptr = (e, t2) => (Module._list_append_unique_ptr = wasmExports.list_append_unique_ptr)(e, t2);
    Module._make_opclause = (e, t2, r, a2, o2, _3, s2) => (Module._make_opclause = wasmExports.make_opclause)(e, t2, r, a2, o2, _3, s2);
    Module._exprIsLengthCoercion = (e, t2) => (Module._exprIsLengthCoercion = wasmExports.exprIsLengthCoercion)(e, t2);
    Module._fix_opfuncids = (e) => (Module._fix_opfuncids = wasmExports.fix_opfuncids)(e);
    Module._outToken = (e, t2) => (Module._outToken = wasmExports.outToken)(e, t2);
    Module._outNode = (e, t2) => (Module._outNode = wasmExports.outNode)(e, t2);
    Module._appendStringInfoStringQuoted = (e, t2, r) => (Module._appendStringInfoStringQuoted = wasmExports.appendStringInfoStringQuoted)(e, t2, r);
    Module._EnableQueryId = () => (Module._EnableQueryId = wasmExports.EnableQueryId)();
    Module._nodeRead = (e, t2) => (Module._nodeRead = wasmExports.nodeRead)(e, t2);
    Module._pg_strtok = (e) => (Module._pg_strtok = wasmExports.pg_strtok)(e);
    Module._debackslash = (e, t2) => (Module._debackslash = wasmExports.debackslash)(e, t2);
    Module._exp2 = (e) => (Module._exp2 = wasmExports.exp2)(e);
    Module._find_base_rel = (e, t2) => (Module._find_base_rel = wasmExports.find_base_rel)(e, t2);
    Module._add_path = (e, t2) => (Module._add_path = wasmExports.add_path)(e, t2);
    Module._create_sort_path = (e, t2, r, a2, o2) => (Module._create_sort_path = wasmExports.create_sort_path)(e, t2, r, a2, o2);
    Module._set_baserel_size_estimates = (e, t2) => (Module._set_baserel_size_estimates = wasmExports.set_baserel_size_estimates)(e, t2);
    Module._get_func_support = (e) => (Module._get_func_support = wasmExports.get_func_support)(e);
    Module._clauselist_selectivity = (e, t2, r, a2, o2) => (Module._clauselist_selectivity = wasmExports.clauselist_selectivity)(e, t2, r, a2, o2);
    Module._get_tablespace_page_costs = (e, t2, r) => (Module._get_tablespace_page_costs = wasmExports.get_tablespace_page_costs)(e, t2, r);
    Module._cost_qual_eval = (e, t2, r) => (Module._cost_qual_eval = wasmExports.cost_qual_eval)(e, t2, r);
    Module._pull_varnos = (e, t2) => (Module._pull_varnos = wasmExports.pull_varnos)(e, t2);
    Module._estimate_num_groups = (e, t2, r, a2, o2) => (Module._estimate_num_groups = wasmExports.estimate_num_groups)(e, t2, r, a2, o2);
    Module._cost_sort = (e, t2, r, a2, o2, _3, s2, n2, l2, d2) => (Module._cost_sort = wasmExports.cost_sort)(e, t2, r, a2, o2, _3, s2, n2, l2, d2);
    Module._get_sortgrouplist_exprs = (e, t2) => (Module._get_sortgrouplist_exprs = wasmExports.get_sortgrouplist_exprs)(e, t2);
    Module._make_restrictinfo = (e, t2, r, a2, o2, _3, s2, n2, l2, d2) => (Module._make_restrictinfo = wasmExports.make_restrictinfo)(e, t2, r, a2, o2, _3, s2, n2, l2, d2);
    Module._setup_eclass_member_iterator = (e, t2, r) => (Module._setup_eclass_member_iterator = wasmExports.setup_eclass_member_iterator)(e, t2, r);
    Module._eclass_member_iterator_next = (e) => (Module._eclass_member_iterator_next = wasmExports.eclass_member_iterator_next)(e);
    Module._remove_nulling_relids = (e, t2, r) => (Module._remove_nulling_relids = wasmExports.remove_nulling_relids)(e, t2, r);
    Module._get_mergejoin_opfamilies = (e) => (Module._get_mergejoin_opfamilies = wasmExports.get_mergejoin_opfamilies)(e);
    Module._generate_implied_equalities_for_column = (e, t2, r, a2, o2) => (Module._generate_implied_equalities_for_column = wasmExports.generate_implied_equalities_for_column)(e, t2, r, a2, o2);
    Module._eclass_useful_for_merging = (e, t2, r) => (Module._eclass_useful_for_merging = wasmExports.eclass_useful_for_merging)(e, t2, r);
    Module._join_clause_is_movable_to = (e, t2) => (Module._join_clause_is_movable_to = wasmExports.join_clause_is_movable_to)(e, t2);
    Module._get_plan_rowmark = (e, t2) => (Module._get_plan_rowmark = wasmExports.get_plan_rowmark)(e, t2);
    Module._is_pseudo_constant_for_index = (e, t2, r) => (Module._is_pseudo_constant_for_index = wasmExports.is_pseudo_constant_for_index)(e, t2, r);
    Module._update_mergeclause_eclasses = (e, t2) => (Module._update_mergeclause_eclasses = wasmExports.update_mergeclause_eclasses)(e, t2);
    Module._pull_vars_of_level = (e, t2) => (Module._pull_vars_of_level = wasmExports.pull_vars_of_level)(e, t2);
    Module._find_join_rel = (e, t2) => (Module._find_join_rel = wasmExports.find_join_rel)(e, t2);
    Module._make_canonical_pathkey = (e, t2, r, a2, o2) => (Module._make_canonical_pathkey = wasmExports.make_canonical_pathkey)(e, t2, r, a2, o2);
    Module._get_sortgroupref_clause_noerr = (e, t2) => (Module._get_sortgroupref_clause_noerr = wasmExports.get_sortgroupref_clause_noerr)(e, t2);
    Module._extract_actual_clauses = (e, t2) => (Module._extract_actual_clauses = wasmExports.extract_actual_clauses)(e, t2);
    Module._tlist_member = (e, t2) => (Module._tlist_member = wasmExports.tlist_member)(e, t2);
    Module._change_plan_targetlist = (e, t2, r) => (Module._change_plan_targetlist = wasmExports.change_plan_targetlist)(e, t2, r);
    Module._make_foreignscan = (e, t2, r, a2, o2, _3, s2, n2) => (Module._make_foreignscan = wasmExports.make_foreignscan)(e, t2, r, a2, o2, _3, s2, n2);
    Module._IncrementVarSublevelsUp = (e, t2, r) => (Module._IncrementVarSublevelsUp = wasmExports.IncrementVarSublevelsUp)(e, t2, r);
    Module._op_mergejoinable = (e, t2) => (Module._op_mergejoinable = wasmExports.op_mergejoinable)(e, t2);
    Module._find_nonnullable_rels = (e) => (Module._find_nonnullable_rels = wasmExports.find_nonnullable_rels)(e);
    Module._standard_planner = (e, t2, r, a2) => (Module._standard_planner = wasmExports.standard_planner)(e, t2, r, a2);
    Module._get_relids_in_jointree = (e, t2, r) => (Module._get_relids_in_jointree = wasmExports.get_relids_in_jointree)(e, t2, r);
    Module._SS_process_sublinks = (e, t2, r) => (Module._SS_process_sublinks = wasmExports.SS_process_sublinks)(e, t2, r);
    Module._add_new_columns_to_pathtarget = (e, t2) => (Module._add_new_columns_to_pathtarget = wasmExports.add_new_columns_to_pathtarget)(e, t2);
    Module._get_agg_clause_costs = (e, t2, r) => (Module._get_agg_clause_costs = wasmExports.get_agg_clause_costs)(e, t2, r);
    Module._grouping_is_sortable = (e) => (Module._grouping_is_sortable = wasmExports.grouping_is_sortable)(e);
    Module._copy_pathtarget = (e) => (Module._copy_pathtarget = wasmExports.copy_pathtarget)(e);
    Module._create_projection_path = (e, t2, r, a2) => (Module._create_projection_path = wasmExports.create_projection_path)(e, t2, r, a2);
    Module._contain_nonstrict_functions = (e) => (Module._contain_nonstrict_functions = wasmExports.contain_nonstrict_functions)(e);
    Module._get_translated_update_targetlist = (e, t2, r, a2) => (Module._get_translated_update_targetlist = wasmExports.get_translated_update_targetlist)(e, t2, r, a2);
    Module._add_row_identity_var = (e, t2, r, a2) => (Module._add_row_identity_var = wasmExports.add_row_identity_var)(e, t2, r, a2);
    Module._get_rel_all_updated_cols = (e, t2) => (Module._get_rel_all_updated_cols = wasmExports.get_rel_all_updated_cols)(e, t2);
    Module._get_baserel_parampathinfo = (e, t2, r) => (Module._get_baserel_parampathinfo = wasmExports.get_baserel_parampathinfo)(e, t2, r);
    Module._create_foreignscan_path = (e, t2, r, a2, o2, _3, s2, n2, l2, d2, p2, m2) => (Module._create_foreignscan_path = wasmExports.create_foreignscan_path)(e, t2, r, a2, o2, _3, s2, n2, l2, d2, p2, m2);
    Module._create_foreign_join_path = (e, t2, r, a2, o2, _3, s2, n2, l2, d2, p2, m2) => (Module._create_foreign_join_path = wasmExports.create_foreign_join_path)(e, t2, r, a2, o2, _3, s2, n2, l2, d2, p2, m2);
    Module._create_foreign_upper_path = (e, t2, r, a2, o2, _3, s2, n2, l2, d2, p2) => (Module._create_foreign_upper_path = wasmExports.create_foreign_upper_path)(e, t2, r, a2, o2, _3, s2, n2, l2, d2, p2);
    Module._adjust_limit_rows_costs = (e, t2, r, a2, o2) => (Module._adjust_limit_rows_costs = wasmExports.adjust_limit_rows_costs)(e, t2, r, a2, o2);
    Module._add_to_flat_tlist = (e, t2) => (Module._add_to_flat_tlist = wasmExports.add_to_flat_tlist)(e, t2);
    Module._get_fn_expr_variadic = (e) => (Module._get_fn_expr_variadic = wasmExports.get_fn_expr_variadic)(e);
    Module._get_fn_expr_argtype = (e, t2) => (Module._get_fn_expr_argtype = wasmExports.get_fn_expr_argtype)(e, t2);
    Module._on_shmem_exit = (e, t2) => (Module._on_shmem_exit = wasmExports.on_shmem_exit)(e, t2);
    Module._pgl_shmdt = (e) => (Module._pgl_shmdt = wasmExports.pgl_shmdt)(e);
    Module._pgl_shmctl = (e, t2, r) => (Module._pgl_shmctl = wasmExports.pgl_shmctl)(e, t2, r);
    Module._pgl_shmat = (e, t2, r) => (Module._pgl_shmat = wasmExports.pgl_shmat)(e, t2, r);
    Module._mmap = (e, t2, r, a2, o2, _3) => (Module._mmap = wasmExports.mmap)(e, t2, r, a2, o2, _3);
    Module._pgl_shmget = (e, t2, r) => (Module._pgl_shmget = wasmExports.pgl_shmget)(e, t2, r);
    Module._pgl_munmap = (e, t2) => (Module._pgl_munmap = wasmExports.pgl_munmap)(e, t2);
    Module._SignalHandlerForConfigReload = (e) => (Module._SignalHandlerForConfigReload = wasmExports.SignalHandlerForConfigReload)(e);
    Module._SignalHandlerForShutdownRequest = (e) => (Module._SignalHandlerForShutdownRequest = wasmExports.SignalHandlerForShutdownRequest)(e);
    Module._procsignal_sigusr1_handler = (e) => (Module._procsignal_sigusr1_handler = wasmExports.procsignal_sigusr1_handler)(e);
    Module._RegisterBackgroundWorker = (e) => (Module._RegisterBackgroundWorker = wasmExports.RegisterBackgroundWorker)(e);
    Module._WaitForBackgroundWorkerStartup = (e, t2) => (Module._WaitForBackgroundWorkerStartup = wasmExports.WaitForBackgroundWorkerStartup)(e, t2);
    Module._open = (e, t2, r) => (Module._open = wasmExports.open)(e, t2, r);
    Module._rename = (e, t2) => (Module._rename = wasmExports.rename)(e, t2);
    Module._GetConfigOption = (e, t2, r) => (Module._GetConfigOption = wasmExports.GetConfigOption)(e, t2, r);
    Module._puts = (e) => (Module._puts = wasmExports.puts)(e);
    Module._fopen = (e, t2) => (Module._fopen = wasmExports.fopen)(e, t2);
    Module._fclose = (e) => (Module._fclose = wasmExports.fclose)(e);
    Module._fputc = (e, t2) => (Module._fputc = wasmExports.fputc)(e, t2);
    Module._ftello = (e) => (Module._ftello = wasmExports.ftello)(e);
    var _malloc = Module._malloc = (e) => (_malloc = Module._malloc = wasmExports.malloc)(e);
    Module._free = (e) => (Module._free = wasmExports.free)(e);
    Module._realloc = (e, t2) => (Module._realloc = wasmExports.realloc)(e, t2);
    Module._iswprint_l = (e, t2) => (Module._iswprint_l = wasmExports.iswprint_l)(e, t2);
    Module._iswalpha_l = (e, t2) => (Module._iswalpha_l = wasmExports.iswalpha_l)(e, t2);
    Module._iswdigit_l = (e, t2) => (Module._iswdigit_l = wasmExports.iswdigit_l)(e, t2);
    Module._isdigit_l = (e, t2) => (Module._isdigit_l = wasmExports.isdigit_l)(e, t2);
    Module._iswpunct_l = (e, t2) => (Module._iswpunct_l = wasmExports.iswpunct_l)(e, t2);
    Module._iswspace_l = (e, t2) => (Module._iswspace_l = wasmExports.iswspace_l)(e, t2);
    Module._iswlower_l = (e, t2) => (Module._iswlower_l = wasmExports.iswlower_l)(e, t2);
    Module._iswupper_l = (e, t2) => (Module._iswupper_l = wasmExports.iswupper_l)(e, t2);
    Module._pg_ascii_tolower = (e) => (Module._pg_ascii_tolower = wasmExports.pg_ascii_tolower)(e);
    Module._towlower_l = (e, t2) => (Module._towlower_l = wasmExports.towlower_l)(e, t2);
    Module._tolower_l = (e, t2) => (Module._tolower_l = wasmExports.tolower_l)(e, t2);
    Module._towupper_l = (e, t2) => (Module._towupper_l = wasmExports.towupper_l)(e, t2);
    Module._toupper_l = (e, t2) => (Module._toupper_l = wasmExports.toupper_l)(e, t2);
    Module._pg_reg_getinitialstate = (e) => (Module._pg_reg_getinitialstate = wasmExports.pg_reg_getinitialstate)(e);
    Module._pg_reg_getfinalstate = (e) => (Module._pg_reg_getfinalstate = wasmExports.pg_reg_getfinalstate)(e);
    Module._pg_reg_getnumoutarcs = (e, t2) => (Module._pg_reg_getnumoutarcs = wasmExports.pg_reg_getnumoutarcs)(e, t2);
    Module._pg_reg_getoutarcs = (e, t2, r, a2) => (Module._pg_reg_getoutarcs = wasmExports.pg_reg_getoutarcs)(e, t2, r, a2);
    Module._pg_reg_getnumcolors = (e) => (Module._pg_reg_getnumcolors = wasmExports.pg_reg_getnumcolors)(e);
    Module._pg_reg_colorisbegin = (e, t2) => (Module._pg_reg_colorisbegin = wasmExports.pg_reg_colorisbegin)(e, t2);
    Module._pg_reg_colorisend = (e, t2) => (Module._pg_reg_colorisend = wasmExports.pg_reg_colorisend)(e, t2);
    Module._pg_reg_getnumcharacters = (e, t2) => (Module._pg_reg_getnumcharacters = wasmExports.pg_reg_getnumcharacters)(e, t2);
    Module._pg_reg_getcharacters = (e, t2, r, a2) => (Module._pg_reg_getcharacters = wasmExports.pg_reg_getcharacters)(e, t2, r, a2);
    Module._dsa_pin = (e) => (Module._dsa_pin = wasmExports.dsa_pin)(e);
    Module._OutputPluginPrepareWrite = (e, t2) => (Module._OutputPluginPrepareWrite = wasmExports.OutputPluginPrepareWrite)(e, t2);
    Module._OutputPluginWrite = (e, t2) => (Module._OutputPluginWrite = wasmExports.OutputPluginWrite)(e, t2);
    Module._array_contains_nulls = (e) => (Module._array_contains_nulls = wasmExports.array_contains_nulls)(e);
    Module._CacheRegisterRelcacheCallback = (e, t2) => (Module._CacheRegisterRelcacheCallback = wasmExports.CacheRegisterRelcacheCallback)(e, t2);
    Module._hash_seq_term = (e) => (Module._hash_seq_term = wasmExports.hash_seq_term)(e);
    Module._FreeErrorData = (e) => (Module._FreeErrorData = wasmExports.FreeErrorData)(e);
    Module._RelidByRelfilenumber = (e, t2) => (Module._RelidByRelfilenumber = wasmExports.RelidByRelfilenumber)(e, t2);
    Module._SnapBuildRestoreSnapshot = (e, t2, r, a2) => (Module._SnapBuildRestoreSnapshot = wasmExports.SnapBuildRestoreSnapshot)(e, t2, r, a2);
    Module._WaitLatchOrSocket = (e, t2, r, a2, o2) => (Module._WaitLatchOrSocket = wasmExports.WaitLatchOrSocket)(e, t2, r, a2, o2);
    Module._BufFileCreateFileSet = (e, t2) => (Module._BufFileCreateFileSet = wasmExports.BufFileCreateFileSet)(e, t2);
    Module._BufFileOpenFileSet = (e, t2, r, a2) => (Module._BufFileOpenFileSet = wasmExports.BufFileOpenFileSet)(e, t2, r, a2);
    Module._BufFileTell = (e, t2, r) => (Module._BufFileTell = wasmExports.BufFileTell)(e, t2, r);
    Module._ConditionVariablePrepareToSleep = (e) => (Module._ConditionVariablePrepareToSleep = wasmExports.ConditionVariablePrepareToSleep)(e);
    Module._get_row_security_policies = (e, t2, r, a2, o2, _3, s2) => (Module._get_row_security_policies = wasmExports.get_row_security_policies)(e, t2, r, a2, o2, _3, s2);
    Module._extract_variadic_args = (e, t2, r, a2, o2, _3) => (Module._extract_variadic_args = wasmExports.extract_variadic_args)(e, t2, r, a2, o2, _3);
    Module._errhidestmt = (e) => (Module._errhidestmt = wasmExports.errhidestmt)(e);
    Module._hash_estimate_size = (e, t2) => (Module._hash_estimate_size = wasmExports.hash_estimate_size)(e, t2);
    Module._ShmemInitHash = (e, t2, r, a2, o2) => (Module._ShmemInitHash = wasmExports.ShmemInitHash)(e, t2, r, a2, o2);
    Module._LockBufHdr = (e) => (Module._LockBufHdr = wasmExports.LockBufHdr)(e);
    Module._EvictUnpinnedBuffer = (e, t2) => (Module._EvictUnpinnedBuffer = wasmExports.EvictUnpinnedBuffer)(e, t2);
    Module._EvictAllUnpinnedBuffers = (e, t2, r) => (Module._EvictAllUnpinnedBuffers = wasmExports.EvictAllUnpinnedBuffers)(e, t2, r);
    Module._EvictRelUnpinnedBuffers = (e, t2, r, a2) => (Module._EvictRelUnpinnedBuffers = wasmExports.EvictRelUnpinnedBuffers)(e, t2, r, a2);
    Module._have_free_buffer = () => (Module._have_free_buffer = wasmExports.have_free_buffer)();
    var _calloc = Module._calloc = (e, t2) => (_calloc = Module._calloc = wasmExports.calloc)(e, t2);
    Module._BufFileExportFileSet = (e) => (Module._BufFileExportFileSet = wasmExports.BufFileExportFileSet)(e);
    Module._copy_file = (e, t2) => (Module._copy_file = wasmExports.copy_file)(e, t2);
    Module._fdatasync = (e) => (Module._fdatasync = wasmExports.fdatasync)(e);
    Module._truncate = (e, t2) => (Module._truncate = wasmExports.truncate)(e, t2);
    Module._dup = (e) => (Module._dup = wasmExports.dup)(e);
    Module._AcquireExternalFD = () => (Module._AcquireExternalFD = wasmExports.AcquireExternalFD)();
    Module._mkdir = (e, t2) => (Module._mkdir = wasmExports.mkdir)(e, t2);
    Module._pgl_popen = (e, t2) => (Module._pgl_popen = wasmExports.pgl_popen)(e, t2);
    Module._pgl_pclose = (e) => (Module._pgl_pclose = wasmExports.pgl_pclose)(e);
    Module._closedir = (e) => (Module._closedir = wasmExports.closedir)(e);
    Module._opendir = (e) => (Module._opendir = wasmExports.opendir)(e);
    Module._readdir = (e) => (Module._readdir = wasmExports.readdir)(e);
    Module._GetNamedDSMSegment = (e, t2, r, a2) => (Module._GetNamedDSMSegment = wasmExports.GetNamedDSMSegment)(e, t2, r, a2);
    Module._pgl_atexit = (e) => (Module._pgl_atexit = wasmExports.pgl_atexit)(e);
    Module._RequestAddinShmemSpace = (e) => (Module._RequestAddinShmemSpace = wasmExports.RequestAddinShmemSpace)(e);
    Module._GetRunningTransactionData = () => (Module._GetRunningTransactionData = wasmExports.GetRunningTransactionData)();
    Module._BackendXidGetPid = (e) => (Module._BackendXidGetPid = wasmExports.BackendXidGetPid)(e);
    Module._pg_numa_init = () => (Module._pg_numa_init = wasmExports.pg_numa_init)();
    Module._sysconf = (e) => (Module._sysconf = wasmExports.sysconf)(e);
    Module._pg_numa_query_pages = (e, t2, r, a2) => (Module._pg_numa_query_pages = wasmExports.pg_numa_query_pages)(e, t2, r, a2);
    Module._pg_get_shmem_pagesize = () => (Module._pg_get_shmem_pagesize = wasmExports.pg_get_shmem_pagesize)();
    Module._pgl_poll = (e, t2, r) => (Module._pgl_poll = wasmExports.pgl_poll)(e, t2, r);
    Module._GetLockmodeName = (e, t2) => (Module._GetLockmodeName = wasmExports.GetLockmodeName)(e, t2);
    Module._LWLockRegisterTranche = (e, t2) => (Module._LWLockRegisterTranche = wasmExports.LWLockRegisterTranche)(e, t2);
    Module._GetNamedLWLockTranche = (e) => (Module._GetNamedLWLockTranche = wasmExports.GetNamedLWLockTranche)(e);
    Module._LWLockNewTrancheId = () => (Module._LWLockNewTrancheId = wasmExports.LWLockNewTrancheId)();
    Module._RequestNamedLWLockTranche = (e, t2) => (Module._RequestNamedLWLockTranche = wasmExports.RequestNamedLWLockTranche)(e, t2);
    Module._LWLockHeldByMe = (e) => (Module._LWLockHeldByMe = wasmExports.LWLockHeldByMe)(e);
    Module._ProcessStartupPacket = (e, t2, r) => (Module._ProcessStartupPacket = wasmExports.ProcessStartupPacket)(e, t2, r);
    var _htons = (e) => (_htons = wasmExports.htons)(e), _htonl = (e) => (_htonl = wasmExports.htonl)(e);
    Module._pgl_startPGlite = () => (Module._pgl_startPGlite = wasmExports.pgl_startPGlite)();
    Module._pgl_pq_flush = () => (Module._pgl_pq_flush = wasmExports.pgl_pq_flush)();
    Module._pgl_getMyProcPort = () => (Module._pgl_getMyProcPort = wasmExports.pgl_getMyProcPort)();
    Module._pgl_sendConnData = () => (Module._pgl_sendConnData = wasmExports.pgl_sendConnData)();
    Module._PostgresMainLongJmp = () => (Module._PostgresMainLongJmp = wasmExports.PostgresMainLongJmp)();
    Module._PostgresMainLoopOnce = () => (Module._PostgresMainLoopOnce = wasmExports.PostgresMainLoopOnce)();
    Module._PostgresSendReadyForQueryIfNecessary = () => (Module._PostgresSendReadyForQueryIfNecessary = wasmExports.PostgresSendReadyForQueryIfNecessary)();
    Module._pgl_setPGliteExitStatus = (e) => (Module._pgl_setPGliteExitStatus = wasmExports.pgl_setPGliteExitStatus)(e);
    Module._standard_ProcessUtility = (e, t2, r, a2, o2, _3, s2, n2) => (Module._standard_ProcessUtility = wasmExports.standard_ProcessUtility)(e, t2, r, a2, o2, _3, s2, n2);
    Module._lookup_ts_dictionary_cache = (e) => (Module._lookup_ts_dictionary_cache = wasmExports.lookup_ts_dictionary_cache)(e);
    Module._get_tsearch_config_filename = (e, t2) => (Module._get_tsearch_config_filename = wasmExports.get_tsearch_config_filename)(e, t2);
    Module._str_tolower = (e, t2, r) => (Module._str_tolower = wasmExports.str_tolower)(e, t2, r);
    Module._readstoplist = (e, t2, r) => (Module._readstoplist = wasmExports.readstoplist)(e, t2, r);
    Module._searchstoplist = (e, t2) => (Module._searchstoplist = wasmExports.searchstoplist)(e, t2);
    Module._tsearch_readline_begin = (e, t2) => (Module._tsearch_readline_begin = wasmExports.tsearch_readline_begin)(e, t2);
    Module._tsearch_readline = (e) => (Module._tsearch_readline = wasmExports.tsearch_readline)(e);
    Module._tsearch_readline_end = (e) => (Module._tsearch_readline_end = wasmExports.tsearch_readline_end)(e);
    Module._stringToQualifiedNameList = (e, t2) => (Module._stringToQualifiedNameList = wasmExports.stringToQualifiedNameList)(e, t2);
    Module._to_tsvector_byid = (e) => (Module._to_tsvector_byid = wasmExports.to_tsvector_byid)(e);
    Module._t_isalnum_with_len = (e, t2) => (Module._t_isalnum_with_len = wasmExports.t_isalnum_with_len)(e, t2);
    Module._isalnum = (e) => (Module._isalnum = wasmExports.isalnum)(e);
    Module._t_isalnum_cstr = (e) => (Module._t_isalnum_cstr = wasmExports.t_isalnum_cstr)(e);
    Module._pg_mblen_unbounded = (e) => (Module._pg_mblen_unbounded = wasmExports.pg_mblen_unbounded)(e);
    Module._get_restriction_variable = (e, t2, r, a2, o2, _3) => (Module._get_restriction_variable = wasmExports.get_restriction_variable)(e, t2, r, a2, o2, _3);
    Module._pg_mblen_range = (e, t2) => (Module._pg_mblen_range = wasmExports.pg_mblen_range)(e, t2);
    Module._MemoryContextAllocHuge = (e, t2) => (Module._MemoryContextAllocHuge = wasmExports.MemoryContextAllocHuge)(e, t2);
    Module._fseek = (e, t2, r) => (Module._fseek = wasmExports.fseek)(e, t2, r);
    Module._WaitEventExtensionNew = (e) => (Module._WaitEventExtensionNew = wasmExports.WaitEventExtensionNew)(e);
    Module._pg_popcount64 = (e) => (Module._pg_popcount64 = wasmExports.pg_popcount64)(e);
    Module._expand_array = (e, t2, r) => (Module._expand_array = wasmExports.expand_array)(e, t2, r);
    Module._exp = (e) => (Module._exp = wasmExports.exp)(e);
    Module._arraycontsel = (e) => (Module._arraycontsel = wasmExports.arraycontsel)(e);
    Module._arraycontjoinsel = (e) => (Module._arraycontjoinsel = wasmExports.arraycontjoinsel)(e);
    Module._initArrayResult = (e, t2, r) => (Module._initArrayResult = wasmExports.initArrayResult)(e, t2, r);
    Module._array_create_iterator = (e, t2, r) => (Module._array_create_iterator = wasmExports.array_create_iterator)(e, t2, r);
    Module._array_iterate = (e, t2, r) => (Module._array_iterate = wasmExports.array_iterate)(e, t2, r);
    Module._array_free_iterator = (e) => (Module._array_free_iterator = wasmExports.array_free_iterator)(e);
    Module._ArrayGetIntegerTypmods = (e, t2) => (Module._ArrayGetIntegerTypmods = wasmExports.ArrayGetIntegerTypmods)(e, t2);
    Module._boolin = (e) => (Module._boolin = wasmExports.boolin)(e);
    Module.___multi3 = (e, t2, r, a2, o2) => (Module.___multi3 = wasmExports.__multi3)(e, t2, r, a2, o2);
    Module._cash_cmp = (e) => (Module._cash_cmp = wasmExports.cash_cmp)(e);
    Module._int64_to_numeric = (e) => (Module._int64_to_numeric = wasmExports.int64_to_numeric)(e);
    Module._numeric_div = (e) => (Module._numeric_div = wasmExports.numeric_div)(e);
    Module._numeric_round = (e) => (Module._numeric_round = wasmExports.numeric_round)(e);
    Module._numeric_int8 = (e) => (Module._numeric_int8 = wasmExports.numeric_int8)(e);
    Module._numeric_mul = (e) => (Module._numeric_mul = wasmExports.numeric_mul)(e);
    Module._j2date = (e, t2, r, a2) => (Module._j2date = wasmExports.j2date)(e, t2, r, a2);
    Module._EncodeDateOnly = (e, t2, r) => (Module._EncodeDateOnly = wasmExports.EncodeDateOnly)(e, t2, r);
    Module._EncodeSpecialDate = (e, t2) => (Module._EncodeSpecialDate = wasmExports.EncodeSpecialDate)(e, t2);
    Module._date_eq = (e) => (Module._date_eq = wasmExports.date_eq)(e);
    Module._date_lt = (e) => (Module._date_lt = wasmExports.date_lt)(e);
    Module._date_le = (e) => (Module._date_le = wasmExports.date_le)(e);
    Module._date_gt = (e) => (Module._date_gt = wasmExports.date_gt)(e);
    Module._date_ge = (e) => (Module._date_ge = wasmExports.date_ge)(e);
    Module._date_cmp = (e) => (Module._date_cmp = wasmExports.date_cmp)(e);
    Module._date_mi = (e) => (Module._date_mi = wasmExports.date_mi)(e);
    Module._timestamp2tm = (e, t2, r, a2, o2, _3) => (Module._timestamp2tm = wasmExports.timestamp2tm)(e, t2, r, a2, o2, _3);
    Module._time2tm = (e, t2, r) => (Module._time2tm = wasmExports.time2tm)(e, t2, r);
    Module._EncodeTimeOnly = (e, t2, r, a2, o2, _3) => (Module._EncodeTimeOnly = wasmExports.EncodeTimeOnly)(e, t2, r, a2, o2, _3);
    Module._time_eq = (e) => (Module._time_eq = wasmExports.time_eq)(e);
    Module._time_lt = (e) => (Module._time_lt = wasmExports.time_lt)(e);
    Module._time_le = (e) => (Module._time_le = wasmExports.time_le)(e);
    Module._time_gt = (e) => (Module._time_gt = wasmExports.time_gt)(e);
    Module._time_ge = (e) => (Module._time_ge = wasmExports.time_ge)(e);
    Module._time_cmp = (e) => (Module._time_cmp = wasmExports.time_cmp)(e);
    Module._time_mi_time = (e) => (Module._time_mi_time = wasmExports.time_mi_time)(e);
    Module._timetz2tm = (e, t2, r, a2) => (Module._timetz2tm = wasmExports.timetz2tm)(e, t2, r, a2);
    Module._timetz_cmp = (e) => (Module._timetz_cmp = wasmExports.timetz_cmp)(e);
    Module._pg_tolower = (e) => (Module._pg_tolower = wasmExports.pg_tolower)(e);
    Module._EncodeDateTime = (e, t2, r, a2, o2, _3, s2) => (Module._EncodeDateTime = wasmExports.EncodeDateTime)(e, t2, r, a2, o2, _3, s2);
    Module._TransferExpandedObject = (e, t2) => (Module._TransferExpandedObject = wasmExports.TransferExpandedObject)(e, t2);
    Module._forkname_to_number = (e) => (Module._forkname_to_number = wasmExports.forkname_to_number)(e);
    Module._numeric_lt = (e) => (Module._numeric_lt = wasmExports.numeric_lt)(e);
    Module._numeric_abs = (e) => (Module._numeric_abs = wasmExports.numeric_abs)(e);
    Module._numeric_add = (e) => (Module._numeric_add = wasmExports.numeric_add)(e);
    Module._numeric_ge = (e) => (Module._numeric_ge = wasmExports.numeric_ge)(e);
    Module._err_generic_string = (e, t2) => (Module._err_generic_string = wasmExports.err_generic_string)(e, t2);
    Module._domain_check = (e, t2, r, a2, o2) => (Module._domain_check = wasmExports.domain_check)(e, t2, r, a2, o2);
    Module._enum_lt = (e) => (Module._enum_lt = wasmExports.enum_lt)(e);
    Module._enum_le = (e) => (Module._enum_le = wasmExports.enum_le)(e);
    Module._enum_ge = (e) => (Module._enum_ge = wasmExports.enum_ge)(e);
    Module._enum_gt = (e) => (Module._enum_gt = wasmExports.enum_gt)(e);
    Module._enum_cmp = (e) => (Module._enum_cmp = wasmExports.enum_cmp)(e);
    Module._make_expanded_record_from_typeid = (e, t2, r) => (Module._make_expanded_record_from_typeid = wasmExports.make_expanded_record_from_typeid)(e, t2, r);
    Module._make_expanded_record_from_tupdesc = (e, t2) => (Module._make_expanded_record_from_tupdesc = wasmExports.make_expanded_record_from_tupdesc)(e, t2);
    Module._make_expanded_record_from_exprecord = (e, t2) => (Module._make_expanded_record_from_exprecord = wasmExports.make_expanded_record_from_exprecord)(e, t2);
    Module._expanded_record_set_tuple = (e, t2, r, a2) => (Module._expanded_record_set_tuple = wasmExports.expanded_record_set_tuple)(e, t2, r, a2);
    Module._expanded_record_get_tuple = (e) => (Module._expanded_record_get_tuple = wasmExports.expanded_record_get_tuple)(e);
    Module._deconstruct_expanded_record = (e) => (Module._deconstruct_expanded_record = wasmExports.deconstruct_expanded_record)(e);
    Module._expanded_record_lookup_field = (e, t2, r) => (Module._expanded_record_lookup_field = wasmExports.expanded_record_lookup_field)(e, t2, r);
    Module._expanded_record_set_field_internal = (e, t2, r, a2, o2, _3) => (Module._expanded_record_set_field_internal = wasmExports.expanded_record_set_field_internal)(e, t2, r, a2, o2, _3);
    Module._expanded_record_set_fields = (e, t2, r, a2) => (Module._expanded_record_set_fields = wasmExports.expanded_record_set_fields)(e, t2, r, a2);
    Module._float4in_internal = (e, t2, r, a2, o2) => (Module._float4in_internal = wasmExports.float4in_internal)(e, t2, r, a2, o2);
    Module._strtof = (e, t2) => (Module._strtof = wasmExports.strtof)(e, t2);
    Module._float_to_shortest_decimal_buf = (e, t2) => (Module._float_to_shortest_decimal_buf = wasmExports.float_to_shortest_decimal_buf)(e, t2);
    Module._float8in = (e) => (Module._float8in = wasmExports.float8in)(e);
    Module._float8in_internal = (e, t2, r, a2, o2) => (Module._float8in_internal = wasmExports.float8in_internal)(e, t2, r, a2, o2);
    Module._float8out = (e) => (Module._float8out = wasmExports.float8out)(e);
    Module._float8out_internal = (e) => (Module._float8out_internal = wasmExports.float8out_internal)(e);
    Module._float8pl = (e) => (Module._float8pl = wasmExports.float8pl)(e);
    Module._float4_cmp_internal = (e, t2) => (Module._float4_cmp_internal = wasmExports.float4_cmp_internal)(e, t2);
    Module._btfloat4cmp = (e) => (Module._btfloat4cmp = wasmExports.btfloat4cmp)(e);
    Module._btfloat8cmp = (e) => (Module._btfloat8cmp = wasmExports.btfloat8cmp)(e);
    Module._dtoi4 = (e) => (Module._dtoi4 = wasmExports.dtoi4)(e);
    Module._dtoi2 = (e) => (Module._dtoi2 = wasmExports.dtoi2)(e);
    Module._cbrt = (e) => (Module._cbrt = wasmExports.cbrt)(e);
    Module._dexp = (e) => (Module._dexp = wasmExports.dexp)(e);
    Module._log10 = (e) => (Module._log10 = wasmExports.log10)(e);
    Module._dacos = (e) => (Module._dacos = wasmExports.dacos)(e);
    Module._acos = (e) => (Module._acos = wasmExports.acos)(e);
    Module._dasin = (e) => (Module._dasin = wasmExports.dasin)(e);
    Module._asin = (e) => (Module._asin = wasmExports.asin)(e);
    Module._datan = (e) => (Module._datan = wasmExports.datan)(e);
    Module._atan = (e) => (Module._atan = wasmExports.atan)(e);
    Module._datan2 = (e) => (Module._datan2 = wasmExports.datan2)(e);
    Module._atan2 = (e, t2) => (Module._atan2 = wasmExports.atan2)(e, t2);
    Module._dcos = (e) => (Module._dcos = wasmExports.dcos)(e);
    Module._cos = (e) => (Module._cos = wasmExports.cos)(e);
    Module._dcot = (e) => (Module._dcot = wasmExports.dcot)(e);
    Module._tan = (e) => (Module._tan = wasmExports.tan)(e);
    Module._dsin = (e) => (Module._dsin = wasmExports.dsin)(e);
    Module._sin = (e) => (Module._sin = wasmExports.sin)(e);
    Module._dtan = (e) => (Module._dtan = wasmExports.dtan)(e);
    Module._fmod = (e, t2) => (Module._fmod = wasmExports.fmod)(e, t2);
    Module._degrees = (e) => (Module._degrees = wasmExports.degrees)(e);
    Module._dpi = (e) => (Module._dpi = wasmExports.dpi)(e);
    Module._radians = (e) => (Module._radians = wasmExports.radians)(e);
    Module._sinh = (e) => (Module._sinh = wasmExports.sinh)(e);
    Module._cosh = (e) => (Module._cosh = wasmExports.cosh)(e);
    Module._tanh = (e) => (Module._tanh = wasmExports.tanh)(e);
    Module._asinh = (e) => (Module._asinh = wasmExports.asinh)(e);
    Module._acosh = (e) => (Module._acosh = wasmExports.acosh)(e);
    Module._atanh = (e) => (Module._atanh = wasmExports.atanh)(e);
    Module._float8_accum = (e) => (Module._float8_accum = wasmExports.float8_accum)(e);
    Module._float8_stddev_pop = (e) => (Module._float8_stddev_pop = wasmExports.float8_stddev_pop)(e);
    Module._float8_stddev_samp = (e) => (Module._float8_stddev_samp = wasmExports.float8_stddev_samp)(e);
    Module._asc_tolower = (e, t2) => (Module._asc_tolower = wasmExports.asc_tolower)(e, t2);
    Module._pg_strfold = (e, t2, r, a2, o2) => (Module._pg_strfold = wasmExports.pg_strfold)(e, t2, r, a2, o2);
    Module._numeric_power = (e) => (Module._numeric_power = wasmExports.numeric_power)(e);
    Module._dtoi8 = (e) => (Module._dtoi8 = wasmExports.dtoi8)(e);
    Module._int8out = (e) => (Module._int8out = wasmExports.int8out)(e);
    Module._fseeko = (e, t2, r) => (Module._fseeko = wasmExports.fseeko)(e, t2, r);
    Module._int4in = (e) => (Module._int4in = wasmExports.int4in)(e);
    Module._int4_bool = (e) => (Module._int4_bool = wasmExports.int4_bool)(e);
    Module._int8pl = (e) => (Module._int8pl = wasmExports.int8pl)(e);
    Module._int84 = (e) => (Module._int84 = wasmExports.int84)(e);
    Module._int82 = (e) => (Module._int82 = wasmExports.int82)(e);
    Module._json_in = (e) => (Module._json_in = wasmExports.json_in)(e);
    Module._EncodeSpecialTimestamp = (e, t2) => (Module._EncodeSpecialTimestamp = wasmExports.EncodeSpecialTimestamp)(e, t2);
    Module._pushJsonbValue = (e, t2, r) => (Module._pushJsonbValue = wasmExports.pushJsonbValue)(e, t2, r);
    Module._numeric_int2 = (e) => (Module._numeric_int2 = wasmExports.numeric_int2)(e);
    Module._numeric_int4 = (e) => (Module._numeric_int4 = wasmExports.numeric_int4)(e);
    Module._numeric_float4 = (e) => (Module._numeric_float4 = wasmExports.numeric_float4)(e);
    Module._numeric_normalize = (e) => (Module._numeric_normalize = wasmExports.numeric_normalize)(e);
    Module._numeric_cmp = (e) => (Module._numeric_cmp = wasmExports.numeric_cmp)(e);
    Module._numeric_eq = (e) => (Module._numeric_eq = wasmExports.numeric_eq)(e);
    Module._hash_numeric = (e) => (Module._hash_numeric = wasmExports.hash_numeric)(e);
    Module._hash_numeric_extended = (e) => (Module._hash_numeric_extended = wasmExports.hash_numeric_extended)(e);
    Module._int2_numeric = (e) => (Module._int2_numeric = wasmExports.int2_numeric)(e);
    Module._int4_numeric = (e) => (Module._int4_numeric = wasmExports.int4_numeric)(e);
    Module._int8_numeric = (e) => (Module._int8_numeric = wasmExports.int8_numeric)(e);
    Module._float4_numeric = (e) => (Module._float4_numeric = wasmExports.float4_numeric)(e);
    Module._float8_numeric = (e) => (Module._float8_numeric = wasmExports.float8_numeric)(e);
    Module._numeric_uminus = (e) => (Module._numeric_uminus = wasmExports.numeric_uminus)(e);
    Module._numeric_is_nan = (e) => (Module._numeric_is_nan = wasmExports.numeric_is_nan)(e);
    Module._numeric_ceil = (e) => (Module._numeric_ceil = wasmExports.numeric_ceil)(e);
    Module._numeric_floor = (e) => (Module._numeric_floor = wasmExports.numeric_floor)(e);
    Module._timestamp_cmp = (e) => (Module._timestamp_cmp = wasmExports.timestamp_cmp)(e);
    Module._macaddr_cmp = (e) => (Module._macaddr_cmp = wasmExports.macaddr_cmp)(e);
    Module._macaddr_lt = (e) => (Module._macaddr_lt = wasmExports.macaddr_lt)(e);
    Module._macaddr_le = (e) => (Module._macaddr_le = wasmExports.macaddr_le)(e);
    Module._macaddr_eq = (e) => (Module._macaddr_eq = wasmExports.macaddr_eq)(e);
    Module._macaddr_ge = (e) => (Module._macaddr_ge = wasmExports.macaddr_ge)(e);
    Module._macaddr_gt = (e) => (Module._macaddr_gt = wasmExports.macaddr_gt)(e);
    Module._macaddr8_cmp = (e) => (Module._macaddr8_cmp = wasmExports.macaddr8_cmp)(e);
    Module._macaddr8_lt = (e) => (Module._macaddr8_lt = wasmExports.macaddr8_lt)(e);
    Module._macaddr8_le = (e) => (Module._macaddr8_le = wasmExports.macaddr8_le)(e);
    Module._macaddr8_eq = (e) => (Module._macaddr8_eq = wasmExports.macaddr8_eq)(e);
    Module._macaddr8_ge = (e) => (Module._macaddr8_ge = wasmExports.macaddr8_ge)(e);
    Module._macaddr8_gt = (e) => (Module._macaddr8_gt = wasmExports.macaddr8_gt)(e);
    Module._current_query = (e) => (Module._current_query = wasmExports.current_query)(e);
    Module._get_fn_expr_arg_stable = (e, t2) => (Module._get_fn_expr_arg_stable = wasmExports.get_fn_expr_arg_stable)(e, t2);
    Module._unpack_sql_state = (e) => (Module._unpack_sql_state = wasmExports.unpack_sql_state)(e);
    Module._get_fn_expr_rettype = (e) => (Module._get_fn_expr_rettype = wasmExports.get_fn_expr_rettype)(e);
    Module._btnamecmp = (e) => (Module._btnamecmp = wasmExports.btnamecmp)(e);
    Module._inet_in = (e) => (Module._inet_in = wasmExports.inet_in)(e);
    Module._network_cmp = (e) => (Module._network_cmp = wasmExports.network_cmp)(e);
    Module._convert_network_to_scalar = (e, t2, r) => (Module._convert_network_to_scalar = wasmExports.convert_network_to_scalar)(e, t2, r);
    Module._numeric_sign = (e) => (Module._numeric_sign = wasmExports.numeric_sign)(e);
    Module._numeric_gt = (e) => (Module._numeric_gt = wasmExports.numeric_gt)(e);
    Module._numeric_le = (e) => (Module._numeric_le = wasmExports.numeric_le)(e);
    Module._numeric_mod = (e) => (Module._numeric_mod = wasmExports.numeric_mod)(e);
    Module._numeric_sqrt = (e) => (Module._numeric_sqrt = wasmExports.numeric_sqrt)(e);
    Module.___divti3 = (e, t2, r, a2, o2) => (Module.___divti3 = wasmExports.__divti3)(e, t2, r, a2, o2);
    Module._numeric_exp = (e) => (Module._numeric_exp = wasmExports.numeric_exp)(e);
    Module._numeric_ln = (e) => (Module._numeric_ln = wasmExports.numeric_ln)(e);
    Module._numeric_log = (e) => (Module._numeric_log = wasmExports.numeric_log)(e);
    Module._numeric_float8_no_overflow = (e) => (Module._numeric_float8_no_overflow = wasmExports.numeric_float8_no_overflow)(e);
    Module._oidout = (e) => (Module._oidout = wasmExports.oidout)(e);
    Module._btrim1 = (e) => (Module._btrim1 = wasmExports.btrim1)(e);
    Module._ltrim1 = (e) => (Module._ltrim1 = wasmExports.ltrim1)(e);
    Module._rtrim1 = (e) => (Module._rtrim1 = wasmExports.rtrim1)(e);
    Module._tuplesort_skiptuples = (e, t2, r) => (Module._tuplesort_skiptuples = wasmExports.tuplesort_skiptuples)(e, t2, r);
    Module._interval_mi = (e) => (Module._interval_mi = wasmExports.interval_mi)(e);
    Module._setlocale = (e, t2) => (Module._setlocale = wasmExports.setlocale)(e, t2);
    Module._newlocale = (e, t2, r) => (Module._newlocale = wasmExports.newlocale)(e, t2, r);
    Module._strftime_l = (e, t2, r, a2, o2) => (Module._strftime_l = wasmExports.strftime_l)(e, t2, r, a2, o2);
    Module._freelocale = (e) => (Module._freelocale = wasmExports.freelocale)(e);
    Module._uselocale = (e) => (Module._uselocale = wasmExports.uselocale)(e);
    Module._strcoll_l = (e, t2, r) => (Module._strcoll_l = wasmExports.strcoll_l)(e, t2, r);
    Module._strxfrm_l = (e, t2, r, a2) => (Module._strxfrm_l = wasmExports.strxfrm_l)(e, t2, r, a2);
    Module._drandom = (e) => (Module._drandom = wasmExports.drandom)(e);
    Module._quote_ident = (e) => (Module._quote_ident = wasmExports.quote_ident)(e);
    Module._textregexeq = (e) => (Module._textregexeq = wasmExports.textregexeq)(e);
    Module._text_substr = (e) => (Module._text_substr = wasmExports.text_substr)(e);
    Module._pg_wchar2mb_with_len = (e, t2, r) => (Module._pg_wchar2mb_with_len = wasmExports.pg_wchar2mb_with_len)(e, t2, r);
    Module._regexp_split_to_array = (e) => (Module._regexp_split_to_array = wasmExports.regexp_split_to_array)(e);
    Module._regclassin = (e) => (Module._regclassin = wasmExports.regclassin)(e);
    Module._regtypeout = (e) => (Module._regtypeout = wasmExports.regtypeout)(e);
    Module._pg_get_indexdef_columns_extended = (e, t2) => (Module._pg_get_indexdef_columns_extended = wasmExports.pg_get_indexdef_columns_extended)(e, t2);
    Module._pg_get_querydef = (e, t2) => (Module._pg_get_querydef = wasmExports.pg_get_querydef)(e, t2);
    Module._strcspn = (e, t2) => (Module._strcspn = wasmExports.strcspn)(e, t2);
    Module._generic_restriction_selectivity = (e, t2, r, a2, o2, _3) => (Module._generic_restriction_selectivity = wasmExports.generic_restriction_selectivity)(e, t2, r, a2, o2, _3);
    Module._genericcostestimate = (e, t2, r, a2) => (Module._genericcostestimate = wasmExports.genericcostestimate)(e, t2, r, a2);
    Module._tidin = (e) => (Module._tidin = wasmExports.tidin)(e);
    Module._tidout = (e) => (Module._tidout = wasmExports.tidout)(e);
    Module._timestamp_in = (e) => (Module._timestamp_in = wasmExports.timestamp_in)(e);
    Module._timestamp_eq = (e) => (Module._timestamp_eq = wasmExports.timestamp_eq)(e);
    Module._timestamp_lt = (e) => (Module._timestamp_lt = wasmExports.timestamp_lt)(e);
    Module._timestamp_gt = (e) => (Module._timestamp_gt = wasmExports.timestamp_gt)(e);
    Module._timestamp_le = (e) => (Module._timestamp_le = wasmExports.timestamp_le)(e);
    Module._timestamp_ge = (e) => (Module._timestamp_ge = wasmExports.timestamp_ge)(e);
    Module._interval_eq = (e) => (Module._interval_eq = wasmExports.interval_eq)(e);
    Module._interval_lt = (e) => (Module._interval_lt = wasmExports.interval_lt)(e);
    Module._interval_gt = (e) => (Module._interval_gt = wasmExports.interval_gt)(e);
    Module._interval_le = (e) => (Module._interval_le = wasmExports.interval_le)(e);
    Module._interval_ge = (e) => (Module._interval_ge = wasmExports.interval_ge)(e);
    Module._interval_cmp = (e) => (Module._interval_cmp = wasmExports.interval_cmp)(e);
    Module._timestamp_mi = (e) => (Module._timestamp_mi = wasmExports.timestamp_mi)(e);
    Module._interval_um = (e) => (Module._interval_um = wasmExports.interval_um)(e);
    Module._has_fn_opclass_options = (e) => (Module._has_fn_opclass_options = wasmExports.has_fn_opclass_options)(e);
    Module._uuid_in = (e) => (Module._uuid_in = wasmExports.uuid_in)(e);
    Module._uuid_out = (e) => (Module._uuid_out = wasmExports.uuid_out)(e);
    Module._uuid_cmp = (e) => (Module._uuid_cmp = wasmExports.uuid_cmp)(e);
    Module._gen_random_uuid = (e) => (Module._gen_random_uuid = wasmExports.gen_random_uuid)(e);
    Module._varbit_in = (e) => (Module._varbit_in = wasmExports.varbit_in)(e);
    Module._biteq = (e) => (Module._biteq = wasmExports.biteq)(e);
    Module._bitlt = (e) => (Module._bitlt = wasmExports.bitlt)(e);
    Module._bitle = (e) => (Module._bitle = wasmExports.bitle)(e);
    Module._bitgt = (e) => (Module._bitgt = wasmExports.bitgt)(e);
    Module._bitge = (e) => (Module._bitge = wasmExports.bitge)(e);
    Module._bitcmp = (e) => (Module._bitcmp = wasmExports.bitcmp)(e);
    Module._bpchareq = (e) => (Module._bpchareq = wasmExports.bpchareq)(e);
    Module._bpcharlt = (e) => (Module._bpcharlt = wasmExports.bpcharlt)(e);
    Module._bpcharle = (e) => (Module._bpcharle = wasmExports.bpcharle)(e);
    Module._bpchargt = (e) => (Module._bpchargt = wasmExports.bpchargt)(e);
    Module._bpcharge = (e) => (Module._bpcharge = wasmExports.bpcharge)(e);
    Module._bpcharcmp = (e) => (Module._bpcharcmp = wasmExports.bpcharcmp)(e);
    Module._pg_detoast_datum_slice = (e, t2, r) => (Module._pg_detoast_datum_slice = wasmExports.pg_detoast_datum_slice)(e, t2, r);
    Module._text_substr_no_len = (e) => (Module._text_substr_no_len = wasmExports.text_substr_no_len)(e);
    Module._texteq = (e) => (Module._texteq = wasmExports.texteq)(e);
    Module._text_lt = (e) => (Module._text_lt = wasmExports.text_lt)(e);
    Module._text_le = (e) => (Module._text_le = wasmExports.text_le)(e);
    Module._text_gt = (e) => (Module._text_gt = wasmExports.text_gt)(e);
    Module._text_ge = (e) => (Module._text_ge = wasmExports.text_ge)(e);
    Module._bttextcmp = (e) => (Module._bttextcmp = wasmExports.bttextcmp)(e);
    Module._byteaeq = (e) => (Module._byteaeq = wasmExports.byteaeq)(e);
    Module._bytealt = (e) => (Module._bytealt = wasmExports.bytealt)(e);
    Module._byteale = (e) => (Module._byteale = wasmExports.byteale)(e);
    Module._byteagt = (e) => (Module._byteagt = wasmExports.byteagt)(e);
    Module._byteage = (e) => (Module._byteage = wasmExports.byteage)(e);
    Module._byteacmp = (e) => (Module._byteacmp = wasmExports.byteacmp)(e);
    Module._to_hex32 = (e) => (Module._to_hex32 = wasmExports.to_hex32)(e);
    Module._text_left = (e) => (Module._text_left = wasmExports.text_left)(e);
    Module._text_right = (e) => (Module._text_right = wasmExports.text_right)(e);
    Module._text_reverse = (e) => (Module._text_reverse = wasmExports.text_reverse)(e);
    Module._varstr_levenshtein = (e, t2, r, a2, o2, _3, s2, n2) => (Module._varstr_levenshtein = wasmExports.varstr_levenshtein)(e, t2, r, a2, o2, _3, s2, n2);
    Module._pg_utf_mblen_private = (e) => (Module._pg_utf_mblen_private = wasmExports.pg_utf_mblen_private)(e);
    Module._pg_xml_init = (e) => (Module._pg_xml_init = wasmExports.pg_xml_init)(e);
    Module._xml_ereport = (e, t2, r, a2) => (Module._xml_ereport = wasmExports.xml_ereport)(e, t2, r, a2);
    Module._pg_xml_done = (e, t2) => (Module._pg_xml_done = wasmExports.pg_xml_done)(e, t2);
    Module._pg_do_encoding_conversion = (e, t2, r, a2) => (Module._pg_do_encoding_conversion = wasmExports.pg_do_encoding_conversion)(e, t2, r, a2);
    Module._CreateCacheMemoryContext = () => (Module._CreateCacheMemoryContext = wasmExports.CreateCacheMemoryContext)();
    Module._cfunc_resolve_polymorphic_argtypes = (e, t2, r, a2, o2, _3) => (Module._cfunc_resolve_polymorphic_argtypes = wasmExports.cfunc_resolve_polymorphic_argtypes)(e, t2, r, a2, o2, _3);
    Module._get_typsubscript = (e, t2) => (Module._get_typsubscript = wasmExports.get_typsubscript)(e, t2);
    Module._CachedPlanAllowsSimpleValidityCheck = (e, t2, r) => (Module._CachedPlanAllowsSimpleValidityCheck = wasmExports.CachedPlanAllowsSimpleValidityCheck)(e, t2, r);
    Module._CachedPlanIsSimplyValid = (e, t2, r) => (Module._CachedPlanIsSimplyValid = wasmExports.CachedPlanIsSimplyValid)(e, t2, r);
    Module._GetCachedExpression = (e) => (Module._GetCachedExpression = wasmExports.GetCachedExpression)(e);
    Module._FreeCachedExpression = (e) => (Module._FreeCachedExpression = wasmExports.FreeCachedExpression)(e);
    Module._ReleaseAllPlanCacheRefsInOwner = (e) => (Module._ReleaseAllPlanCacheRefsInOwner = wasmExports.ReleaseAllPlanCacheRefsInOwner)(e);
    Module._abort = () => (Module._abort = wasmExports.abort)();
    Module._in_error_recursion_trouble = () => (Module._in_error_recursion_trouble = wasmExports.in_error_recursion_trouble)();
    Module._pg_vfprintf = (e, t2, r) => (Module._pg_vfprintf = wasmExports.pg_vfprintf)(e, t2, r);
    Module._pgl_longjmp = (e, t2) => (Module._pgl_longjmp = wasmExports.pgl_longjmp)(e, t2);
    Module._GetErrorContextStack = () => (Module._GetErrorContextStack = wasmExports.GetErrorContextStack)();
    Module._dlsym = (e, t2) => (Module._dlsym = wasmExports.dlsym)(e, t2);
    Module._dlopen = (e, t2) => (Module._dlopen = wasmExports.dlopen)(e, t2);
    Module._dlerror = () => (Module._dlerror = wasmExports.dlerror)();
    Module._dlclose = (e) => (Module._dlclose = wasmExports.dlclose)(e);
    Module._find_rendezvous_variable = (e) => (Module._find_rendezvous_variable = wasmExports.find_rendezvous_variable)(e);
    Module._CallerFInfoFunctionCall1 = (e, t2, r, a2) => (Module._CallerFInfoFunctionCall1 = wasmExports.CallerFInfoFunctionCall1)(e, t2, r, a2);
    Module._CallerFInfoFunctionCall2 = (e, t2, r, a2, o2) => (Module._CallerFInfoFunctionCall2 = wasmExports.CallerFInfoFunctionCall2)(e, t2, r, a2, o2);
    Module._FunctionCall0Coll = (e, t2) => (Module._FunctionCall0Coll = wasmExports.FunctionCall0Coll)(e, t2);
    Module._RelationNameGetTupleDesc = (e) => (Module._RelationNameGetTupleDesc = wasmExports.RelationNameGetTupleDesc)(e);
    Module._hash_freeze = (e) => (Module._hash_freeze = wasmExports.hash_freeze)(e);
    Module._chdir = (e) => (Module._chdir = wasmExports.chdir)(e);
    Module._pg_bindtextdomain = (e) => (Module._pg_bindtextdomain = wasmExports.pg_bindtextdomain)(e);
    Module._pg_mblen = (e) => (Module._pg_mblen = wasmExports.pg_mblen)(e);
    Module._check_encoding_conversion_args = (e, t2, r, a2, o2) => (Module._check_encoding_conversion_args = wasmExports.check_encoding_conversion_args)(e, t2, r, a2, o2);
    Module._DefineCustomBoolVariable = (e, t2, r, a2, o2, _3, s2, n2, l2, d2) => (Module._DefineCustomBoolVariable = wasmExports.DefineCustomBoolVariable)(e, t2, r, a2, o2, _3, s2, n2, l2, d2);
    Module._DefineCustomIntVariable = (e, t2, r, a2, o2, _3, s2, n2, l2, d2, p2, m2) => (Module._DefineCustomIntVariable = wasmExports.DefineCustomIntVariable)(e, t2, r, a2, o2, _3, s2, n2, l2, d2, p2, m2);
    Module._DefineCustomRealVariable = (e, t2, r, a2, o2, _3, s2, n2, l2, d2, p2, m2) => (Module._DefineCustomRealVariable = wasmExports.DefineCustomRealVariable)(e, t2, r, a2, o2, _3, s2, n2, l2, d2, p2, m2);
    Module._DefineCustomStringVariable = (e, t2, r, a2, o2, _3, s2, n2, l2, d2) => (Module._DefineCustomStringVariable = wasmExports.DefineCustomStringVariable)(e, t2, r, a2, o2, _3, s2, n2, l2, d2);
    Module._DefineCustomEnumVariable = (e, t2, r, a2, o2, _3, s2, n2, l2, d2, p2) => (Module._DefineCustomEnumVariable = wasmExports.DefineCustomEnumVariable)(e, t2, r, a2, o2, _3, s2, n2, l2, d2, p2);
    Module._MarkGUCPrefixReserved = (e) => (Module._MarkGUCPrefixReserved = wasmExports.MarkGUCPrefixReserved)(e);
    Module._sampler_random_init_state = (e, t2) => (Module._sampler_random_init_state = wasmExports.sampler_random_init_state)(e, t2);
    Module._dsa_trim = (e) => (Module._dsa_trim = wasmExports.dsa_trim)(e);
    Module._pchomp = (e) => (Module._pchomp = wasmExports.pchomp)(e);
    Module._PinPortal = (e) => (Module._PinPortal = wasmExports.PinPortal)(e);
    Module._UnpinPortal = (e) => (Module._UnpinPortal = wasmExports.UnpinPortal)(e);
    Module.___lshrti3 = (e, t2, r, a2) => (Module.___lshrti3 = wasmExports.__lshrti3)(e, t2, r, a2);
    Module._realpath = (e, t2) => (Module._realpath = wasmExports.realpath)(e, t2);
    Module._float_to_shortest_decimal_bufn = (e, t2) => (Module._float_to_shortest_decimal_bufn = wasmExports.float_to_shortest_decimal_bufn)(e, t2);
    Module._IsValidJsonNumber = (e, t2) => (Module._IsValidJsonNumber = wasmExports.IsValidJsonNumber)(e, t2);
    Module._pg_prng_uint64 = (e) => (Module._pg_prng_uint64 = wasmExports.pg_prng_uint64)(e);
    Module._makeStringInfoExt = (e) => (Module._makeStringInfoExt = wasmExports.makeStringInfoExt)(e);
    Module._pgl_getpwuid = (e) => (Module._pgl_getpwuid = wasmExports.pgl_getpwuid)(e);
    Module._getcwd = (e, t2) => (Module._getcwd = wasmExports.getcwd)(e, t2);
    Module._pthread_mutex_lock = (e) => (Module._pthread_mutex_lock = wasmExports.pthread_mutex_lock)(e);
    Module._localeconv = () => (Module._localeconv = wasmExports.localeconv)();
    Module._pthread_mutex_unlock = (e) => (Module._pthread_mutex_unlock = wasmExports.pthread_mutex_unlock)(e);
    Module._nanosleep = (e, t2) => (Module._nanosleep = wasmExports.nanosleep)(e, t2);
    Module._strchrnul = (e, t2) => (Module._strchrnul = wasmExports.strchrnul)(e, t2);
    Module._snprintf = (e, t2, r, a2) => (Module._snprintf = wasmExports.snprintf)(e, t2, r, a2);
    Module._strerror = (e) => (Module._strerror = wasmExports.strerror)(e);
    Module._clear_setitimer = () => (Module._clear_setitimer = wasmExports.clear_setitimer)();
    Module._pgl_setPGliteActive = (e) => (Module._pgl_setPGliteActive = wasmExports.pgl_setPGliteActive)(e);
    Module._pgl_getPGliteExitStatus = () => (Module._pgl_getPGliteExitStatus = wasmExports.pgl_getPGliteExitStatus)();
    Module._pgl_siglongjmp = (e, t2) => (Module._pgl_siglongjmp = wasmExports.pgl_siglongjmp)(e, t2);
    Module._pgl_set_system_fn = (e) => (Module._pgl_set_system_fn = wasmExports.pgl_set_system_fn)(e);
    Module._pgl_set_popen_fn = (e) => (Module._pgl_set_popen_fn = wasmExports.pgl_set_popen_fn)(e);
    Module._pgl_set_pclose_fn = (e) => (Module._pgl_set_pclose_fn = wasmExports.pgl_set_pclose_fn)(e);
    Module._pgl_run_atexit_funcs = () => (Module._pgl_run_atexit_funcs = wasmExports.pgl_run_atexit_funcs)();
    Module._pgl_freopen = (e, t2, r) => (Module._pgl_freopen = wasmExports.pgl_freopen)(e, t2, r);
    Module._fiprintf = (e, t2, r) => (Module._fiprintf = wasmExports.fiprintf)(e, t2, r);
    Module._pgl_set_rw_cbs = (e, t2) => (Module._pgl_set_rw_cbs = wasmExports.pgl_set_rw_cbs)(e, t2);
    Module._vfprintf = (e, t2, r) => (Module._vfprintf = wasmExports.vfprintf)(e, t2, r);
    Module._pthread_key_create = (e, t2) => (Module._pthread_key_create = wasmExports.pthread_key_create)(e, t2);
    Module._pthread_getspecific = (e) => (Module._pthread_getspecific = wasmExports.pthread_getspecific)(e);
    Module._pthread_key_delete = (e) => (Module._pthread_key_delete = wasmExports.pthread_key_delete)(e);
    Module._pthread_setspecific = (e, t2) => (Module._pthread_setspecific = wasmExports.pthread_setspecific)(e, t2);
    Module._toupper = (e) => (Module._toupper = wasmExports.toupper)(e);
    Module._iconv_open = (e, t2) => (Module._iconv_open = wasmExports.iconv_open)(e, t2);
    Module._iconv_close = (e) => (Module._iconv_close = wasmExports.iconv_close)(e);
    Module._iconv = (e, t2, r, a2, o2) => (Module._iconv = wasmExports.iconv)(e, t2, r, a2, o2);
    Module._pthread_mutex_init = (e, t2) => (Module._pthread_mutex_init = wasmExports.pthread_mutex_init)(e, t2);
    Module._pthread_mutex_destroy = (e) => (Module._pthread_mutex_destroy = wasmExports.pthread_mutex_destroy)(e);
    Module._pthread_cond_init = (e, t2) => (Module._pthread_cond_init = wasmExports.pthread_cond_init)(e, t2);
    Module._pthread_cond_destroy = (e) => (Module._pthread_cond_destroy = wasmExports.pthread_cond_destroy)(e);
    Module._pthread_self = () => (Module._pthread_self = wasmExports.pthread_self)();
    Module._pthread_cond_wait = (e, t2) => (Module._pthread_cond_wait = wasmExports.pthread_cond_wait)(e, t2);
    Module._pthread_cond_signal = (e) => (Module._pthread_cond_signal = wasmExports.pthread_cond_signal)(e);
    Module._pthread_once = (e, t2) => (Module._pthread_once = wasmExports.pthread_once)(e, t2);
    Module.___cxa_atexit = (e, t2, r) => (Module.___cxa_atexit = wasmExports.__cxa_atexit)(e, t2, r);
    Module._fputs = (e, t2) => (Module._fputs = wasmExports.fputs)(e, t2);
    Module._vsnprintf = (e, t2, r, a2) => (Module._vsnprintf = wasmExports.vsnprintf)(e, t2, r, a2);
    Module.___small_fprintf = (e, t2, r) => (Module.___small_fprintf = wasmExports.__small_fprintf)(e, t2, r);
    Module.___dynamic_cast = (e, t2, r, a2) => (Module.___dynamic_cast = wasmExports.__dynamic_cast)(e, t2, r, a2);
    Module.___cxa_pure_virtual = () => (Module.___cxa_pure_virtual = wasmExports.__cxa_pure_virtual)();
    Module._modf = (e, t2) => (Module._modf = wasmExports.modf)(e, t2);
    Module._localtime_r = (e, t2) => (Module._localtime_r = wasmExports.localtime_r)(e, t2);
    Module._strncat = (e, t2, r) => (Module._strncat = wasmExports.strncat)(e, t2, r);
    Module._munmap = (e, t2) => (Module._munmap = wasmExports.munmap)(e, t2);
    Module.__ZdlPvm = (e, t2) => (Module.__ZdlPvm = wasmExports._ZdlPvm)(e, t2);
    Module.___ctype_get_mb_cur_max = () => (Module.___ctype_get_mb_cur_max = wasmExports.__ctype_get_mb_cur_max)();
    Module.___ctype_tolower_loc = () => (Module.___ctype_tolower_loc = wasmExports.__ctype_tolower_loc)();
    Module.___ctype_toupper_loc = () => (Module.___ctype_toupper_loc = wasmExports.__ctype_toupper_loc)();
    Module._fdopen = (e, t2) => (Module._fdopen = wasmExports.fdopen)(e, t2);
    Module._sqrt = (e) => (Module._sqrt = wasmExports.sqrt)(e);
    Module._acosl = (e, t2, r) => (Module._acosl = wasmExports.acosl)(e, t2, r);
    Module._aligned_alloc = (e, t2) => (Module._aligned_alloc = wasmExports.aligned_alloc)(e, t2);
    Module._atan2l = (e, t2, r, a2, o2) => (Module._atan2l = wasmExports.atan2l)(e, t2, r, a2, o2);
    var ___funcs_on_exit = () => (___funcs_on_exit = wasmExports.__funcs_on_exit)();
    Module._atexit = (e) => (Module._atexit = wasmExports.atexit)(e);
    Module.___cxa_finalize = (e) => (Module.___cxa_finalize = wasmExports.__cxa_finalize)(e);
    Module._btowc = (e) => (Module._btowc = wasmExports.btowc)(e);
    Module._clock = () => (Module._clock = wasmExports.clock)();
    Module._scalbn = (e, t2) => (Module._scalbn = wasmExports.scalbn)(e, t2);
    Module._cosl = (e, t2, r) => (Module._cosl = wasmExports.cosl)(e, t2, r);
    Module._dladdr = (e, t2) => (Module._dladdr = wasmExports.dladdr)(e, t2);
    var ___dl_seterr = (e, t2) => (___dl_seterr = wasmExports.__dl_seterr)(e, t2);
    Module._duplocale = (e) => (Module._duplocale = wasmExports.duplocale)(e);
    Module._fchmod = (e, t2) => (Module._fchmod = wasmExports.fchmod)(e, t2);
    Module._fchmodat = (e, t2, r, a2) => (Module._fchmodat = wasmExports.fchmodat)(e, t2, r, a2);
    Module._fchown = (e, t2, r) => (Module._fchown = wasmExports.fchown)(e, t2, r);
    Module._fcntl = (e, t2, r) => (Module._fcntl = wasmExports.fcntl)(e, t2, r);
    Module._fdopendir = (e) => (Module._fdopendir = wasmExports.fdopendir)(e);
    Module._fmax = (e, t2) => (Module._fmax = wasmExports.fmax)(e, t2);
    Module._fmin = (e, t2) => (Module._fmin = wasmExports.fmin)(e, t2);
    Module._fputwc = (e, t2) => (Module._fputwc = wasmExports.fputwc)(e, t2);
    Module._frexp = (e, t2) => (Module._frexp = wasmExports.frexp)(e, t2);
    Module._ftell = (e) => (Module._ftell = wasmExports.ftell)(e);
    Module._getentropy = (e, t2) => (Module._getentropy = wasmExports.getentropy)(e, t2);
    Module._geteuid = () => (Module._geteuid = wasmExports.geteuid)();
    Module._getgid = () => (Module._getgid = wasmExports.getgid)();
    Module._mbtowc = (e, t2, r) => (Module._mbtowc = wasmExports.mbtowc)(e, t2, r);
    Module._getuid = () => (Module._getuid = wasmExports.getuid)();
    Module._getwc = (e) => (Module._getwc = wasmExports.getwc)(e);
    Module._gmtime = (e) => (Module._gmtime = wasmExports.gmtime)(e);
    Module._hypot = (e, t2) => (Module._hypot = wasmExports.hypot)(e, t2);
    Module._mbrtowc = (e, t2, r, a2) => (Module._mbrtowc = wasmExports.mbrtowc)(e, t2, r, a2);
    Module._ioctl = (e, t2, r) => (Module._ioctl = wasmExports.ioctl)(e, t2, r);
    Module._isalpha = (e) => (Module._isalpha = wasmExports.isalpha)(e);
    Module._isgraph = (e) => (Module._isgraph = wasmExports.isgraph)(e);
    Module._isspace = (e) => (Module._isspace = wasmExports.isspace)(e);
    Module._iswblank_l = (e, t2) => (Module._iswblank_l = wasmExports.iswblank_l)(e, t2);
    Module._iswcntrl_l = (e, t2) => (Module._iswcntrl_l = wasmExports.iswcntrl_l)(e, t2);
    Module._iswxdigit_l = (e, t2) => (Module._iswxdigit_l = wasmExports.iswxdigit_l)(e, t2);
    Module._isxdigit_l = (e, t2) => (Module._isxdigit_l = wasmExports.isxdigit_l)(e, t2);
    Module._pthread_cond_broadcast = (e) => (Module._pthread_cond_broadcast = wasmExports.pthread_cond_broadcast)(e);
    Module._pthread_atfork = (e, t2, r) => (Module._pthread_atfork = wasmExports.pthread_atfork)(e, t2, r);
    Module._pthread_mutexattr_init = (e) => (Module._pthread_mutexattr_init = wasmExports.pthread_mutexattr_init)(e);
    Module._pthread_mutexattr_setprotocol = (e, t2) => (Module._pthread_mutexattr_setprotocol = wasmExports.pthread_mutexattr_setprotocol)(e, t2);
    Module._pthread_mutexattr_settype = (e, t2) => (Module._pthread_mutexattr_settype = wasmExports.pthread_mutexattr_settype)(e, t2);
    Module._pthread_mutexattr_destroy = (e) => (Module._pthread_mutexattr_destroy = wasmExports.pthread_mutexattr_destroy)(e);
    Module._pthread_mutexattr_setpshared = (e, t2) => (Module._pthread_mutexattr_setpshared = wasmExports.pthread_mutexattr_setpshared)(e, t2);
    Module._pthread_mutex_trylock = (e) => (Module._pthread_mutex_trylock = wasmExports.pthread_mutex_trylock)(e);
    Module._pthread_create = (e, t2, r, a2) => (Module._pthread_create = wasmExports.pthread_create)(e, t2, r, a2);
    Module._pthread_join = (e, t2) => (Module._pthread_join = wasmExports.pthread_join)(e, t2);
    Module._pthread_cond_timedwait = (e, t2, r) => (Module._pthread_cond_timedwait = wasmExports.pthread_cond_timedwait)(e, t2, r);
    Module._pthread_detach = (e) => (Module._pthread_detach = wasmExports.pthread_detach)(e);
    Module._link = (e, t2) => (Module._link = wasmExports.link)(e, t2);
    Module._llround = (e) => (Module._llround = wasmExports.llround)(e);
    Module._localtime = (e) => (Module._localtime = wasmExports.localtime)(e);
    Module._log2 = (e) => (Module._log2 = wasmExports.log2)(e);
    Module._logb = (e) => (Module._logb = wasmExports.logb)(e);
    Module._lround = (e) => (Module._lround = wasmExports.lround)(e);
    Module._mbrlen = (e, t2, r) => (Module._mbrlen = wasmExports.mbrlen)(e, t2, r);
    Module._mbsnrtowcs = (e, t2, r, a2, o2) => (Module._mbsnrtowcs = wasmExports.mbsnrtowcs)(e, t2, r, a2, o2);
    Module._mbsrtowcs = (e, t2, r, a2) => (Module._mbsrtowcs = wasmExports.mbsrtowcs)(e, t2, r, a2);
    Module._memrchr = (e, t2, r) => (Module._memrchr = wasmExports.memrchr)(e, t2, r);
    var _emscripten_builtin_memalign = (e, t2) => (_emscripten_builtin_memalign = wasmExports.emscripten_builtin_memalign)(e, t2);
    Module._nextafter = (e, t2) => (Module._nextafter = wasmExports.nextafter)(e, t2);
    Module._nextafterf = (e, t2) => (Module._nextafterf = wasmExports.nextafterf)(e, t2);
    var _ntohs = (e) => (_ntohs = wasmExports.ntohs)(e);
    Module._openat = (e, t2, r, a2) => (Module._openat = wasmExports.openat)(e, t2, r, a2);
    Module._pathconf = (e, t2) => (Module._pathconf = wasmExports.pathconf)(e, t2);
    Module._perror = (e) => (Module._perror = wasmExports.perror)(e);
    Module._iprintf = (e, t2) => (Module._iprintf = wasmExports.iprintf)(e, t2);
    Module.___small_printf = (e, t2) => (Module.___small_printf = wasmExports.__small_printf)(e, t2);
    Module._pthread_mutexattr_getprotocol = (e, t2) => (Module._pthread_mutexattr_getprotocol = wasmExports.pthread_mutexattr_getprotocol)(e, t2);
    Module._pthread_mutexattr_getpshared = (e, t2) => (Module._pthread_mutexattr_getpshared = wasmExports.pthread_mutexattr_getpshared)(e, t2);
    Module._pthread_mutexattr_getrobust = (e, t2) => (Module._pthread_mutexattr_getrobust = wasmExports.pthread_mutexattr_getrobust)(e, t2);
    Module._pthread_mutexattr_gettype = (e, t2) => (Module._pthread_mutexattr_gettype = wasmExports.pthread_mutexattr_gettype)(e, t2);
    Module._putchar = (e) => (Module._putchar = wasmExports.putchar)(e);
    Module._qsort = (e, t2, r, a2) => (Module._qsort = wasmExports.qsort)(e, t2, r, a2);
    Module._srand = (e) => (Module._srand = wasmExports.srand)(e);
    Module._rand = () => (Module._rand = wasmExports.rand)();
    Module._remainder = (e, t2) => (Module._remainder = wasmExports.remainder)(e, t2);
    Module._remove = (e) => (Module._remove = wasmExports.remove)(e);
    Module._remquo = (e, t2, r) => (Module._remquo = wasmExports.remquo)(e, t2, r);
    Module._round = (e) => (Module._round = wasmExports.round)(e);
    Module._roundf = (e) => (Module._roundf = wasmExports.roundf)(e);
    var __emscripten_timeout = (e, t2) => (__emscripten_timeout = wasmExports._emscripten_timeout)(e, t2);
    Module._sinl = (e, t2, r) => (Module._sinl = wasmExports.sinl)(e, t2, r);
    Module._siprintf = (e, t2, r) => (Module._siprintf = wasmExports.siprintf)(e, t2, r);
    Module._sqrtl = (e, t2, r) => (Module._sqrtl = wasmExports.sqrtl)(e, t2, r);
    Module._vsscanf = (e, t2, r) => (Module._vsscanf = wasmExports.vsscanf)(e, t2, r);
    Module._statvfs = (e, t2) => (Module._statvfs = wasmExports.statvfs)(e, t2);
    Module._strcasecmp = (e, t2) => (Module._strcasecmp = wasmExports.strcasecmp)(e, t2);
    Module._strerror_r = (e, t2, r) => (Module._strerror_r = wasmExports.strerror_r)(e, t2, r);
    Module._strftime = (e, t2, r, a2) => (Module._strftime = wasmExports.strftime)(e, t2, r, a2);
    Module._strncasecmp = (e, t2, r) => (Module._strncasecmp = wasmExports.strncasecmp)(e, t2, r);
    Module.___multf3 = (e, t2, r, a2, o2) => (Module.___multf3 = wasmExports.__multf3)(e, t2, r, a2, o2);
    Module.___addtf3 = (e, t2, r, a2, o2) => (Module.___addtf3 = wasmExports.__addtf3)(e, t2, r, a2, o2);
    Module.___extenddftf2 = (e, t2) => (Module.___extenddftf2 = wasmExports.__extenddftf2)(e, t2);
    Module.___subtf3 = (e, t2, r, a2, o2) => (Module.___subtf3 = wasmExports.__subtf3)(e, t2, r, a2, o2);
    Module.___divtf3 = (e, t2, r, a2, o2) => (Module.___divtf3 = wasmExports.__divtf3)(e, t2, r, a2, o2);
    Module.___eqtf2 = (e, t2, r, a2) => (Module.___eqtf2 = wasmExports.__eqtf2)(e, t2, r, a2);
    Module.___trunctfdf2 = (e, t2) => (Module.___trunctfdf2 = wasmExports.__trunctfdf2)(e, t2);
    Module._strtold = (e, t2, r) => (Module._strtold = wasmExports.strtold)(e, t2, r);
    Module._strtof_l = (e, t2, r) => (Module._strtof_l = wasmExports.strtof_l)(e, t2, r);
    Module._strtod_l = (e, t2, r) => (Module._strtod_l = wasmExports.strtod_l)(e, t2, r);
    Module._strtold_l = (e, t2, r, a2) => (Module._strtold_l = wasmExports.strtold_l)(e, t2, r, a2);
    Module._strtok = (e, t2) => (Module._strtok = wasmExports.strtok)(e, t2);
    Module._strtoull_l = (e, t2, r, a2) => (Module._strtoull_l = wasmExports.strtoull_l)(e, t2, r, a2);
    Module._strtoll_l = (e, t2, r, a2) => (Module._strtoll_l = wasmExports.strtoll_l)(e, t2, r, a2);
    Module._swprintf = (e, t2, r, a2) => (Module._swprintf = wasmExports.swprintf)(e, t2, r, a2);
    Module._trunc = (e) => (Module._trunc = wasmExports.trunc)(e);
    Module._ungetc = (e, t2) => (Module._ungetc = wasmExports.ungetc)(e, t2);
    Module._ungetwc = (e, t2) => (Module._ungetwc = wasmExports.ungetwc)(e, t2);
    Module._unlinkat = (e, t2, r) => (Module._unlinkat = wasmExports.unlinkat)(e, t2, r);
    Module._usleep = (e) => (Module._usleep = wasmExports.usleep)(e);
    Module._utimensat = (e, t2, r, a2) => (Module._utimensat = wasmExports.utimensat)(e, t2, r, a2);
    Module._vasprintf = (e, t2, r) => (Module._vasprintf = wasmExports.vasprintf)(e, t2, r);
    Module._wcrtomb = (e, t2, r) => (Module._wcrtomb = wasmExports.wcrtomb)(e, t2, r);
    Module._wcslen = (e) => (Module._wcslen = wasmExports.wcslen)(e);
    Module._wcscoll_l = (e, t2, r) => (Module._wcscoll_l = wasmExports.wcscoll_l)(e, t2, r);
    Module._wcsnrtombs = (e, t2, r, a2, o2) => (Module._wcsnrtombs = wasmExports.wcsnrtombs)(e, t2, r, a2, o2);
    Module._wcstof = (e, t2) => (Module._wcstof = wasmExports.wcstof)(e, t2);
    Module._wcstod = (e, t2) => (Module._wcstod = wasmExports.wcstod)(e, t2);
    Module._wcstold = (e, t2, r) => (Module._wcstold = wasmExports.wcstold)(e, t2, r);
    Module._wcstoull = (e, t2, r) => (Module._wcstoull = wasmExports.wcstoull)(e, t2, r);
    Module._wcstoll = (e, t2, r) => (Module._wcstoll = wasmExports.wcstoll)(e, t2, r);
    Module._wcstoul = (e, t2, r) => (Module._wcstoul = wasmExports.wcstoul)(e, t2, r);
    Module._wcstol = (e, t2, r) => (Module._wcstol = wasmExports.wcstol)(e, t2, r);
    Module._wcsxfrm_l = (e, t2, r, a2) => (Module._wcsxfrm_l = wasmExports.wcsxfrm_l)(e, t2, r, a2);
    Module._wctob = (e) => (Module._wctob = wasmExports.wctob)(e);
    Module._wmemchr = (e, t2, r) => (Module._wmemchr = wasmExports.wmemchr)(e, t2, r);
    Module._wmemcmp = (e, t2, r) => (Module._wmemcmp = wasmExports.wmemcmp)(e, t2, r);
    Module.___lttf2 = (e, t2, r, a2) => (Module.___lttf2 = wasmExports.__lttf2)(e, t2, r, a2);
    var _setThrew = (e, t2) => (_setThrew = wasmExports.setThrew)(e, t2), __emscripten_tempret_set = (e) => (__emscripten_tempret_set = wasmExports._emscripten_tempret_set)(e), __emscripten_tempret_get = () => (__emscripten_tempret_get = wasmExports._emscripten_tempret_get)(), __emscripten_stack_restore = (e) => (__emscripten_stack_restore = wasmExports._emscripten_stack_restore)(e), __emscripten_stack_alloc = (e) => (__emscripten_stack_alloc = wasmExports._emscripten_stack_alloc)(e), _emscripten_stack_get_current = () => (_emscripten_stack_get_current = wasmExports.emscripten_stack_get_current)();
    Module.__Znwm = (e) => (Module.__Znwm = wasmExports._Znwm)(e);
    Module.__ZNSt3__210__stdinbufIcEC2EP8_IO_FILEP11__mbstate_t = (e, t2, r) => (Module.__ZNSt3__210__stdinbufIcEC2EP8_IO_FILEP11__mbstate_t = wasmExports._ZNSt3__210__stdinbufIcEC2EP8_IO_FILEP11__mbstate_t)(e, t2, r);
    Module.__ZNSt3__211__stdoutbufIcEC2EP8_IO_FILEP11__mbstate_t = (e, t2, r) => (Module.__ZNSt3__211__stdoutbufIcEC2EP8_IO_FILEP11__mbstate_t = wasmExports._ZNSt3__211__stdoutbufIcEC2EP8_IO_FILEP11__mbstate_t)(e, t2, r);
    Module.__ZNSt3__210__stdinbufIwEC2EP8_IO_FILEP11__mbstate_t = (e, t2, r) => (Module.__ZNSt3__210__stdinbufIwEC2EP8_IO_FILEP11__mbstate_t = wasmExports._ZNSt3__210__stdinbufIwEC2EP8_IO_FILEP11__mbstate_t)(e, t2, r);
    Module.__ZNSt3__211__stdoutbufIwEC2EP8_IO_FILEP11__mbstate_t = (e, t2, r) => (Module.__ZNSt3__211__stdoutbufIwEC2EP8_IO_FILEP11__mbstate_t = wasmExports._ZNSt3__211__stdoutbufIwEC2EP8_IO_FILEP11__mbstate_t)(e, t2, r);
    Module.__ZSt15get_new_handlerv = () => (Module.__ZSt15get_new_handlerv = wasmExports._ZSt15get_new_handlerv)();
    Module.__ZdlPv = (e) => (Module.__ZdlPv = wasmExports._ZdlPv)(e);
    Module.__ZNSt13runtime_errorD2Ev = (e) => (Module.__ZNSt13runtime_errorD2Ev = wasmExports._ZNSt13runtime_errorD2Ev)(e);
    Module.__ZNKSt13runtime_error4whatEv = (e) => (Module.__ZNKSt13runtime_error4whatEv = wasmExports._ZNKSt13runtime_error4whatEv)(e);
    Module.__ZSt9terminatev = () => (Module.__ZSt9terminatev = wasmExports._ZSt9terminatev)();
    Module.__ZNSt11logic_errorD2Ev = (e) => (Module.__ZNSt11logic_errorD2Ev = wasmExports._ZNSt11logic_errorD2Ev)(e);
    var ___cxa_decrement_exception_refcount = Module.___cxa_decrement_exception_refcount = (e) => (___cxa_decrement_exception_refcount = Module.___cxa_decrement_exception_refcount = wasmExports.__cxa_decrement_exception_refcount)(e), ___cxa_increment_exception_refcount = Module.___cxa_increment_exception_refcount = (e) => (___cxa_increment_exception_refcount = Module.___cxa_increment_exception_refcount = wasmExports.__cxa_increment_exception_refcount)(e);
    Module.__ZNSt9exceptionD2Ev = (e) => (Module.__ZNSt9exceptionD2Ev = wasmExports._ZNSt9exceptionD2Ev)(e);
    Module.__ZNKSt11logic_error4whatEv = (e) => (Module.__ZNKSt11logic_error4whatEv = wasmExports._ZNKSt11logic_error4whatEv)(e);
    Module.___cxa_bad_cast = () => (Module.___cxa_bad_cast = wasmExports.__cxa_bad_cast)();
    Module.___cxa_bad_typeid = () => (Module.___cxa_bad_typeid = wasmExports.__cxa_bad_typeid)();
    Module.___cxa_allocate_exception = (e) => (Module.___cxa_allocate_exception = wasmExports.__cxa_allocate_exception)(e);
    Module.___cxa_free_exception = (e) => (Module.___cxa_free_exception = wasmExports.__cxa_free_exception)(e);
    Module.___cxa_init_primary_exception = (e, t2, r) => (Module.___cxa_init_primary_exception = wasmExports.__cxa_init_primary_exception)(e, t2, r);
    Module.__ZNSt9type_infoD2Ev = (e) => (Module.__ZNSt9type_infoD2Ev = wasmExports._ZNSt9type_infoD2Ev)(e);
    var ___cxa_can_catch = (e, t2, r) => (___cxa_can_catch = wasmExports.__cxa_can_catch)(e, t2, r), ___cxa_get_exception_ptr = Module.___cxa_get_exception_ptr = (e) => (___cxa_get_exception_ptr = Module.___cxa_get_exception_ptr = wasmExports.__cxa_get_exception_ptr)(e);
    Module.__ZNSt9exceptionD0Ev = (e) => (Module.__ZNSt9exceptionD0Ev = wasmExports._ZNSt9exceptionD0Ev)(e);
    Module.__ZNSt9exceptionD1Ev = (e) => (Module.__ZNSt9exceptionD1Ev = wasmExports._ZNSt9exceptionD1Ev)(e);
    Module.__ZNKSt9exception4whatEv = (e) => (Module.__ZNKSt9exception4whatEv = wasmExports._ZNKSt9exception4whatEv)(e);
    Module.__ZNSt13bad_exceptionD0Ev = (e) => (Module.__ZNSt13bad_exceptionD0Ev = wasmExports._ZNSt13bad_exceptionD0Ev)(e);
    Module.__ZNSt13bad_exceptionD1Ev = (e) => (Module.__ZNSt13bad_exceptionD1Ev = wasmExports._ZNSt13bad_exceptionD1Ev)(e);
    Module.__ZNKSt13bad_exception4whatEv = (e) => (Module.__ZNKSt13bad_exception4whatEv = wasmExports._ZNKSt13bad_exception4whatEv)(e);
    Module.__ZNSt9bad_allocC2Ev = (e) => (Module.__ZNSt9bad_allocC2Ev = wasmExports._ZNSt9bad_allocC2Ev)(e);
    Module.__ZNSt9bad_allocD0Ev = (e) => (Module.__ZNSt9bad_allocD0Ev = wasmExports._ZNSt9bad_allocD0Ev)(e);
    Module.__ZNSt9bad_allocD1Ev = (e) => (Module.__ZNSt9bad_allocD1Ev = wasmExports._ZNSt9bad_allocD1Ev)(e);
    Module.__ZNKSt9bad_alloc4whatEv = (e) => (Module.__ZNKSt9bad_alloc4whatEv = wasmExports._ZNKSt9bad_alloc4whatEv)(e);
    Module.__ZNSt20bad_array_new_lengthC2Ev = (e) => (Module.__ZNSt20bad_array_new_lengthC2Ev = wasmExports._ZNSt20bad_array_new_lengthC2Ev)(e);
    Module.__ZNSt20bad_array_new_lengthD0Ev = (e) => (Module.__ZNSt20bad_array_new_lengthD0Ev = wasmExports._ZNSt20bad_array_new_lengthD0Ev)(e);
    Module.__ZNSt20bad_array_new_lengthD1Ev = (e) => (Module.__ZNSt20bad_array_new_lengthD1Ev = wasmExports._ZNSt20bad_array_new_lengthD1Ev)(e);
    Module.__ZNKSt20bad_array_new_length4whatEv = (e) => (Module.__ZNKSt20bad_array_new_length4whatEv = wasmExports._ZNKSt20bad_array_new_length4whatEv)(e);
    Module.__ZNSt13bad_exceptionD2Ev = (e) => (Module.__ZNSt13bad_exceptionD2Ev = wasmExports._ZNSt13bad_exceptionD2Ev)(e);
    Module.__ZNSt9bad_allocC1Ev = (e) => (Module.__ZNSt9bad_allocC1Ev = wasmExports._ZNSt9bad_allocC1Ev)(e);
    Module.__ZNSt9bad_allocD2Ev = (e) => (Module.__ZNSt9bad_allocD2Ev = wasmExports._ZNSt9bad_allocD2Ev)(e);
    Module.__ZNSt20bad_array_new_lengthC1Ev = (e) => (Module.__ZNSt20bad_array_new_lengthC1Ev = wasmExports._ZNSt20bad_array_new_lengthC1Ev)(e);
    Module.__ZNSt20bad_array_new_lengthD2Ev = (e) => (Module.__ZNSt20bad_array_new_lengthD2Ev = wasmExports._ZNSt20bad_array_new_lengthD2Ev)(e);
    Module.__ZNSt11logic_errorD0Ev = (e) => (Module.__ZNSt11logic_errorD0Ev = wasmExports._ZNSt11logic_errorD0Ev)(e);
    Module.__ZNSt11logic_errorD1Ev = (e) => (Module.__ZNSt11logic_errorD1Ev = wasmExports._ZNSt11logic_errorD1Ev)(e);
    Module.__ZNSt13runtime_errorD0Ev = (e) => (Module.__ZNSt13runtime_errorD0Ev = wasmExports._ZNSt13runtime_errorD0Ev)(e);
    Module.__ZNSt13runtime_errorD1Ev = (e) => (Module.__ZNSt13runtime_errorD1Ev = wasmExports._ZNSt13runtime_errorD1Ev)(e);
    Module.__ZNSt12domain_errorD0Ev = (e) => (Module.__ZNSt12domain_errorD0Ev = wasmExports._ZNSt12domain_errorD0Ev)(e);
    Module.__ZNSt12domain_errorD1Ev = (e) => (Module.__ZNSt12domain_errorD1Ev = wasmExports._ZNSt12domain_errorD1Ev)(e);
    Module.__ZNSt16invalid_argumentD0Ev = (e) => (Module.__ZNSt16invalid_argumentD0Ev = wasmExports._ZNSt16invalid_argumentD0Ev)(e);
    Module.__ZNSt16invalid_argumentD1Ev = (e) => (Module.__ZNSt16invalid_argumentD1Ev = wasmExports._ZNSt16invalid_argumentD1Ev)(e);
    Module.__ZNSt12length_errorD0Ev = (e) => (Module.__ZNSt12length_errorD0Ev = wasmExports._ZNSt12length_errorD0Ev)(e);
    Module.__ZNSt12length_errorD1Ev = (e) => (Module.__ZNSt12length_errorD1Ev = wasmExports._ZNSt12length_errorD1Ev)(e);
    Module.__ZNSt12out_of_rangeD0Ev = (e) => (Module.__ZNSt12out_of_rangeD0Ev = wasmExports._ZNSt12out_of_rangeD0Ev)(e);
    Module.__ZNSt12out_of_rangeD1Ev = (e) => (Module.__ZNSt12out_of_rangeD1Ev = wasmExports._ZNSt12out_of_rangeD1Ev)(e);
    Module.__ZNSt11range_errorD0Ev = (e) => (Module.__ZNSt11range_errorD0Ev = wasmExports._ZNSt11range_errorD0Ev)(e);
    Module.__ZNSt11range_errorD1Ev = (e) => (Module.__ZNSt11range_errorD1Ev = wasmExports._ZNSt11range_errorD1Ev)(e);
    Module.__ZNSt14overflow_errorD0Ev = (e) => (Module.__ZNSt14overflow_errorD0Ev = wasmExports._ZNSt14overflow_errorD0Ev)(e);
    Module.__ZNSt14overflow_errorD1Ev = (e) => (Module.__ZNSt14overflow_errorD1Ev = wasmExports._ZNSt14overflow_errorD1Ev)(e);
    Module.__ZNSt15underflow_errorD0Ev = (e) => (Module.__ZNSt15underflow_errorD0Ev = wasmExports._ZNSt15underflow_errorD0Ev)(e);
    Module.__ZNSt15underflow_errorD1Ev = (e) => (Module.__ZNSt15underflow_errorD1Ev = wasmExports._ZNSt15underflow_errorD1Ev)(e);
    Module.__ZNSt12domain_errorD2Ev = (e) => (Module.__ZNSt12domain_errorD2Ev = wasmExports._ZNSt12domain_errorD2Ev)(e);
    Module.__ZNSt16invalid_argumentD2Ev = (e) => (Module.__ZNSt16invalid_argumentD2Ev = wasmExports._ZNSt16invalid_argumentD2Ev)(e);
    Module.__ZNSt12length_errorD2Ev = (e) => (Module.__ZNSt12length_errorD2Ev = wasmExports._ZNSt12length_errorD2Ev)(e);
    Module.__ZNSt12out_of_rangeD2Ev = (e) => (Module.__ZNSt12out_of_rangeD2Ev = wasmExports._ZNSt12out_of_rangeD2Ev)(e);
    Module.__ZNSt11range_errorD2Ev = (e) => (Module.__ZNSt11range_errorD2Ev = wasmExports._ZNSt11range_errorD2Ev)(e);
    Module.__ZNSt14overflow_errorD2Ev = (e) => (Module.__ZNSt14overflow_errorD2Ev = wasmExports._ZNSt14overflow_errorD2Ev)(e);
    Module.__ZNSt15underflow_errorD2Ev = (e) => (Module.__ZNSt15underflow_errorD2Ev = wasmExports._ZNSt15underflow_errorD2Ev)(e);
    Module.__ZNSt9type_infoD0Ev = (e) => (Module.__ZNSt9type_infoD0Ev = wasmExports._ZNSt9type_infoD0Ev)(e);
    Module.__ZNSt9type_infoD1Ev = (e) => (Module.__ZNSt9type_infoD1Ev = wasmExports._ZNSt9type_infoD1Ev)(e);
    Module.__ZNSt8bad_castC2Ev = (e) => (Module.__ZNSt8bad_castC2Ev = wasmExports._ZNSt8bad_castC2Ev)(e);
    Module.__ZNSt8bad_castD2Ev = (e) => (Module.__ZNSt8bad_castD2Ev = wasmExports._ZNSt8bad_castD2Ev)(e);
    Module.__ZNSt8bad_castD0Ev = (e) => (Module.__ZNSt8bad_castD0Ev = wasmExports._ZNSt8bad_castD0Ev)(e);
    Module.__ZNSt8bad_castD1Ev = (e) => (Module.__ZNSt8bad_castD1Ev = wasmExports._ZNSt8bad_castD1Ev)(e);
    Module.__ZNKSt8bad_cast4whatEv = (e) => (Module.__ZNKSt8bad_cast4whatEv = wasmExports._ZNKSt8bad_cast4whatEv)(e);
    Module.__ZNSt10bad_typeidC2Ev = (e) => (Module.__ZNSt10bad_typeidC2Ev = wasmExports._ZNSt10bad_typeidC2Ev)(e);
    Module.__ZNSt10bad_typeidD2Ev = (e) => (Module.__ZNSt10bad_typeidD2Ev = wasmExports._ZNSt10bad_typeidD2Ev)(e);
    Module.__ZNSt10bad_typeidD0Ev = (e) => (Module.__ZNSt10bad_typeidD0Ev = wasmExports._ZNSt10bad_typeidD0Ev)(e);
    Module.__ZNSt10bad_typeidD1Ev = (e) => (Module.__ZNSt10bad_typeidD1Ev = wasmExports._ZNSt10bad_typeidD1Ev)(e);
    Module.__ZNKSt10bad_typeid4whatEv = (e) => (Module.__ZNKSt10bad_typeid4whatEv = wasmExports._ZNKSt10bad_typeid4whatEv)(e);
    Module.__ZNSt8bad_castC1Ev = (e) => (Module.__ZNSt8bad_castC1Ev = wasmExports._ZNSt8bad_castC1Ev)(e);
    Module.__ZNSt10bad_typeidC1Ev = (e) => (Module.__ZNSt10bad_typeidC1Ev = wasmExports._ZNSt10bad_typeidC1Ev)(e);
    Module._LocalBufferBlockPointers = 2796604;
    Module._BufferBlocks = 2791308;
    Module._wal_level = 2582944;
    Module._CurrentMemoryContext = 2880704;
    Module._SnapshotAnyData = 2674208;
    Module._debug_query_string = 2804316;
    Module._maintenance_work_mem = 2618976;
    Module._CritSectionCount = 2875364;
    Module._InterruptPending = 2875312;
    Module._ParallelWorkerNumber = 2574456;
    Module._pg_number_of_ones = 2034800;
    Module._TopMemoryContext = 2880708;
    Module._IsUnderPostmaster = 2875397;
    Module._MainLWLockArray = 2802324;
    Module._CurrentResourceOwner = 2880756;
    Module._work_mem = 2618964;
    Module._pg_global_prng_state = 2964208;
    Module._NBuffers = 2618984;
    Module._XactIsoLevel = 2582808;
    Module._bsysscan = 2775716;
    Module._CheckXidAlive = 2775712;
    Module._MyProc = 2804140;
    Module._MyDatabaseId = 2875376;
    Module._TTSOpsBufferHeapTuple = 2586992;
    Module._RecentXmin = 2674356;
    Module._TTSOpsHeapTuple = 2586888;
    Module._pgWalUsage = 2779064;
    Module._pgBufferUsage = 2778936;
    Module._error_context_stack = 2873608;
    Module._MyLatch = 2875524;
    Module.___THREW__ = 2981972;
    Module.___threwValue = 2981976;
    Module._PG_exception_stack = 2873612;
    Module._TTSOpsVirtual = 2586836;
    Module._GUC_check_errdetail_string = 2879292;
    Module._TransamVariables = 2775704;
    Module._TopTransactionContext = 2880728;
    Module._MyProcPid = 2875448;
    Module._RmgrTable = 2574528;
    Module._process_shared_preload_libraries_in_progress = 2878688;
    Module._wal_segment_size = 2582964;
    Module._TopTransactionResourceOwner = 2880764;
    Module._arch_module_check_errdetail_string = 2788776;
    Module._stdout = 2770224;
    Module._stdin = 2770072;
    Module._object_access_hook = 2777456;
    Module._InvalidObjectAddress = 736776;
    Module._check_function_bodies = 2619166;
    Module._post_parse_analyze_hook = 2777496;
    Module._ScanKeywordTokens = 1286080;
    Module._ScanKeywords = 2726024;
    Module._None_Receiver = 2592780;
    Module._explain_per_plan_hook = 2777640;
    Module._explain_per_node_hook = 2777644;
    Module._CacheMemoryContext = 2880720;
    Module._SPI_processed = 2779256;
    Module._SPI_tuptable = 2779264;
    Module._TTSOpsMinimalTuple = 2586940;
    Module._check_password_hook = 2777804;
    Module._ConfigReloadPending = 2788748;
    Module._max_parallel_maintenance_workers = 2618980;
    Module._DateStyle = 2618952;
    Module._ExecutorStart_hook = 2778912;
    Module._ExecutorRun_hook = 2778916;
    Module._ExecutorFinish_hook = 2778920;
    Module._ExecutorEnd_hook = 2778924;
    Module._SPI_result = 2779268;
    Module._stderr = 2769920;
    Module._MyProcPort = 2875476;
    Module._ClientAuthentication_hook = 2779472;
    Module._set_rel_pathlist_hook = 2788336;
    Module._cpu_tuple_cost = 2587464;
    Module._cpu_operator_cost = 2587480;
    Module._seq_page_cost = 2587448;
    Module._planner_hook = 2788380;
    Module._QueryCancelPending = 2875316;
    Module._ShutdownRequestPending = 2788752;
    Module._MyStartTime = 2875456;
    Module._cluster_name = 2619216;
    Module._ProcDiePending = 2875320;
    Module._application_name = 2879500;
    Module._row_security_policy_hook_restrictive = 2791276;
    Module._row_security_policy_hook_permissive = 2791272;
    Module._BufferDescriptors = 2791304;
    Module._shmem_startup_hook = 2797300;
    Module._ProcessUtility_hook = 2804520;
    Module._IntervalStyle = 2875400;
    Module._extra_float_digits = 2609272;
    Module._pg_crc32_table = 1698672;
    Module._shmem_request_hook = 2878692;
    Module.__ZTVN10__cxxabiv120__si_class_type_infoE = 2770852;
    Module.__ZTVN10__cxxabiv117__class_type_infoE = 2770812;
    Module.__ZTVN10__cxxabiv121__vmi_class_type_infoE = 2770904;
    Module.__ZTVSt11logic_error = 2771164;
    Module.__ZTVSt9exception = 2771080;
    Module.__ZTVSt13runtime_error = 2771184;
    Module.__ZTISt13runtime_error = 2771376;
    Module.__ZTISt9exception = 2771100;
    Module.__ZTISt11logic_error = 2771236;
    Module.__ZTISt9type_info = 2771508;
    Module.__ZTVN10__cxxabiv116__shim_type_infoE = 2770500;
    Module.__ZTVN10__cxxabiv123__fundamental_type_infoE = 2770528;
    Module.__ZTVN10__cxxabiv119__pointer_type_infoE = 2770984;
    Module.__ZTIb = 2770584;
    Module.__ZTIPKc = 2770600;
    Module.__ZTIh = 2770616;
    Module.__ZTIa = 2770624;
    Module.__ZTIs = 2770632;
    Module.__ZTIt = 2770640;
    Module.__ZTIi = 2770648;
    Module.__ZTIj = 2770656;
    Module.__ZTIl = 2770664;
    Module.__ZTIm = 2770672;
    Module.__ZTIx = 2770680;
    Module.__ZTIf = 2770688;
    Module.__ZTId = 2770696;
    Module.__ZTVN10__cxxabiv117__array_type_infoE = 2770704;
    Module.__ZTVN10__cxxabiv120__function_type_infoE = 2770744;
    Module.__ZTVN10__cxxabiv116__enum_type_infoE = 2770772;
    Module.__ZTVN10__cxxabiv117__pbase_type_infoE = 2770956;
    Module.__ZTVN10__cxxabiv129__pointer_to_member_type_infoE = 2771012;
    Module.__ZTVSt9bad_alloc = 2771040;
    Module.__ZTVSt20bad_array_new_length = 2771060;
    Module.__ZTISt9bad_alloc = 2771140;
    Module.__ZTISt20bad_array_new_length = 2771152;
    Module.__ZTSSt9exception = 2559709;
    Module.__ZTVSt13bad_exception = 2771108;
    Module.__ZTISt13bad_exception = 2771128;
    Module.__ZTSSt13bad_exception = 2559722;
    Module.__ZTSSt9bad_alloc = 2559740;
    Module.__ZTSSt20bad_array_new_length = 2559753;
    Module.__ZTVSt12domain_error = 2771204;
    Module.__ZTISt12domain_error = 2771224;
    Module.__ZTSSt12domain_error = 2559778;
    Module.__ZTSSt11logic_error = 2559795;
    Module.__ZTVSt16invalid_argument = 2771248;
    Module.__ZTISt16invalid_argument = 2771268;
    Module.__ZTSSt16invalid_argument = 2559811;
    Module.__ZTVSt12length_error = 2771280;
    Module.__ZTISt12length_error = 2771300;
    Module.__ZTSSt12length_error = 2559832;
    Module.__ZTVSt12out_of_range = 2771312;
    Module.__ZTISt12out_of_range = 2771332;
    Module.__ZTSSt12out_of_range = 2559849;
    Module.__ZTVSt11range_error = 2771344;
    Module.__ZTISt11range_error = 2771364;
    Module.__ZTSSt11range_error = 2559866;
    Module.__ZTSSt13runtime_error = 2559882;
    Module.__ZTVSt14overflow_error = 2771388;
    Module.__ZTISt14overflow_error = 2771408;
    Module.__ZTSSt14overflow_error = 2559900;
    Module.__ZTVSt15underflow_error = 2771420;
    Module.__ZTISt15underflow_error = 2771440;
    Module.__ZTSSt15underflow_error = 2559919;
    Module.__ZTVSt8bad_cast = 2771452;
    Module.__ZTVSt10bad_typeid = 2771472;
    Module.__ZTISt8bad_cast = 2771516;
    Module.__ZTISt10bad_typeid = 2771528;
    Module.__ZTVSt9type_info = 2771492;
    Module.__ZTSSt9type_info = 2559939;
    Module.__ZTSSt8bad_cast = 2559952;
    Module.__ZTSSt10bad_typeid = 2559964;
    function invoke_ii(e, t2) {
      var r = stackSave();
      try {
        return getWasmTableEntry(e)(t2);
      } catch (a2) {
        if (stackRestore(r), a2 !== a2 + 0) throw a2;
        _setThrew(1, 0);
      }
    }
    function invoke_vii(e, t2, r) {
      var a2 = stackSave();
      try {
        getWasmTableEntry(e)(t2, r);
      } catch (o2) {
        if (stackRestore(a2), o2 !== o2 + 0) throw o2;
        _setThrew(1, 0);
      }
    }
    function invoke_viiiii(e, t2, r, a2, o2, _3) {
      var s2 = stackSave();
      try {
        getWasmTableEntry(e)(t2, r, a2, o2, _3);
      } catch (n2) {
        if (stackRestore(s2), n2 !== n2 + 0) throw n2;
        _setThrew(1, 0);
      }
    }
    function invoke_vi(e, t2) {
      var r = stackSave();
      try {
        getWasmTableEntry(e)(t2);
      } catch (a2) {
        if (stackRestore(r), a2 !== a2 + 0) throw a2;
        _setThrew(1, 0);
      }
    }
    function invoke_v(e) {
      var t2 = stackSave();
      try {
        getWasmTableEntry(e)();
      } catch (r) {
        if (stackRestore(t2), r !== r + 0) throw r;
        _setThrew(1, 0);
      }
    }
    function invoke_iii(e, t2, r) {
      var a2 = stackSave();
      try {
        return getWasmTableEntry(e)(t2, r);
      } catch (o2) {
        if (stackRestore(a2), o2 !== o2 + 0) throw o2;
        _setThrew(1, 0);
      }
    }
    function invoke_viii(e, t2, r, a2) {
      var o2 = stackSave();
      try {
        getWasmTableEntry(e)(t2, r, a2);
      } catch (_3) {
        if (stackRestore(o2), _3 !== _3 + 0) throw _3;
        _setThrew(1, 0);
      }
    }
    function invoke_iiii(e, t2, r, a2) {
      var o2 = stackSave();
      try {
        return getWasmTableEntry(e)(t2, r, a2);
      } catch (_3) {
        if (stackRestore(o2), _3 !== _3 + 0) throw _3;
        _setThrew(1, 0);
      }
    }
    function invoke_jii(e, t2, r) {
      var a2 = stackSave();
      try {
        return getWasmTableEntry(e)(t2, r);
      } catch (o2) {
        if (stackRestore(a2), o2 !== o2 + 0) throw o2;
        return _setThrew(1, 0), 0n;
      }
    }
    function invoke_iiiii(e, t2, r, a2, o2) {
      var _3 = stackSave();
      try {
        return getWasmTableEntry(e)(t2, r, a2, o2);
      } catch (s2) {
        if (stackRestore(_3), s2 !== s2 + 0) throw s2;
        _setThrew(1, 0);
      }
    }
    function invoke_i(e) {
      var t2 = stackSave();
      try {
        return getWasmTableEntry(e)();
      } catch (r) {
        if (stackRestore(t2), r !== r + 0) throw r;
        _setThrew(1, 0);
      }
    }
    function invoke_ji(e, t2) {
      var r = stackSave();
      try {
        return getWasmTableEntry(e)(t2);
      } catch (a2) {
        if (stackRestore(r), a2 !== a2 + 0) throw a2;
        return _setThrew(1, 0), 0n;
      }
    }
    function invoke_jiiiiiiiii(e, t2, r, a2, o2, _3, s2, n2, l2, d2) {
      var p2 = stackSave();
      try {
        return getWasmTableEntry(e)(t2, r, a2, o2, _3, s2, n2, l2, d2);
      } catch (m2) {
        if (stackRestore(p2), m2 !== m2 + 0) throw m2;
        return _setThrew(1, 0), 0n;
      }
    }
    function invoke_jiiiiii(e, t2, r, a2, o2, _3, s2) {
      var n2 = stackSave();
      try {
        return getWasmTableEntry(e)(t2, r, a2, o2, _3, s2);
      } catch (l2) {
        if (stackRestore(n2), l2 !== l2 + 0) throw l2;
        return _setThrew(1, 0), 0n;
      }
    }
    function invoke_viiii(e, t2, r, a2, o2) {
      var _3 = stackSave();
      try {
        getWasmTableEntry(e)(t2, r, a2, o2);
      } catch (s2) {
        if (stackRestore(_3), s2 !== s2 + 0) throw s2;
        _setThrew(1, 0);
      }
    }
    function invoke_iiiiiiiiiiiiii(e, t2, r, a2, o2, _3, s2, n2, l2, d2, p2, m2, g2, u2) {
      var f2 = stackSave();
      try {
        return getWasmTableEntry(e)(t2, r, a2, o2, _3, s2, n2, l2, d2, p2, m2, g2, u2);
      } catch (c2) {
        if (stackRestore(f2), c2 !== c2 + 0) throw c2;
        _setThrew(1, 0);
      }
    }
    function invoke_vji(e, t2, r) {
      var a2 = stackSave();
      try {
        getWasmTableEntry(e)(t2, r);
      } catch (o2) {
        if (stackRestore(a2), o2 !== o2 + 0) throw o2;
        _setThrew(1, 0);
      }
    }
    function invoke_viiji(e, t2, r, a2, o2) {
      var _3 = stackSave();
      try {
        getWasmTableEntry(e)(t2, r, a2, o2);
      } catch (s2) {
        if (stackRestore(_3), s2 !== s2 + 0) throw s2;
        _setThrew(1, 0);
      }
    }
    function invoke_iiiij(e, t2, r, a2, o2) {
      var _3 = stackSave();
      try {
        return getWasmTableEntry(e)(t2, r, a2, o2);
      } catch (s2) {
        if (stackRestore(_3), s2 !== s2 + 0) throw s2;
        _setThrew(1, 0);
      }
    }
    function invoke_vijiji(e, t2, r, a2, o2, _3) {
      var s2 = stackSave();
      try {
        getWasmTableEntry(e)(t2, r, a2, o2, _3);
      } catch (n2) {
        if (stackRestore(s2), n2 !== n2 + 0) throw n2;
        _setThrew(1, 0);
      }
    }
    function invoke_viji(e, t2, r, a2) {
      var o2 = stackSave();
      try {
        getWasmTableEntry(e)(t2, r, a2);
      } catch (_3) {
        if (stackRestore(o2), _3 !== _3 + 0) throw _3;
        _setThrew(1, 0);
      }
    }
    function invoke_iiiiii(e, t2, r, a2, o2, _3) {
      var s2 = stackSave();
      try {
        return getWasmTableEntry(e)(t2, r, a2, o2, _3);
      } catch (n2) {
        if (stackRestore(s2), n2 !== n2 + 0) throw n2;
        _setThrew(1, 0);
      }
    }
    function invoke_iiiiiiiii(e, t2, r, a2, o2, _3, s2, n2, l2) {
      var d2 = stackSave();
      try {
        return getWasmTableEntry(e)(t2, r, a2, o2, _3, s2, n2, l2);
      } catch (p2) {
        if (stackRestore(d2), p2 !== p2 + 0) throw p2;
        _setThrew(1, 0);
      }
    }
    function invoke_iiiiiiiiiiiiiiiiii(e, t2, r, a2, o2, _3, s2, n2, l2, d2, p2, m2, g2, u2, f2, c2, w2, S2) {
      var k2 = stackSave();
      try {
        return getWasmTableEntry(e)(t2, r, a2, o2, _3, s2, n2, l2, d2, p2, m2, g2, u2, f2, c2, w2, S2);
      } catch (E2) {
        if (stackRestore(k2), E2 !== E2 + 0) throw E2;
        _setThrew(1, 0);
      }
    }
    function invoke_iiiiiii(e, t2, r, a2, o2, _3, s2) {
      var n2 = stackSave();
      try {
        return getWasmTableEntry(e)(t2, r, a2, o2, _3, s2);
      } catch (l2) {
        if (stackRestore(n2), l2 !== l2 + 0) throw l2;
        _setThrew(1, 0);
      }
    }
    function invoke_vj(e, t2) {
      var r = stackSave();
      try {
        getWasmTableEntry(e)(t2);
      } catch (a2) {
        if (stackRestore(r), a2 !== a2 + 0) throw a2;
        _setThrew(1, 0);
      }
    }
    function invoke_iiiiiiiiii(e, t2, r, a2, o2, _3, s2, n2, l2, d2) {
      var p2 = stackSave();
      try {
        return getWasmTableEntry(e)(t2, r, a2, o2, _3, s2, n2, l2, d2);
      } catch (m2) {
        if (stackRestore(p2), m2 !== m2 + 0) throw m2;
        _setThrew(1, 0);
      }
    }
    function invoke_viij(e, t2, r, a2) {
      var o2 = stackSave();
      try {
        getWasmTableEntry(e)(t2, r, a2);
      } catch (_3) {
        if (stackRestore(o2), _3 !== _3 + 0) throw _3;
        _setThrew(1, 0);
      }
    }
    function invoke_viiiiiiii(e, t2, r, a2, o2, _3, s2, n2, l2) {
      var d2 = stackSave();
      try {
        getWasmTableEntry(e)(t2, r, a2, o2, _3, s2, n2, l2);
      } catch (p2) {
        if (stackRestore(d2), p2 !== p2 + 0) throw p2;
        _setThrew(1, 0);
      }
    }
    function invoke_viiiiiiiii(e, t2, r, a2, o2, _3, s2, n2, l2, d2) {
      var p2 = stackSave();
      try {
        getWasmTableEntry(e)(t2, r, a2, o2, _3, s2, n2, l2, d2);
      } catch (m2) {
        if (stackRestore(p2), m2 !== m2 + 0) throw m2;
        _setThrew(1, 0);
      }
    }
    function invoke_vij(e, t2, r) {
      var a2 = stackSave();
      try {
        getWasmTableEntry(e)(t2, r);
      } catch (o2) {
        if (stackRestore(a2), o2 !== o2 + 0) throw o2;
        _setThrew(1, 0);
      }
    }
    function invoke_viiiiii(e, t2, r, a2, o2, _3, s2) {
      var n2 = stackSave();
      try {
        getWasmTableEntry(e)(t2, r, a2, o2, _3, s2);
      } catch (l2) {
        if (stackRestore(n2), l2 !== l2 + 0) throw l2;
        _setThrew(1, 0);
      }
    }
    function invoke_iiji(e, t2, r, a2) {
      var o2 = stackSave();
      try {
        return getWasmTableEntry(e)(t2, r, a2);
      } catch (_3) {
        if (stackRestore(o2), _3 !== _3 + 0) throw _3;
        _setThrew(1, 0);
      }
    }
    function invoke_ij(e, t2) {
      var r = stackSave();
      try {
        return getWasmTableEntry(e)(t2);
      } catch (a2) {
        if (stackRestore(r), a2 !== a2 + 0) throw a2;
        _setThrew(1, 0);
      }
    }
    function invoke_viiiiiii(e, t2, r, a2, o2, _3, s2, n2) {
      var l2 = stackSave();
      try {
        getWasmTableEntry(e)(t2, r, a2, o2, _3, s2, n2);
      } catch (d2) {
        if (stackRestore(l2), d2 !== d2 + 0) throw d2;
        _setThrew(1, 0);
      }
    }
    function invoke_viiiji(e, t2, r, a2, o2, _3) {
      var s2 = stackSave();
      try {
        getWasmTableEntry(e)(t2, r, a2, o2, _3);
      } catch (n2) {
        if (stackRestore(s2), n2 !== n2 + 0) throw n2;
        _setThrew(1, 0);
      }
    }
    function invoke_iiiiiiii(e, t2, r, a2, o2, _3, s2, n2) {
      var l2 = stackSave();
      try {
        return getWasmTableEntry(e)(t2, r, a2, o2, _3, s2, n2);
      } catch (d2) {
        if (stackRestore(l2), d2 !== d2 + 0) throw d2;
        _setThrew(1, 0);
      }
    }
    function invoke_iiij(e, t2, r, a2) {
      var o2 = stackSave();
      try {
        return getWasmTableEntry(e)(t2, r, a2);
      } catch (_3) {
        if (stackRestore(o2), _3 !== _3 + 0) throw _3;
        _setThrew(1, 0);
      }
    }
    function invoke_vid(e, t2, r) {
      var a2 = stackSave();
      try {
        getWasmTableEntry(e)(t2, r);
      } catch (o2) {
        if (stackRestore(a2), o2 !== o2 + 0) throw o2;
        _setThrew(1, 0);
      }
    }
    function invoke_j(e) {
      var t2 = stackSave();
      try {
        return getWasmTableEntry(e)();
      } catch (r) {
        if (stackRestore(t2), r !== r + 0) throw r;
        return _setThrew(1, 0), 0n;
      }
    }
    function invoke_ijji(e, t2, r, a2) {
      var o2 = stackSave();
      try {
        return getWasmTableEntry(e)(t2, r, a2);
      } catch (_3) {
        if (stackRestore(o2), _3 !== _3 + 0) throw _3;
        _setThrew(1, 0);
      }
    }
    function invoke_iijj(e, t2, r, a2) {
      var o2 = stackSave();
      try {
        return getWasmTableEntry(e)(t2, r, a2);
      } catch (_3) {
        if (stackRestore(o2), _3 !== _3 + 0) throw _3;
        _setThrew(1, 0);
      }
    }
    function invoke_jiii(e, t2, r, a2) {
      var o2 = stackSave();
      try {
        return getWasmTableEntry(e)(t2, r, a2);
      } catch (_3) {
        if (stackRestore(o2), _3 !== _3 + 0) throw _3;
        return _setThrew(1, 0), 0n;
      }
    }
    function invoke_jij(e, t2, r) {
      var a2 = stackSave();
      try {
        return getWasmTableEntry(e)(t2, r);
      } catch (o2) {
        if (stackRestore(a2), o2 !== o2 + 0) throw o2;
        return _setThrew(1, 0), 0n;
      }
    }
    function invoke_ijiiiiii(e, t2, r, a2, o2, _3, s2, n2) {
      var l2 = stackSave();
      try {
        return getWasmTableEntry(e)(t2, r, a2, o2, _3, s2, n2);
      } catch (d2) {
        if (stackRestore(l2), d2 !== d2 + 0) throw d2;
        _setThrew(1, 0);
      }
    }
    function invoke_viijii(e, t2, r, a2, o2, _3) {
      var s2 = stackSave();
      try {
        getWasmTableEntry(e)(t2, r, a2, o2, _3);
      } catch (n2) {
        if (stackRestore(s2), n2 !== n2 + 0) throw n2;
        _setThrew(1, 0);
      }
    }
    function invoke_iiiiiji(e, t2, r, a2, o2, _3, s2) {
      var n2 = stackSave();
      try {
        return getWasmTableEntry(e)(t2, r, a2, o2, _3, s2);
      } catch (l2) {
        if (stackRestore(n2), l2 !== l2 + 0) throw l2;
        _setThrew(1, 0);
      }
    }
    function invoke_viijiiii(e, t2, r, a2, o2, _3, s2, n2) {
      var l2 = stackSave();
      try {
        getWasmTableEntry(e)(t2, r, a2, o2, _3, s2, n2);
      } catch (d2) {
        if (stackRestore(l2), d2 !== d2 + 0) throw d2;
        _setThrew(1, 0);
      }
    }
    function invoke_vijjii(e, t2, r, a2, o2, _3) {
      var s2 = stackSave();
      try {
        getWasmTableEntry(e)(t2, r, a2, o2, _3);
      } catch (n2) {
        if (stackRestore(s2), n2 !== n2 + 0) throw n2;
        _setThrew(1, 0);
      }
    }
    function invoke_vjii(e, t2, r, a2) {
      var o2 = stackSave();
      try {
        getWasmTableEntry(e)(t2, r, a2);
      } catch (_3) {
        if (stackRestore(o2), _3 !== _3 + 0) throw _3;
        _setThrew(1, 0);
      }
    }
    function invoke_jiiii(e, t2, r, a2, o2) {
      var _3 = stackSave();
      try {
        return getWasmTableEntry(e)(t2, r, a2, o2);
      } catch (s2) {
        if (stackRestore(_3), s2 !== s2 + 0) throw s2;
        return _setThrew(1, 0), 0n;
      }
    }
    function invoke_viiiiiiiiiiii(e, t2, r, a2, o2, _3, s2, n2, l2, d2, p2, m2, g2) {
      var u2 = stackSave();
      try {
        getWasmTableEntry(e)(t2, r, a2, o2, _3, s2, n2, l2, d2, p2, m2, g2);
      } catch (f2) {
        if (stackRestore(u2), f2 !== f2 + 0) throw f2;
        _setThrew(1, 0);
      }
    }
    function invoke_di(e, t2) {
      var r = stackSave();
      try {
        return getWasmTableEntry(e)(t2);
      } catch (a2) {
        if (stackRestore(r), a2 !== a2 + 0) throw a2;
        _setThrew(1, 0);
      }
    }
    function invoke_id(e, t2) {
      var r = stackSave();
      try {
        return getWasmTableEntry(e)(t2);
      } catch (a2) {
        if (stackRestore(r), a2 !== a2 + 0) throw a2;
        _setThrew(1, 0);
      }
    }
    function invoke_ijiiiii(e, t2, r, a2, o2, _3, s2) {
      var n2 = stackSave();
      try {
        return getWasmTableEntry(e)(t2, r, a2, o2, _3, s2);
      } catch (l2) {
        if (stackRestore(n2), l2 !== l2 + 0) throw l2;
        _setThrew(1, 0);
      }
    }
    function invoke_iiiiiiiiiii(e, t2, r, a2, o2, _3, s2, n2, l2, d2, p2) {
      var m2 = stackSave();
      try {
        return getWasmTableEntry(e)(t2, r, a2, o2, _3, s2, n2, l2, d2, p2);
      } catch (g2) {
        if (stackRestore(m2), g2 !== g2 + 0) throw g2;
        _setThrew(1, 0);
      }
    }
    Module.addRunDependency = addRunDependency, Module.removeRunDependency = removeRunDependency, Module.callMain = callMain, Module.ENV = ENV, Module.addFunction = addFunction, Module.removeFunction = removeFunction, Module.setValue = setValue, Module.getValue = getValue, Module.UTF8ToString = UTF8ToString, Module.stringToNewUTF8 = stringToNewUTF8, Module.stringToUTF8OnStack = stringToUTF8OnStack, Module.FS_createPreloadedFile = FS_createPreloadedFile, Module.FS_unlink = FS_unlink, Module.FS_createPath = FS_createPath, Module.FS_createDevice = FS_createDevice, Module.FS = FS, Module.FS_createDataFile = FS_createDataFile, Module.FS_createLazyFile = FS_createLazyFile, Module.MEMFS = MEMFS, Module.PROXYFS = PROXYFS, Module.IDBFS = IDBFS;
    var calledRun;
    dependenciesFulfilled = function e() {
      calledRun || run(), calledRun || (dependenciesFulfilled = e);
    };
    function callMain(e = []) {
      var t2 = resolveGlobalSymbol("main").sym;
      if (t2) {
        e.unshift(thisProgram);
        var r = e.length, a2 = stackAlloc((r + 1) * 4), o2 = a2;
        e.forEach((s2) => {
          HEAPU32[o2 >> 2] = stringToUTF8OnStack(s2), o2 += 4;
        }), HEAPU32[o2 >> 2] = 0;
        try {
          var _3 = t2(r, a2);
          return exitJS(_3, true), _3;
        } catch (s2) {
          return handleException(s2);
        }
      }
    }
    function run(e = arguments_) {
      if (runDependencies > 0 || (preRun(), runDependencies > 0)) return;
      function t2() {
        calledRun || (calledRun = true, Module.calledRun = true, !ABORT && (initRuntime(), preMain(), readyPromiseResolve(Module), Module.onRuntimeInitialized?.(), shouldRunNow && callMain(e), postRun()));
      }
      Module.setStatus ? (Module.setStatus("Running..."), setTimeout(() => {
        setTimeout(() => Module.setStatus(""), 1), t2();
      }, 1)) : t2();
    }
    if (Module.preInit) for (typeof Module.preInit == "function" && (Module.preInit = [Module.preInit]); Module.preInit.length > 0; ) Module.preInit.pop()();
    var shouldRunNow = false;
    return Module.noInitialRun && (shouldRunNow = false), run(), quit_ = (e, t2) => {
      throw t2;
    }, moduleRtn = readyPromise, moduleRtn;
  };
})(), He = ht;
var We = He;
var ae = class {
  constructor(t2 = { results: [], throwOnError: false, onNotice: void 0, databaseError: null }) {
    this.results = [];
    this.throwOnError = false;
    this.databaseError = null;
    this.results = t2.results || [], this.throwOnError = t2.throwOnError || false, this.onNotice = t2.onNotice, this.databaseError = t2.databaseError === void 0 ? null : t2.databaseError;
  }
}, H, oe, _e, se, ie, Fe, Te, Pe, Ce, de, ue, Me, pe, ne, ee, D, le, ce, I, me, $, W, O, z, he, xe, we, ge, x, Xe, Ke, Ye, Qe, $e, Je, et, qe, tt, G, rt, at, ot, _t, st, N = class N3 extends z$1 {
  constructor(r = {}, a2 = {}) {
    super();
    R$1(this, x);
    this.POSTGRES_MAIN_LONGJMP = 100;
    this.PGLITE_EXIT_ALIVE = 99;
    R$1(this, H);
    R$1(this, oe, false);
    R$1(this, _e, false);
    R$1(this, se, false);
    R$1(this, ie, false);
    R$1(this, Fe, new J());
    R$1(this, Te, new J());
    R$1(this, Pe, new J());
    R$1(this, Ce, new J());
    R$1(this, de, false);
    this.debug = 0;
    R$1(this, ue);
    R$1(this, Me, []);
    R$1(this, pe, new pe$1());
    R$1(this, ne);
    R$1(this, ee);
    R$1(this, D, /* @__PURE__ */ new Map());
    R$1(this, le, /* @__PURE__ */ new Set());
    R$1(this, ce, -1);
    R$1(this, I, new ae());
    R$1(this, me, -1);
    R$1(this, $, []);
    R$1(this, W, 0);
    R$1(this, O, new Uint8Array(0));
    R$1(this, z, 0);
    R$1(this, he, -1);
    R$1(this, xe, -1);
    R$1(this, we, -1);
    this.externalCommandStreamFd = null;
    R$1(this, ge, false);
    typeof r == "string" ? a2 = { dataDir: r, ...a2 } : a2 = r, this.dataDir = a2.dataDir, a2.parsers !== void 0 && (this.parsers = { ...this.parsers, ...a2.parsers }), a2.serializers !== void 0 && (this.serializers = { ...this.serializers, ...a2.serializers }), a2?.debug !== void 0 && (this.debug = a2.debug), a2?.relaxedDurability !== void 0 && x$2(this, ie, a2.relaxedDurability), x$2(this, ue, a2.extensions ?? {}), this.waitReady = T$1(this, x, Ye).call(this, a2 ?? {});
  }
  get ENV() {
    return this.mod?.ENV;
  }
  static async create(r, a2) {
    let o2 = typeof r == "string" ? { dataDir: r, ...a2 ?? {} } : r ?? a2 ?? {}, _3 = new N3(o2);
    return await _3.waitReady, _3;
  }
  handleExternalCmd(r, a2) {
    if (r.startsWith("locale -a") && a2 === "r") {
      let o2 = this.mod.stringToUTF8OnStack("/pglite/locale-a"), _3 = this.mod.stringToUTF8OnStack(a2);
      return this.mod._fopen(o2, _3);
    }
    throw new Error("Unhandled cmd");
  }
  get Module() {
    return this.mod;
  }
  get ready() {
    return h$1(this, oe) && !h$1(this, _e) && !h$1(this, se);
  }
  get closed() {
    return h$1(this, se);
  }
  async close() {
    await this._checkReady(), x$2(this, _e, true);
    for (let r of h$1(this, Me)) await r();
    try {
      this.mod._pgl_setPGliteActive(0), await this.execProtocol($e$1.end()), this.mod._pgl_run_atexit_funcs();
    } catch (r) {
      let a2 = r;
      a2.name === "ExitStatus" && a2.status === 0 || T$1(this, x, G).call(this, "An error occured while closing the db", r.toString());
    } finally {
      this.mod.removeFunction(h$1(this, me)), this.mod.removeFunction(h$1(this, ce));
    }
    await this.fs.closeFs(), x$2(this, se, true), x$2(this, _e, false), x$2(this, oe, false), x$2(this, ge, false);
    try {
      this.mod._emscripten_force_exit(0);
    } catch (r) {
      T$1(this, x, G).call(this, r), r.status !== 0 && T$1(this, x, G).call(this, "Error when exiting", r.toString());
    } finally {
      this.mod = void 0;
    }
  }
  async [Symbol.asyncDispose]() {
    await this.close();
  }
  async _handleBlob(r) {
    x$2(this, ne, r ? await r.arrayBuffer() : void 0);
  }
  async _cleanupBlob() {
    x$2(this, ne, void 0);
  }
  async _getWrittenBlob() {
    if (!h$1(this, ee)) return;
    let r = new Blob(h$1(this, ee));
    return x$2(this, ee, void 0), r;
  }
  async _checkReady() {
    if (h$1(this, _e)) throw new Error("PGlite is closing");
    if (h$1(this, se)) throw new Error("PGlite is closed");
    h$1(this, oe) || await this.waitReady;
  }
  execProtocolRawSync(r) {
    let a2 = this.mod;
    if (x$2(this, W, 0), x$2(this, z, 0), x$2(this, $, r), h$1(this, H) || x$2(this, H, T$1(this, x, et)), h$1(this, O).length !== N3.DEFAULT_RECV_BUF_SIZE && x$2(this, O, new Uint8Array(N3.DEFAULT_RECV_BUF_SIZE)), r[0] === 88) return new Uint8Array(0);
    if (r[0] === 0) return T$1(this, x, st).call(this, r);
    try {
      for (; h$1(this, W) < r.length || a2._pq_buffer_remaining_data() > 0; ) try {
        a2._PostgresMainLoopOnce();
      } catch {
        this.mod._pgl_setPGliteExitStatus(-2) === this.POSTGRES_MAIN_LONGJMP && a2._PostgresMainLongJmp();
      }
    } finally {
      a2._PostgresSendReadyForQueryIfNecessary(), a2._pgl_pq_flush();
    }
    return x$2(this, $, []), h$1(this, z) ? new Uint8Array(h$1(this, O).subarray(0, h$1(this, z))) : new Uint8Array(0);
  }
  async execProtocolRaw(r, { syncToFs: a2 = true } = {}) {
    let o2 = this.execProtocolRawSync(r);
    return a2 && await this.syncToFs(), o2;
  }
  async execProtocolRawStream(r, { syncToFs: a2 = true, onRawData: o2 }) {
    x$2(this, H, (_3) => (o2(_3), _3.length)), this.execProtocolRawSync(r), a2 && await this.syncToFs();
  }
  async execProtocol(r, { syncToFs: a2 = true, throwOnError: o2 = true, onNotice: _3 } = {}) {
    x$2(this, I, new ae({ throwOnError: o2, onNotice: _3 }));
    let s2 = await this.execProtocolRaw(r, { syncToFs: a2 }), n2 = h$1(this, I).databaseError, l2 = { messages: h$1(this, I).results, data: s2 };
    if (x$2(this, I, new ae()), x$2(this, H, void 0), o2 && n2) throw x$2(this, pe, new pe$1()), n2;
    return l2;
  }
  async execProtocolStream(r, { syncToFs: a2, throwOnError: o2 = true, onNotice: _3 } = {}) {
    x$2(this, I, new ae({ throwOnError: o2, onNotice: _3 })), x$2(this, H, T$1(this, x, qe)), await this.execProtocolRaw(r, { syncToFs: a2 });
    let s2 = h$1(this, I).databaseError, n2 = h$1(this, I).results;
    if (x$2(this, I, new ae()), x$2(this, H, void 0), o2 && s2) throw x$2(this, pe, new pe$1()), s2;
    return n2;
  }
  isInTransaction() {
    return this.mod._IsTransactionBlock() !== 0;
  }
  async syncToFs() {
    if (h$1(this, de)) return;
    x$2(this, de, true);
    let r = async () => {
      await h$1(this, Ce).runExclusive(async () => {
        x$2(this, de, false), await this.fs.syncToFs(h$1(this, ie));
      });
    };
    h$1(this, ie) ? r() : await r();
  }
  async listen(r, a2, o2) {
    return this._runExclusiveListen(() => T$1(this, x, rt).call(this, r, a2, o2));
  }
  async unlisten(r, a2, o2) {
    return this._runExclusiveListen(() => T$1(this, x, at).call(this, r, a2, o2));
  }
  onNotification(r) {
    return h$1(this, le).add(r), () => {
      h$1(this, le).delete(r);
    };
  }
  offNotification(r) {
    h$1(this, le).delete(r);
  }
  async dumpDataDir(r) {
    await this._checkReady();
    let a2 = this.dataDir?.split("/").pop() ?? "pgdata";
    return this.fs.dumpTar(a2, r);
  }
  _runExclusiveQuery(r) {
    return h$1(this, Fe).runExclusive(r);
  }
  _runExclusiveTransaction(r) {
    return h$1(this, Te).runExclusive(r);
  }
  async clone() {
    let r = await this.dumpDataDir("none");
    return N3.create({ loadDataDir: r, extensions: h$1(this, ue) });
  }
  _runExclusiveListen(r) {
    return h$1(this, Pe).runExclusive(r);
  }
  callMain(r) {
    return this.mod.callMain(r);
  }
  copyToFS(r, a2, o2) {
    fe(this.mod.FS, r, a2, o2);
  }
};
H = /* @__PURE__ */ new WeakMap(), oe = /* @__PURE__ */ new WeakMap(), _e = /* @__PURE__ */ new WeakMap(), se = /* @__PURE__ */ new WeakMap(), ie = /* @__PURE__ */ new WeakMap(), Fe = /* @__PURE__ */ new WeakMap(), Te = /* @__PURE__ */ new WeakMap(), Pe = /* @__PURE__ */ new WeakMap(), Ce = /* @__PURE__ */ new WeakMap(), de = /* @__PURE__ */ new WeakMap(), ue = /* @__PURE__ */ new WeakMap(), Me = /* @__PURE__ */ new WeakMap(), pe = /* @__PURE__ */ new WeakMap(), ne = /* @__PURE__ */ new WeakMap(), ee = /* @__PURE__ */ new WeakMap(), D = /* @__PURE__ */ new WeakMap(), le = /* @__PURE__ */ new WeakMap(), ce = /* @__PURE__ */ new WeakMap(), I = /* @__PURE__ */ new WeakMap(), me = /* @__PURE__ */ new WeakMap(), $ = /* @__PURE__ */ new WeakMap(), W = /* @__PURE__ */ new WeakMap(), O = /* @__PURE__ */ new WeakMap(), z = /* @__PURE__ */ new WeakMap(), he = /* @__PURE__ */ new WeakMap(), xe = /* @__PURE__ */ new WeakMap(), we = /* @__PURE__ */ new WeakMap(), ge = /* @__PURE__ */ new WeakMap(), x = /* @__PURE__ */ new WeakSet(), Xe = function(r) {
  this.debug && console.debug(r);
}, Ke = function(r) {
  this.debug && console.error(r);
}, Ye = async function(r) {
  if (r.fs) this.fs = r.fs;
  else {
    let { dataDir: u2, fsType: f2 } = Ze(r.dataDir);
    this.fs = await je(u2, f2);
  }
  let a2 = {}, o2 = [], _3 = [...this.debug ? ["-d", this.debug.toString()] : []];
  r.pgliteWasmModule || p.startArtifactDownload(new URL("./pglite.wasm", import.meta.url)), r.initdbWasmModule || p.startArtifactDownload(new URL("./initdb.wasm", import.meta.url));
  let s2 = new URL("./pglite.data", import.meta.url), n2 = r.fsBundle ? r.fsBundle.arrayBuffer() : p.getFsBundle(s2), l2;
  n2.then((u2) => {
    l2 = u2;
  });
  let d2 = new WebAssembly.Memory({ initial: r.initialMemory ? r.initialMemory / (64 * 1024) : 2048, maximum: 32768 }), p$12 = { thisProgram: wt, PGLITE_ENV: {}, WASM_PREFIX: p.WASM_PREFIX, arguments: _3, noExitRuntime: true, wasmMemory: d2, stdin: () => null, print: (u2) => {
    T$1(this, x, Xe).call(this, u2);
  }, printErr: (u2) => {
    T$1(this, x, Ke).call(this, u2);
  }, instantiateWasm: (u2, f2) => {
    let c2 = new URL("./pglite.wasm", import.meta.url);
    return p.instantiateWasm(u2, c2, r.pgliteWasmModule).then(({ instance: w2, module: S2 }) => {
      f2(w2, S2);
    }), {};
  }, getPreloadedPackage: (u2, f2) => {
    if (u2 === "pglite.data") {
      if (l2.byteLength !== f2) throw new Error(`Invalid FS bundle size: ${l2.byteLength} !== ${f2}`);
      return l2;
    }
    throw new Error(`Unknown package: ${u2}`);
  }, preRun: [(u2) => {
    u2.onRuntimeInitialized = () => {
      T$1(this, x, Je).call(this, u2);
    };
  }, (u2) => {
    let f2 = u2.FS.makedev(64, 0), c2 = { open: (w2) => {
    }, close: (w2) => {
    }, read: (w2, S2, k2, E2, y2) => {
      let M = h$1(this, ne);
      if (!M) throw new Error("No /dev/blob File or Blob provided to read from");
      let b2 = new Uint8Array(M);
      if (y2 >= b2.length) return 0;
      let F2 = Math.min(b2.length - y2, E2);
      for (let A2 = 0; A2 < F2; A2++) S2[k2 + A2] = b2[y2 + A2];
      return F2;
    }, write: (w2, S2, k2, E2, y2) => (h$1(this, ee) ?? x$2(this, ee, []), h$1(this, ee).push(S2.slice(k2, k2 + E2)), E2), llseek: (w2, S2, k2) => {
      let E2 = h$1(this, ne);
      if (!E2) throw new Error("No /dev/blob File or Blob provided to llseek");
      let y2 = S2;
      if (k2 === 1 ? y2 += w2.position : k2 === 2 && (y2 = new Uint8Array(E2).length), y2 < 0) throw new u2.FS.ErrnoError(28);
      return y2;
    } };
    u2.FS.registerDevice(f2, c2), u2.FS.mkdev("/dev/blob", f2);
  }, (u2) => {
    u2.ENV.HOME = "/home/postgres", u2.ENV.USER = "postgres", u2.ENV.LOGNAME = "postgres", u2.ENV.PGDATA = B, u2.ENV.PGUSER = r.username ?? "postgres", u2.ENV.PGDATABASE = r.database ?? "postgres", u2.ENV.LANG = u2.ENV.LC_COLLATE = u2.ENV.LC_CTYPE = "en_US.UTF-8", u2.ENV.TZ = "UTC", u2.ENV.PGTZ = "UTC", u2.ENV.PGCLIENTENCODING = "UTF8", u2.ENV.ICU_DATA = jr, u2.PGLITE_ENV && Object.assign(u2.ENV, u2.PGLITE_ENV);
  }, (u2) => {
    u2.FS.chmod("/home/postgres/.pgpass", 384), u2.FS.chmod(Gr, 365), u2.FS.chmod(wt, 365);
  }] }, { emscriptenOpts: m2 } = await this.fs.init(this, p$12);
  p$12 = m2;
  let g2 = [];
  for (let [u2, f2] of Object.entries(h$1(this, ue))) if (f2 instanceof URL) a2[u2] = Re(f2);
  else {
    let c2 = await f2.setup(this, p$12);
    if (c2.emscriptenOpts && (p$12 = c2.emscriptenOpts), c2.namespaceObj) {
      let w2 = this;
      w2[u2] = c2.namespaceObj;
    }
    c2.bundlePath && (a2[u2] = Re(c2.bundlePath)), c2.init && o2.push(c2.init), c2.close && h$1(this, Me).push(c2.close), g2.push(...c2.sharedPreloadLibraries ?? []);
  }
  if (p$12.pg_extensions = a2, await n2, this.mod = await We(p$12), await this.fs.initialSyncFs(), r.icuDataDir && await T$1(this, x, $e).call(this, r.icuDataDir), !r.noInitDb) {
    if (r.loadDataDir) {
      if (this.mod.FS.analyzePath(B + "/PG_VERSION").exists) throw new Error("Database already exists, cannot load from tarball");
      T$1(this, x, G).call(this, "pglite: loading data from tarball"), await at$1(this.mod.FS, r.loadDataDir, B);
    } else if (this.mod.FS.analyzePath(B + "/PG_VERSION").exists) T$1(this, x, G).call(this, "pglite: found DB, resuming");
    else {
      T$1(this, x, G).call(this, "pglite: no db in filesystem, running initdb");
      let u2 = { ...r };
      u2.noInitDb = true, u2.dataDir = void 0, u2.extensions = void 0, u2.loadDataDir = void 0, u2.fs = void 0;
      let f2 = await N.create(u2), c2 = await At({ pg: f2, debug: r.debug, wasmModule: r.initdbWasmModule, args: r.initDbStartParams });
      if (c2.exitCode !== 0 && !c2.stderr.includes("exists but is not empty")) throw new Error("INITDB failed to initialize: " + c2.stderr);
      let w2 = await f2.dumpDataDir("none");
      f2.close(), await at$1(this.mod.FS, w2, B), await this.syncToFs();
    }
    await Ue(this.mod, (...u2) => T$1(this, x, G).call(this, ...u2)), T$1(this, x, Qe).call(this, g2, r), this.mod._pgl_setPGliteActive(1), T$1(this, x, _t).call(this, { pgDataFolder: B, startParams: [...r.startParams || N.defaultStartParams, ...this.debug ? ["-d", this.debug.toString()] : []] }), T$1(this, x, ot).call(this), x$2(this, oe, true), r.username && await this.exec(`SET ROLE ${r.username};`), await this._initArrayTypes();
    for (let u2 of o2) await u2();
  }
}, Qe = function(r, a2) {
  if (r.length && !a2.postgresqlconf && (a2.postgresqlconf = new Array()), a2.postgresqlconf) {
    let o2 = typeof a2.postgresqlconf == "string" ? a2.postgresqlconf : a2.postgresqlconf.join(`
`);
    if (r.length) {
      let _3 = o2.match(/^(shared_preload_libraries\s*=\s*)(.*)$/m);
      if (_3) {
        let s2 = _3[2].split(",").map((l2) => l2.trim()), n2 = [.../* @__PURE__ */ new Set([...s2, ...r])];
        o2 = o2.replace(_3[0], `${_3[1]}${n2.join(",")}`);
      } else o2 += `
shared_preload_libraries=${r.join(",")}`;
    }
    fe(this.mod.FS, `${B}/postgresql.conf`, new TextEncoder().encode(o2));
  }
}, $e = async function(r) {
  T$1(this, x, G).call(this, `pglite: icuDataDir specified, removing default icu data dir at ${jr}`), p.rmdirRecursive(this.mod.FS, jr), T$1(this, x, G).call(this, `pglite: loading icu data from tarball ${r}`), this.mod.FS.mkdirTree(jr), await at$1(this.mod.FS, r, jr);
}, Je = function(r) {
  x$2(this, he, r.addFunction((a2) => (T$1(this, x, G).call(this, `Postgres tried to execute ${r.UTF8ToString(a2)}, returning 1.`), 1), "pi")), r._pgl_set_system_fn(h$1(this, he)), x$2(this, xe, r.addFunction((a2, o2) => {
    let _3 = r.UTF8ToString(o2), s2 = r.UTF8ToString(a2);
    return this.externalCommandStreamFd = this.handleExternalCmd(s2, _3), this.externalCommandStreamFd;
  }, "ppp")), r._pgl_set_popen_fn(h$1(this, xe)), x$2(this, we, r.addFunction((a2) => {
    if (a2 === this.externalCommandStreamFd) this.mod._fclose(this.externalCommandStreamFd), this.externalCommandStreamFd = null;
    else throw `Unhandled pclose ${a2}`;
    T$1(this, x, G).call(this, "pclose_fn", a2);
  }, "pi")), r._pgl_set_pclose_fn(h$1(this, we)), x$2(this, ce, r.addFunction((a2, o2) => {
    let _3;
    try {
      _3 = this.mod.HEAPU8.subarray(a2, a2 + o2);
    } catch (s2) {
      throw console.error("error", s2), s2;
    }
    return h$1(this, H).call(this, _3);
  }, "iii")), x$2(this, me, r.addFunction((a2, o2) => {
    let _3 = h$1(this, $).length - h$1(this, W);
    return _3 > o2 && (_3 = o2), this.mod.HEAP8.set(h$1(this, $).subarray(h$1(this, W), h$1(this, W) + _3), a2), x$2(this, W, h$1(this, W) + _3), _3;
  }, "iii")), r._pgl_set_rw_cbs(h$1(this, me), h$1(this, ce));
}, et = function(r) {
  let a2 = r.slice(), o2 = h$1(this, z) + a2.length;
  if (o2 > h$1(this, O).length) {
    let _3 = h$1(this, O).length + (h$1(this, O).length >> 1) + o2;
    o2 > N.MAX_BUFFER_SIZE && (o2 = N.MAX_BUFFER_SIZE);
    let s2 = new Uint8Array(_3);
    s2.set(h$1(this, O).subarray(0, h$1(this, z))), x$2(this, O, s2);
  }
  return h$1(this, O).set(a2, h$1(this, z)), x$2(this, z, h$1(this, z) + a2.length), T$1(this, x, qe).call(this, a2);
}, qe = function(r) {
  return h$1(this, pe).parse(r, (a2) => {
    let o2 = T$1(this, x, tt).call(this, a2);
    o2 && h$1(this, I).results.push(o2);
  }), r.length;
}, tt = function(r) {
  if (!h$1(this, I).databaseError) {
    if (r instanceof N$1) h$1(this, I).throwOnError && (h$1(this, I).databaseError = r);
    else if (r instanceof ee$1) this.debug > 0 && console.warn(r), h$1(this, I).onNotice && h$1(this, I).onNotice(r);
    else if (r instanceof J$1) {
      let a2 = h$1(this, D).get(r.channel);
      a2 && a2.forEach((o2) => {
        queueMicrotask(() => o2(r.payload));
      }), h$1(this, le).forEach((o2) => {
        queueMicrotask(() => o2(r.channel, r.payload));
      });
    }
    return r;
  }
  return null;
}, G = function(...r) {
  this.debug > 0 && console.log(...r);
}, rt = async function(r, a2, o2) {
  let _3 = p.toPostgresName(r), s2 = o2 ?? this;
  h$1(this, D).has(_3) || h$1(this, D).set(_3, /* @__PURE__ */ new Set()), h$1(this, D).get(_3).add(a2);
  try {
    await s2.exec(`LISTEN ${r}`);
  } catch (n2) {
    throw h$1(this, D).get(_3).delete(a2), h$1(this, D).get(_3)?.size === 0 && h$1(this, D).delete(_3), n2;
  }
  return async (n2) => {
    await this.unlisten(_3, a2, n2);
  };
}, at = async function(r, a2, o2) {
  let _3 = p.toPostgresName(r), s2 = o2 ?? this, n2 = async () => {
    await s2.exec(`UNLISTEN ${r}`), h$1(this, D).get(_3)?.size === 0 && h$1(this, D).delete(_3);
  };
  a2 ? (h$1(this, D).get(_3)?.delete(a2), h$1(this, D).get(_3)?.size === 0 && await n2()) : await n2();
}, ot = function() {
  if (h$1(this, ge)) throw new Error("PGlite single mode already running");
  this.mod._pgl_startPGlite(), x$2(this, ge, true);
}, _t = function(r) {
  let a2 = [...r.startParams, "-D", r.pgDataFolder, this.mod.ENV.PGDATABASE];
  if (this.mod.callMain(a2), this.mod._pgl_setPGliteExitStatus(-3) !== this.PGLITE_EXIT_ALIVE) throw new Error("PGlite failed to initialize properly");
}, st = function(r) {
  x$2(this, W, 0), x$2(this, z, 0), x$2(this, $, r);
  let a2 = this.mod._pgl_getMyProcPort();
  if (this.mod._ProcessStartupPacket(a2, true, true) !== 0) throw new Error(`Cannot process startup packet + ${r.toString()}`);
  return this.mod._pgl_sendConnData(), this.mod._pgl_pq_flush(), x$2(this, $, []), h$1(this, z) ? h$1(this, O).subarray(0, h$1(this, z)) : new Uint8Array(0);
}, N.paths = { PG_ROOT: I$1, PGDATA: B, ICU_DATA_PATH: jr, INITDB_EXE_PATH: Gr, POSTGRES_EXE_PATH: wt }, N.DEFAULT_RECV_BUF_SIZE = 1 * 1024 * 1024, N.MAX_BUFFER_SIZE = Math.pow(2, 30), N.defaultStartParams = ["--single", "-F", "-O", "-j", "-c", "search_path=public", "-c", "exit_on_error=false", "-c", "log_checkpoints=false", "-c", "max_worker_processes=0", "-c", "max_parallel_workers=0", "-c", "max_parallel_workers_per_gather=0", "-c", "io_method=sync", "-c", "max_parallel_maintenance_workers=0"];
var Ve = N;
u$1();
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  IdbFs: ve,
  MemoryFS: Ee,
  Mutex: J,
  PGlite: Ve,
  formatQuery: v,
  messages: Te$1,
  parse: gn,
  protocol: zn,
  types: yn
}, Symbol.toStringTag, { value: "Module" }));
export {
  B,
  R$1 as R,
  T$1 as T,
  U$1 as U,
  Ve$1 as V,
  We$1 as W,
  Ye$1 as Y,
  h$1 as h,
  index as i,
  u$1 as u,
  x$2 as x
};
