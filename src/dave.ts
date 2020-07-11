import * as qrcode from 'qrcode-terminal'

import WhatsApp from "./whatsapp"
import store from "./store"
import { widHelper } from "./whatsapp/helper"
import { Color } from "./utils"

const wa = new WhatsApp();

wa.connect().then(
    () => {
        console.log(`Whatsapp: ${store.name} ${store.device}`);
    }
).catch(err => console.error(err))

wa.on('qrcode', (qrContent) => {
    console.log('::qrcode please log in');
    qrcode.generate(qrContent, { small: true })
});

// wa.on('chats-loaded', () => {
//     console.log('(!) Unread chats: ', store.getUnreadChats().length)
//     store.getUnreadChats().forEach(
//         v => {
//             const lastMessage = v.getLastInMessage().message.conversation
//             // Mark All read
//             wa.markAllRead(v).then(
//                 () => handleMessage(v.jid, lastMessage)
//             )
//         }
//     )
// })

// wa.on('new-user-message', (msg) => {
//     console.log('(!) New message', msg.key.remotejid, msg.message.conversation)
//     wa.markRead(msg.key.remotejid, msg.key.id, 1).then(
//         () => handleMessage(msg.key.remotejid, msg.message && msg.message.conversation)
//     )
// })

wa.on('new-group-message', (msg) => {
    console.log(Color.y('::new-group-message'), msg.key.remotejid, msg.message.conversation)
    wa.markRead(msg.key.remotejid, msg.key.id, 1).then(
        () => handleMessage(msg.key.remotejid, msg.message && msg.message.conversation)
    )
})

function handleMessage(sender: string, message: string) {
    const regex = message ? message.trim().match(/^\/dave\s(.*)$/) : null;
    if (regex) {
        wa.sendTextMessage(sender, `*${regex.length > 1 ? regex[1] : ':D'}*`);
    }
}

// wa.connect().then(
//     () => {
//         console.log(`Whatsapp: ${store.name} ${store.device}`);
//     }
// ).catch(err => console.error(err))

// wa.on('qrcode', (qrContent) => {
//     console.log('::qrcode please log in');
//     qrcode.generate(qrContent, { small: true })
// });

// wa.on('chats-loaded', () => {
//     console.log('::chats-loaded: unread: ', store.getUnreadChats().length)
// })

// wa.on('new-user-message', (msg) => {
//     console.log(Color.y('::new-user-message'), msg.key.remotejid, msg.message.conversation)
// })
// wa.on('status-broadcast', (msg) => {
//     console.log(Color.y('::status-broadcast'), msg.key.remotejid, msg.message.conversation)
// })
// wa.on('new-group-message', (msg) => {
//     console.log(Color.y('::new-group-message'), msg.key.remotejid, msg.message.conversation)
// })

// wa.on('server-message', (data) => {
//     console.log(Color.m('::'), 'server-message', data)
// })

// wa.on('Msg', (data) => {
//     console.log(Color.m('::'), 'Msg', data)
// })

// wa.on('Presence', (data) => {
//     console.log(Color.m('::'), 'Presence', data)
// })

// wa.on('disconnect', (kind) => {
//     console.log(Color.m('::'), 'disconnect', kind)
// })

// wa.on('replaced', () => {
//     console.log(Color.m('::'), 'replaced Login in another web whatsapp')
// })

// wa.on('timeskew', (ts) => {
//     console.log(Color.m('::'), 'timeskew', ts)
// })

// wa.on('close', (code, reason) => {
//     console.log(Color.m('::'), 'close', code, reason)
// })

// wa.on('action', (attr, childs) => {
//     console.log('::action', childs[0]);
// })