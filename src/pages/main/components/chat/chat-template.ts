export default `
<li id="{{id}}" class="{{class.chat}} {{#if isActive}}{{class.active}}{{/if}}">
<div class="{{class.img}}">{{#if avatar.length}}<img src="{{avatar}}" alt="chat-avatar"/>{{/if}}</div>
<div class="{{class.block}}">
<div class="{{class.info}}"><div class="{{class.title}}">{{title}}</div><div class="{{class.date}}">{{data}}</div></div>
<div class="{{class.text}}">{{text}}</div>
</div>
<div class="{{class.counter}}">{{counter}}</div>
</li>
`;
