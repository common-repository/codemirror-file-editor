(function () {
    var requireJsConfig = cmfe.requireJsConfig,
        codeMirrorConfig = cmfe.codeMirrorConfig,
        scripts = cmfe.scripts;

    codeMirrorConfig.extraKeys = {
        'Ctrl-Space': 'autocomplete',
        'Esc': function (cm) {
            if (cm.getOption('fullScreen'))
                cm.setOption('fullScreen', false);
        },
        'F11': function (cm) {
            cm.setOption('fullScreen', !cm.getOption('fullScreen'));
        }
    };

    require.config(requireJsConfig);

    require(scripts, function (CodeMirror) {
        var textarea = document.getElementById('newcontent'),
            height = textarea.offsetHeight,
            template = document.getElementById('template'),
            wrapper = document.createElement('div'),
            scrollto = document.getElementById('scrollto'),
            cm = CodeMirror.fromTextArea(textarea, codeMirrorConfig);

        wrapper.className = 'cmfe-wrapper';
        wrapper.appendChild(cm.getWrapperElement());
        template.parentNode.insertBefore(wrapper, template);

        template.addEventListener('submit', function () {
            scrollto.value = cm.getScrollInfo().top;
        });

        cm.setSize(null, height);
        cm.refresh();
        cm.scrollTo(0, scrollto.value);
    });
})();