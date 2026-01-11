export default `
<div id="{{id}}" class="{{styles.chat-info}}">
<div>{{#if avatar.length}}<img src="https://ya-praktikum.tech/api/v2/resources{{avatar}}" alt="chat-avatar"/>{{/if}}</div>
<span>{{text}}</span>
</div>
`;
