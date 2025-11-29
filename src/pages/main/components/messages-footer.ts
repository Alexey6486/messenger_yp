export default `
<footer class="{{class.footer}}">
{{>
DropDown
    id=(lookup @root.ddBottom 'id')
    dataset=(lookup @root.ddBottom 'dataset')
    options=(lookup @root.ddBottom 'options')
    direction=(lookup @root.ddBottom 'direction')
    icon=(lookup @root.ddBottom 'icon')
}}
<form id="{{formId}}" class="{{class.message-form}}">
<input id="message-input" name="message" class="{{class.message-input}}" type="text" value="{{message}}" placeholder="Сообщение" />
{{>
ButtonRound
    id=submit.id
    dataset=submit.dataset
    type="submit"
    partialName=submit.icon.partialName
    partialType=submit.icon.partialType
}}
</form>
</footer>
`;
