(function () {
    document.getElementById('vectors').addEventListener('change', set_vectors);
    document.getElementById('clear').addEventListener('click', clear_inputs);

    (function() {
        const select_box = document.getElementById('vectors');
        for (let i = 1; i < 10; ++i) {
            const option = document.createElement('option');
            option.value = i + 1;
            option.innerHTML = `${i + 1} vectors`;
            select_box.appendChild(option);
        }
    })();

    function clear_vectors() {
        const vector_div = document.getElementById('vector-area');
        vector_div.innerHTML = '';
    }

    function clear_inputs() {
        const inputs = document.getElementsByClassName('vector-input');
        for (const input of inputs) {
            input.value = '';
        }
    }

    function set_vectors(e) {
        clear_vectors();
        document.getElementById('control-buttons').style.visibility = 'visible';
        document.getElementById('solution-div').style.visibility = 'visible';
        const vector_div = document.getElementById('vector-area');
        const no_vectors = e.target.value;
        for (let i = 0; i < no_vectors; ++i) {
            const vector_name = document.createElement('p');
            vector_name.innerHTML = `(X<sub>${i + 1}</sub>)<sup>T</sup>`;
            const vector_input = document.createElement('input');
            vector_input.className = 'vector-input';
            vector_input.placeholder = 'Space-separated numbers';
            vector_div.appendChild(vector_name);
            vector_div.appendChild(vector_input);
        }
    }
})();
