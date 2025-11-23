export default `
<div id="{{id}}" class="{{class}}">
<div>{{#if avatar.length}}<img src="{{avatar}}" alt="chat-avatar"/>{{/if}}</div>
<div>
<div>
<div>{{title}}</div>
<div>{{data}}</div>
</div>
<div>{{text}}</div>
</div>
<div>{{counter}}</div>
</div>
`;
