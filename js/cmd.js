// cmd.js - Xử lý lưu lệnh terminal và giao diện


document.addEventListener('DOMContentLoaded', function() {
    const saveBtn = document.getElementById('cmd-save-btn');
    const textarea = document.getElementById('cmd-textarea');
    const status = document.getElementById('cmd-status');
    const commandContainer = document.querySelector('.command-container');

    setupCopyCode(commandContainer);
    loadCommandData(textarea, commandContainer);

    if (!window.localSaveEnabled) {
        if (saveBtn) saveBtn.style.display = 'none';
        if (status) status.style.display = 'none';
        return;
    }

    if (!saveBtn || !textarea || !status) return;

    saveBtn.addEventListener('click', async function() {
        const value = textarea.value;
        try {
            const res = await fetch('../data/save_cmd.php', {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain' },
                body: value
            });
            if (res.ok) {
                status.textContent = 'Đã lưu!';
                status.style.color = '#38bdf8';
                setTimeout(() => status.textContent = '', 2000);
            } else {
                status.textContent = 'Lỗi khi lưu!';
                status.style.color = 'red';
            }
        } catch (e) {
            status.textContent = 'Lỗi khi lưu!';
            status.style.color = 'red';
        }
    });
});

async function loadCommandData(textarea, container) {
    try {
        const res = await fetch('../data/cmd.txt', { cache: 'no-store' });
        if (!res.ok) return;

        const text = await res.text();
        if (textarea && !textarea.value.trim()) {
            textarea.value = text.trim();
        }

        if (!container) return;

        const commands = parseCommandText(text);
        if (commands.length === 0) return;

        container.innerHTML = '';
        commands.forEach(command => {
            container.appendChild(createCommandCard(command));
        });
        addCopyButtons(container);
    } catch (error) {
        console.warn('Khong doc duoc file cmd.txt:', error);
        addCopyButtons(container);
    }
}

function parseCommandText(text) {
    const lines = text.split(/\r?\n/);
    const commands = [];
    let currentCommand = null;

    lines.forEach(line => {
        const value = line.trim();
        if (!value) return;

        if (value.startsWith('-->')) {
            if (currentCommand) commands.push(currentCommand);
            currentCommand = parseCommandTitle(value);
            return;
        }

        if (value.startsWith('git') && currentCommand) {
            currentCommand.codeLines.push(value);
        }
    });

    if (currentCommand) commands.push(currentCommand);
    return commands.filter(command => command.title && command.codeLines.length > 0);
}

function parseCommandTitle(line) {
    const content = line.replace(/^-->\s*/, '');
    const descriptionMatch = content.match(/\(([^)]*)\)/);
    const title = content.split('(')[0].trim();

    return {
        title,
        description: descriptionMatch ? descriptionMatch[1].trim() : '',
        codeLines: []
    };
}

function createCommandCard(command) {
    const card = document.createElement('div');
    card.className = 'command-card';

    const title = document.createElement('h2');
    title.textContent = command.title;

    const codeBox = document.createElement('div');
    codeBox.className = 'code-box';
    codeBox.dataset.code = command.codeLines.join('\n');
    command.codeLines.forEach((codeLine, index) => {
        if (index > 0) {
            codeBox.appendChild(document.createElement('br'));
            codeBox.appendChild(document.createElement('br'));
        }
        codeBox.appendChild(document.createTextNode(codeLine));
    });

    const description = document.createElement('p');
    description.textContent = command.description;

    card.appendChild(title);
    card.appendChild(codeBox);
    card.appendChild(description);

    return card;
}

function setupCopyCode(container) {
    if (!container) return;

    addCopyButtons(container);

    container.addEventListener('click', async function(event) {
        const button = event.target.closest('.copy-code-btn');
        if (!button) return;

        const codeBox = button.closest('.code-box');
        if (!codeBox) return;

        const code = codeBox.dataset.code || getCodeBoxText(codeBox);
        const copied = await copyText(code);

        button.textContent = copied ? 'Đã copy' : 'Lỗi';
        button.classList.toggle('copied', copied);

        setTimeout(() => {
            button.textContent = 'Copy';
            button.classList.remove('copied');
        }, 1400);
    });
}

function addCopyButtons(container) {
    if (!container) return;

    container.querySelectorAll('.code-box').forEach(codeBox => {
        if (!codeBox.dataset.code) {
            codeBox.dataset.code = getCodeBoxText(codeBox);
        }

        if (codeBox.querySelector('.copy-code-btn')) return;

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'copy-code-btn';
        button.textContent = 'Copy';
        button.setAttribute('aria-label', 'Copy command');
        codeBox.appendChild(button);
    });
}

function getCodeBoxText(codeBox) {
    return Array.from(codeBox.childNodes)
        .filter(node => !(node.classList && node.classList.contains('copy-code-btn')))
        .map(node => node.innerText || node.textContent || '')
        .join('')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

async function copyText(text) {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return true;
        }

        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        const copied = document.execCommand('copy');
        document.body.removeChild(textarea);
        return copied;
    } catch (error) {
        console.warn('Khong copy duoc command:', error);
        return false;
    }
}
