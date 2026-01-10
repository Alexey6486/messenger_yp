export default `
<div class="{{styles.chat-info}}" id="{{id}}">

<div>{{#if currentChatData.info.avatar.length}}<img src="{{avatar}}" alt="chat-avatar"/>{{/if}}</div>

<div>{{currentChatData.info.title}}</div>

<div class="{{styles.modal-ul-list}}" id="{{id}}">
{{{ markup.modal-chat-info-users }}}
</div>

</div>
`;
