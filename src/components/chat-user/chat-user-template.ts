export default `
<div id="{{id}}" class="chat-user{{#if class}} {{class}}{{/if}}">

{{#if avatar}}
<img src="{{baseUrl}}{{avatar}}" alt="user avatar">
{{/if}}

{{#unless avatar}}
<div>{{text}}</div>
{{/unless}}

<span>{{name}}</span>

{{#if isAdd}}
{{{markup.chat-user-add}}}
{{/if}}

{{#if isRemove}}
{{{markup.chat-user-remove}}}
{{/if}}

</div>
`;
