import WhatsApp from "./whatsapp";
import { Color, L } from "./utils";
import store from "./store";
import * as qrcode from 'qrcode-terminal'

///@ts-ignore
global.L = console.log
///@ts-ignore
global.E = console.error

const wa = new WhatsApp();
wa.connect().then(
    info => {
        L('Connected to whatsapp:', Color.y(`${store.name} ${store.device}`));
    }
).catch(err => console.error(err))

wa.on('qrcode', (qrContent) => {
	L('::qrcode please log in');
	qrcode.generate(qrContent, { small: true })
});

wa.on('chats-loaded', () => {
    L('::chats-loaded: unread: ', store.getUnreadChats().length)
})

wa.on('new-user-message', (msg) => {
    L(Color.y('::new-user-message'), msg.key.remotejid, msg.message.conversation)
})
wa.on('status-broadcast', (msg) => {
    L(Color.y('::status-broadcast'), msg.key.remotejid, msg.message.conversation)
})
wa.on('new-group-message', (msg) => {
    L(Color.y('::new-group-message'), msg.key.remotejid, msg.message.conversation)
})

wa.on('server-message', (data) => {
    L(Color.m('::'), 'server-message', data)
})

wa.on('Msg', (data) => {
    L(Color.m('::'), 'Msg', data)
})

wa.on('Presence', (data) => {
    L(Color.m('::'), 'Presence', data)
})

wa.on('disconnect', (kind) => {
    L(Color.m('::'), 'disconnect', kind)
})

wa.on('replaced', () => {
    L(Color.m('::'), 'replaced Login in another web whatsapp')
})

wa.on('timeskew', (ts) => {
    L(Color.m('::'), 'timeskew', ts)
})

wa.on('close', (code, reason) => {
    L(Color.m('::'), 'close', code, reason)
})

wa.on('action', (attr, childs) => {
    console.log('::action', childs[0]);
})
