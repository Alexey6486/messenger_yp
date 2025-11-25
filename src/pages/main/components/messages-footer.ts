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
    <form class="{{class.message-form}}">
        <input id="message-input" class="{{class.message-input}}" type="text" value="{{message}}" placeholder="Сообщение" />
   </form>
    {{>
    ButtonRound
        id=submit.id
        type=submit.type
        icon=submit.icon
    }}
</div>
`;
