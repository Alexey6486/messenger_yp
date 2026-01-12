export default `
<div id="{{id}}" class="{{styles.chat-info}}">
<div>{{#if avatar.length}}<img src="{{baseUrl}}{{avatar}}" alt="chat-avatar"/>{{/if}}</div>
<span>{{text}}</span>
</div>
`;
