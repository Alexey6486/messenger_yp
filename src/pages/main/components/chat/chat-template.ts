export default `
<li id="{{id}}" class="{{styles.chat}} {{#if isActive}}{{styles.active}}{{/if}}">
<div class="{{styles.img}}">{{#if avatar.length}}<img src="/api/v2/resources{{avatar}}" alt="chat-avatar"/>{{/if}}</div>
<div class="{{styles.block}}">
<div class="{{styles.info}}"><div class="{{styles.title}}">{{title}}</div><div class="{{styles.date}}">{{date}}</div></div>
<div class="{{styles.text}}">{{text}}</div>
</div>
<div class="{{styles.counter}}">{{counter}}</div>
</li>
`;
