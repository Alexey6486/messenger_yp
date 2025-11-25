export default `
<div class="{{class.footer}}">
    {{>
    DropDown
        id=(lookup @root.ddBottom 'id')
        dataset=(lookup @root.ddBottom 'dataset')
        buttonText=(lookup @root.ddBottom 'buttonText')
        options=(lookup @root.ddBottom 'options')
        direction=(lookup @root.ddBottom 'direction')
        icon=(lookup @root.ddBottom 'icon')
    }}
</div>
`;
