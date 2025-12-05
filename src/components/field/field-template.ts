export default `
<div class="field{{#if class}} {{class}}{{/if}}" id="{{id}}">
<label for="{{id}}_label" class="{{#if value.length}}visible{{/if}}">{{label}}</label>
<input id="{{id}}_label" name="{{name}}" type="{{type}}" placeholder="{{placeholder}}" value="{{value}}" data-input="{{dataset}}">
<span>{{error}}</span>
<span>
value length: {{value.length}}
value text: {{value}}
</span>
</div>
`;
