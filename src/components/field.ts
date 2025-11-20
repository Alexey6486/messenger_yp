export default `
<div class="field {{class}}" id="{{id}}">
<label for="{{id}}_label" class="{{#if value.length}}visible{{/if}}">{{label}}</label>
<input id="{{id}}_label" type="{{type}}" placeholder="{{placeholder}}" value="{{value}}" data-input="{{dataset}}">
<span>{{error}}</span>
</div>
`;
