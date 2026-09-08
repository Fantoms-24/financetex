import { c as createServerRpc, g as guarded } from "./session-CVdEiwDp.js";
import { c as createServerFn } from "../server.js";
import { g as getVapidPublic, s as saveSubscription, c as countSubscriptions, r as removeSubscription, a as sendToUser } from "./push-D1zq6L-q.js";
import { r as runTick } from "./tick-DtarbO-h.js";
import "./index-CJWAeYEQ.js";
import "node:module";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:util";
import "buffer";
import "url";
import "https";
import "net";
import "tls";
import "assert";
import "http";
import "./format-I651YhAt.js";
const vapidPublic_createServerFn_handler = createServerRpc({
  id: "c3215adfb5f9865a2a2c93996e0ccafa7e4497bfbfbc793f5b1b8ccf3a775460",
  name: "vapidPublic",
  filename: "src/server/functions/push.ts"
}, (opts) => vapidPublic.__executeServer(opts));
const vapidPublic = createServerFn({
  method: "GET"
}).handler(vapidPublic_createServerFn_handler, async () => {
  try {
    return {
      publicKey: await getVapidPublic()
    };
  } catch {
    return {
      publicKey: ""
    };
  }
});
const pushSubscribe_createServerFn_handler = createServerRpc({
  id: "61b29505e69ceff365c03b7aac1f6465a099e1a3563c1a7a5b228cf4bc4ea13e",
  name: "pushSubscribe",
  filename: "src/server/functions/push.ts"
}, (opts) => pushSubscribe.__executeServer(opts));
const pushSubscribe = createServerFn({
  method: "POST"
}).validator((d) => ({
  endpoint: String(d.endpoint || ""),
  p256dh: String(d.p256dh || ""),
  auth: String(d.auth || "")
})).handler(pushSubscribe_createServerFn_handler, async ({
  data
}) => guarded(async (user) => {
  if (!data.endpoint || !data.p256dh) {
    return {
      error: "Нет подписки"
    };
  }
  await saveSubscription(user.id, {
    endpoint: data.endpoint,
    keys: {
      p256dh: data.p256dh,
      auth: data.auth
    }
  });
  return {
    ok: true,
    devices: await countSubscriptions(user.id)
  };
}));
const pushUnsubscribe_createServerFn_handler = createServerRpc({
  id: "fc8a052b4119b198184206cb5264c457302d7d7d0a1dec123bbb2a3b69f97c9c",
  name: "pushUnsubscribe",
  filename: "src/server/functions/push.ts"
}, (opts) => pushUnsubscribe.__executeServer(opts));
const pushUnsubscribe = createServerFn({
  method: "POST"
}).validator((d) => ({
  endpoint: String(d.endpoint || "")
})).handler(pushUnsubscribe_createServerFn_handler, async ({
  data
}) => guarded(async (user) => {
  if (data.endpoint) await removeSubscription(data.endpoint);
  return {
    ok: true,
    devices: await countSubscriptions(user.id)
  };
}));
const pushTest_createServerFn_handler = createServerRpc({
  id: "1d60935b5556c72b74df1f55a49c0f78c43950034b68b091a8fd79c0c715679e",
  name: "pushTest",
  filename: "src/server/functions/push.ts"
}, (opts) => pushTest.__executeServer(opts));
const pushTest = createServerFn({
  method: "POST"
}).handler(pushTest_createServerFn_handler, async () => guarded(async (user) => {
  const devices = await countSubscriptions(user.id);
  if (!devices) {
    return {
      ok: false,
      devices: 0,
      error: "Устройств в канале нет. Включите уведомления"
    };
  }
  const res = await sendToUser(user.id, {
    title: "ЧекАгент",
    body: "Проверка связи. Баннер должен дойти даже с выключенным экраном",
    data: {
      url: "/settings",
      type: "test"
    }
  });
  return {
    ok: res.sent > 0,
    sent: res.sent,
    failed: res.failed,
    devices,
    error: res.error
  };
}));
const tickBills_createServerFn_handler = createServerRpc({
  id: "6c22994192b1411130406524d62041368b9cf2312e40b099e2c69a47957148ac",
  name: "tickBills",
  filename: "src/server/functions/push.ts"
}, (opts) => tickBills.__executeServer(opts));
const tickBills = createServerFn({
  method: "POST"
}).handler(tickBills_createServerFn_handler, async () => guarded(async () => {
  const res = await runTick();
  return {
    ok: true,
    ...res
  };
}));
export {
  pushSubscribe_createServerFn_handler,
  pushTest_createServerFn_handler,
  pushUnsubscribe_createServerFn_handler,
  tickBills_createServerFn_handler,
  vapidPublic_createServerFn_handler
};
