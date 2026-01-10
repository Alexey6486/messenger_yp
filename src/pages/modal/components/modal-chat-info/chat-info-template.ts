export default `
<div class="{{styles.chat-info}}" id="{{id}}">

<div class="avatar {{styles.chat-info-avatar}}">
<div class="avatar-image">
{{{ markup.modal-chat-avatar }}}
<div class="avatar-mask">
Поменять аватар
</div>
{{#if currentChatData.info.avatar.length}}
<img src="/api/v2/resources{{currentChatData.info.avatar}}" alt="avatar"/>
{{/if}}
</div>
</div>

<div class="{{styles.chat-info-title}}">{{currentChatData.info.title}}</div>

<div class="{{styles.modal-ul-list}}">
{{{ markup.modal-chat-info-users }}}
</div>

</div>
`;
