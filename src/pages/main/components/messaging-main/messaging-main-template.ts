export default `
<div id="{{id}}" class="{{styles.message}} {{#if isMe}}{{styles.right-side}}{{/if}}">
{{#unless isMe}}
<div class="{{styles.author}}">{{author}}</div>
{{/unless}}
<div class="{{styles.text}}">{{text}}</div>
<div class="{{styles.date}}">{{date}}</div>
</div>
`;
