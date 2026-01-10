export default `
<div class="{{styles.chat-info}}" id="{{id}}">

<div>{{#if currentChatData.info.avatar.length}}<img src="{{avatar}}" alt="chat-avatar"/>{{/if}}</div>

<div>{{currentChatData.info.title}}</div>

{{{ markup.modal-chat-info-users }}}

</div>
`;
