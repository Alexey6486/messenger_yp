export default `
<div class="{{styles.modal-chat-info}}" id="{{id}}">

<div class="avatar {{styles.modal-chat-info-avatar}}">
<div class="avatar-image">
{{{ markup.modal-chat-avatar }}}
<div class="avatar-mask">
Поменять аватар
</div>
{{#if currentChatData.info.avatar.length}}
<img src="{{baseUrl}}{{currentChatData.info.avatar}}" alt="avatar"/>
{{/if}}
</div>
</div>

<div class="{{styles.modal-chat-info-title}}">{{currentChatData.info.title}}</div>

<div class="{{styles.modal-ul-list}}">
{{{ markup.modal-chat-info-users }}}
</div>

<div class="{{styles.modal-chat-remove}}">
{{{ markup.modal-chat-remove }}}
</div>

</div>
`;
