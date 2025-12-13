export default `
<a
id="{{id}}"
class="{{class}}"
href="{{href}}"
aria-label="{{ariaLabel}}"
title="{{tooltip}}"
target="{{target}}"
rel="{{rel}}"
{{#if isDownload}}download{{/if}}
>
{{text}}
</a>
`;
