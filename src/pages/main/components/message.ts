export default `
<div class="{{class.message}} {{#if isMe}}{{class.right-side}}{{/if}}" data-message="{{dataset}}">
{{#unless isMe}}
<div class="{{class.author}}">{{author}}</div>
{{/unless}}
<div class="{{class.text}}">{{text}}</div>
<div class="{{class.date}}">{{date}}</div>
</div>
`;
