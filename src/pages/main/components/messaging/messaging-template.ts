export default `
<div class="{{class.messages}}">
{{{ markup.main-messaging-header }}}
<main class="{{class.main}}">
{{#if messages.length}}
{{{ markup.components-list }}}
{{else}}
Сообщений пока нет...
{{/if}}
</main>
{{{ markup.main-messaging-footer }}}
</div>
`;
