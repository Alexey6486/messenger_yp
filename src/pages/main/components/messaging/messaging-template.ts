export default `
<div class="{{styles.messages}}">
{{{ markup.main-messaging-header }}}
<main class="{{styles.main}}">
{{#if messages.length}}
{{{ markup.main-messaging-block }}}
{{else}}
Сообщений пока нет...
{{/if}}
</main>
{{{ markup.main-messaging-footer }}}
</div>
`;
