const start = async () => {
    function waitForElm(selector) {
        return new Promise(resolve => {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector));
            }

            const observer = new MutationObserver(mutations => {
                if (document.querySelector(selector)) {
                    observer.disconnect();
                    resolve(document.querySelector(selector));
                }
            });

            // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }

    let visibleToAllSelected = true;
    const commentBox = await waitForElm('#fullscreen-modal-container > div > main > div > div.task-form-page__main > div.task-form-page__content > div.activity-form.organization-project-tasks-task-2-route__activity-form.js-organization-project-tasks-task-2-route-activity-form > form > div.comment-field.is-avatar-shown.activity-form__comment-field > div.comment-field__text-field-container.js-comment-field-text-field-container > div > div > div > div.trix-editor-wrapper > trix-editor');

    commentBox.addEventListener('click', async () => {
        const visibilityToggleButton = await waitForElm('#fullscreen-modal-container > div > main > div > div.task-form-page__main > div.task-form-page__content > div.activity-form.is-field-initially-focused.organization-project-tasks-task-2-route__activity-form.js-organization-project-tasks-task-2-route-activity-form > form > div.activity-form__actions-wrapper > button');

        if (visibleToAllSelected) {
            visibilityToggleButton.click();
            const hideFromClientButton = await waitForElm('#modal-container > div > div.popover-content__body-wrapper > div > div > div > button:nth-child(2)');
            hideFromClientButton.click();

            visibleToAllSelected = false;
        }
    });

    const commentBtn = await waitForElm('#fullscreen-modal-container > div > main > div > div.task-form-page__main > div.task-form-page__content > div.activity-form.is-field-initially-focused.organization-project-tasks-task-2-route__activity-form.js-organization-project-tasks-task-2-route-activity-form > form > div.activity-form__actions-wrapper > div.form-actions.form__actions.activity-form__actions > button');

    commentBtn.addEventListener('click', async () => {
        visibleToAllSelected = true;
    });

}

chrome.runtime.onMessage.addListener((request) => {
    console.log(request);
    start();
});

start();