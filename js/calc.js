(function () {
    document.getElementById('calculate').addEventListener('click', calculate);
    document.getElementById('clear').addEventListener('click', clear_solution);
    document.getElementById('vectors').addEventListener('change', clear_solution);

    function get_number_array(input) {
        const splitted = input.value.replaceAll(' + ', '+').replace(' - ', '-').split(' ');
        const filtered = [];
        for (let i = 0; i < splitted.length; ++i) {
            splitted[i] = splitted[i]
                .split('')
                .filter((x) => x.match(/\d|i|\.|\+|-/g))
                .join('');
            try {
                math.evaluate(splitted[i]);
                filtered.push(splitted[i]);
            } catch (e) {}
        }
        return filtered.filter((x) => x !== '');
    }

    function get_gram_vector(vectors, gram_vectors, current_vector) {
        const base = math.evaluate(`[${vectors[current_vector]}]`);
        if (current_vector === 0) {
            return base;
        }
        let value = base;
        for (let i = 1; i <= current_vector; ++i) {
            const op = gram_vectors[current_vector - i];
            value = math.evaluate(
                `${value} - (${math.dot(op, base)} / ${math.dot(op, op)}) * ${op}`
            );
        }
        return value;
    }

    function place_gram_vectors(gram_vectors) {
        const solution_div = document.getElementById('solution-div');
        for (let i = 0; i < gram_vectors.length; ++i) {
            const sol = document.createElement('p');
            const vectors_str = gram_vectors[i]
                .map((x) => math.round(x, 4).toString())
                ._data.join(', ');
            sol.innerHTML = `(Y<sub>${i + 1}</sub>)<sup>T</sup> = [${vectors_str}]`;
            solution_div.appendChild(sol);
        }
    }

    function place_error_message() {
        const solution_div = document.getElementById('solution-div');
        const error = document.createElement('p');
        error.innerHTML = 'Invalid vectors';
        solution_div.appendChild(error);
    }

    function clear_solution() {
        const solution_div = document.getElementById('solution-div');
        solution_div.innerHTML = '';
    }

    function check_vectors_validity(vectors) {
        if (
            vectors.some((x) => x._data.some((o) => math.isNaN(o))) ||
            vectors.some((v) => v._data.every((e) => math.round(e, 12) === 0))
        ) {
            console.log(vectors);
            return false;
        }
        return true;
    }

    function calculate() {
        clear_solution();
        const vectors = [];
        const inputs = document.getElementsByClassName('vector-input');
        for (const input of inputs) {
            vectors.push(get_number_array(input));
        }
        const size = vectors[0].length;
        for (const vector of vectors) {
            if (vector.length === 0) {
                return;
            }
            if (vector.length !== size) {
                return place_error_message();
            }
        }
        const gram_vectors = [];
        for (let i = 0; i < vectors.length; ++i) {
            gram_vectors.push(get_gram_vector(vectors, gram_vectors, i));
        }
        if (!check_vectors_validity(gram_vectors)) {
            return place_error_message();
        }
        place_gram_vectors(gram_vectors);
    }
})();
