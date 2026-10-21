//
// Enums
//

const
    eSource = Enum(
        'Voice',
        'Percussion',
        'String',
        'Wind'
    );


//
// Consts
//

// Note data
const
    _OCTAVE_freq = 12,
    _FREQ_BASE = 440,
    _NOTE_FREQ_BASE = 'A4',
    _NOTE_LOWEST = 'C0';
_NOTE_MIDDLE = 'C4';
const
    NOTE_NUM_INIT = noteToNum(_NOTE_LOWEST, true),
    NOTE_NUM_MID = noteToNum(_NOTE_MIDDLE),
    FREQ_INTERVAL = Math.pow(2, 1 / _OCTAVE_freq),
    FREQ_INIT = _FREQ_BASE / FREQ_INTERVAL ** noteToNum(_NOTE_FREQ_BASE)
SPEED_SOUND = 343;

// UI
const
    NOTE_COUNT = 109,
    INTERVAL_LABELS = [
        'Semitone / Minor 2<sup>nd</sup>',
        'Whole tone / Major 2<sup>nd</sup>',
        'Minor 3<sup>rd</sup>',
        'Major 3<sup>rd</sup>',
        'Perfect 4<sup>th</sup>',
        'Augmented 4<sup>th</sup> / Diminished 5<sup>th</sup>',
        'Perfect 5<sup>th</sub>',
        'Minor 6<sup>th</sup>',
        'Major 6<sup>th</sup>',
        'Minor 7<sup>th</sup>',
        'Major 7<sup>th</sup>',
        'Octave',
        'Minor 9<sup>th</sup>',
        'Major 9<sup>th</sup>',
        'Minor 10<sup>th</sup>',
        'Major 10<sup>th</sup>',
        'Perfect 11<sup>th</sup>',
        '',
        'Perfect 12<sup>th</sup>',
        'Minor 13<sup>th</sup>',
        'Major 13<sup>th</sup>',
        'Minor 14<sup>th</sup>',
        'Major 14<sup>th</sup>'
    ],
    CLEFS = [
        ['Treble', 'F5', true, './svg/clef_treble.svg', -0.65, 4.6],
        ['Alto', 'G4', false, './svg/clef_alto.svg', 0.2, 2.7],
        ['Bass', 'A3', true, './svg/clef_bass.svg', 0.2, 2.8]
    ].map(n => ({
        labe: n[0],
        noteNum: noteToNum(n[1]),
        showStaff: n[2],
        imgSrc: n[3],
        imgY: n[4],
        imgH: n[5],
        y: 0
    }));

// Source Data
const
    SOURCES = [
        ["Coloratura Soprano", "C4", 31, eSource.Voice],
        ["Mezzo Soprano", "B3", 22, eSource.Voice],
        ["Alto", "F3", 25, eSource.Voice],
        ["Tenor", "C3", 25, eSource.Voice],
        ["Baritone", "A2", 22, eSource.Voice],
        ["Bass", "E2", 25, eSource.Voice],
        ["Celeste", "C4", 27, eSource.Percussion],
        ["Tubular Chimes", "E3", 28, eSource.Percussion],
        ["Timpani", "E2", 16, eSource.Percussion],
        ["Calliope", "C4", 32, eSource.Percussion],
        ["Violin", "G3", 46, eSource.String],
        ["Viola", "C3", 41, eSource.String],
        ["Cello", "C2", 41, eSource.String],
        ["Bass Viola", "C1", 46, eSource.String],
        ["Harp", "B0", 82, eSource.String],
        ["Piano", "A0", 88, eSource.String],
        ["Piccolo", "D5", 35, eSource.Wind],
        ["Flute", "C4", 39, eSource.Wind],
        ["Oboe", "Bb3", 34, eSource.Wind],
        ["Soprano Saxophone", "Ab3", 42, eSource.Wind],
        ["Clarinet", "G3", 40, eSource.Wind],
        ["Trumpet", "E3", 33, eSource.Wind],
        ["English Horn", "E3", 31, eSource.Wind],
        ["French Horn", "A2", 33, eSource.Wind],
        ["Bass Clarinet", "Db2", 40, eSource.Wind],
        ["Bass Trombone", "B1", 31, eSource.Wind],
        ["Bassoon", "Bb1", 42, eSource.Wind],
        ["Bass Saxaphone", "Bb1", 28, eSource.Wind],
        ["Tuba", "E1", 36, eSource.Wind],
        ["Double Basson", "Bb0", 32, eSource.Wind],
        ["Pipe Organ", "C0", 109, eSource.Wind],
    ]
        .map(s => ({
            name: s[0],
            noteNum: noteToNum(s[1]),
            noteFrom: s[1],
            noteTo: numToNote(noteToNum(s[1]) + s[2] - 1, true),
            range: s[2],
            type: s[3]
        }))
        .sort((a, b) => (a.type - b.type) || (b.noteNum - a.noteNum));


//
// Util functions
//

function Enum(...props) {
    return Object.fromEntries([
        ...props.map((p, pi) => [p, pi]),
        ...props.map((p, pi) => [pi, p]),
        ['length', props.length],
        [
            'toArray',
            () => new Array(props.length)
                .fill(0)
                .map((_, i) => i)
        ]
    ]);
}

function noteToNum(note, calcInit = false) {
    let num = note.toLowerCase().charCodeAt(0) - 97;
    num = (num * 2) - (num > 4 ? 2 : num > 1 ? 1 : 0);
    return num +
        (num < 3 ? 9 : -3) +
        (note.match(/#/g)?.length || 0) -
        (note.match(/b/g)?.length || 0) +
        (12 * parseInt(note.match(/-?[0-9]+/) || 4)) -
        (calcInit ? 0 : NOTE_NUM_INIT)
}

function numToNote(num, showSharp = false, hideOctave = false) {
    num += NOTE_NUM_INIT;
    const NOTE =
        [
            'C', 'C#',
            'D', 'D#',
            'E',
            'F', 'F#',
            'G', 'G#',
            'A', 'A#',
            'B'
        ][((num % 12) + 12) % 12] +
        (hideOctave ? '' : Math.floor(num / 12));
    return showSharp || NOTE.indexOf('#') == -1 ? NOTE : '';
}

function isSharp(num) {
    return !numToNote(num);
}

function isC(num) {
    return numToNote(num, false, true) === 'C';
}

function noteNumToFreq(num) {
    return FREQ_INIT * FREQ_INTERVAL ** num;
}

function noteNumTofreq(num, isPercus = false, isClosed = false) {
    const FREQ = noteNumToFreq(num);
    return isPercus
        ? numToHTML(100 / Math.sqrt(FREQ))
        : numToHTML(100 * SPEED_SOUND / (FREQ * (isClosed ? 4 : 2)));

}

function noteToHTML(note) {
    if (typeof note === 'number') {
        note = numToNote(note);
    }
    return note.replace(
        /([A-G])([b#]?)([0-9\-]+)/,
        (_, g0, g1, g2) => g0 +
            g1
                .replace('b', '<span class="symbol__flat">♭</span>')
                .replace('#', '♯') +
            `<sub>${g2}</sub>`
    );
}

function numToHTML(num, maxDigits = 3, hideDecimal = false) {
    let
        str = '',
        decI;
    if (hideDecimal) {
        str += Math.floor(num);
        decI = str.length;
    } else {
        str += num >= 10 ** maxDigits
            ? Math.round(num)
            : num.toPrecision(maxDigits);
        decI = str.indexOf('.') === -1 ? str.length : str.indexOf('.');
    }
    for (let i = decI - 3; i > 0; i -= 3) {
        str = str.substring(0, i) + ' ' + str.substring(i);
    }
    return str;
}


//
// Render functions
//

function render() {
    addSources(document.querySelector('.sources'));
    addFreqs(document.querySelector('.freqs'));
    addKeys(document.querySelector('.keys'));
    addFifths(document.querySelector('.fifths'));
    addInters(document.querySelector('.inters'));
    addStaff(document.querySelector('.staff'));
}

function addSources(parentEl) {
    parentEl.innerHTML = eSource
        .toArray()
        .reduce((eHtm, type) => eHtm + `
            <div class="sources__type">
                <u class="sources__type-label">
                    ${eSource[type]}
                </u>
                ${SOURCES
                .filter(s => s.type === type)
                .reduce((sHtm, s) => sHtm + `
                            <span
                                class="
                                    sources__source
                                    ${s.name === 'Piccolo' ||
                        s.name === 'Calliope' ||
                        s.name === 'Oboe'
                        ? 'sources__source--break'
                        : ''
                    }
                                "
                                style="
                                    --source-offset: ${s.noteNum};
                                    --source-width: ${s.range};
                                    ${s.name === 'Calliope'
                        ? '--source-top: 2'
                        : s.name === 'Piccolo'
                            ? '--source-top: 10'
                            : s.name === 'Oboe'
                                ? '--source-top: 11'
                                : ''
                    }
                                "
                            >
                                <span class="sources__source-label">
                                    ${s.name}
                                </span>
                                <span class="sources__source-label">
                                    ${noteToHTML(s.noteFrom)} &mdash;
                                    ${noteToHTML(s.noteTo)} &nbsp;
                                    ${s.range} notes
                                </span>
                            </span>
                        `, '')
            }
            </div>
        `, '')
}

function addFreqs(parentEl) {
    parentEl.innerHTML = `
        <div>
            <u>Open pipe length &nbsp; <i>cm</i></u>
        </div>
        <div class="freqs__contain">
            ${new Array(NOTE_COUNT)
            .fill('')
            .map((_, n) => `<span class="freqs__freq">${noteNumTofreq(n, false, false)
                }</span>`)
            .join('')
        }
        </div>
        <div>
            <u>Closed pipe length &nbsp; <i>cm</i></u>
        </div>
        <div class="freqs__contain">
            ${new Array(NOTE_COUNT)
            .fill('')
            .map((_, n) => `<span class="freqs__freq">${noteNumTofreq(n, false, true)
                }</span>`)
            .join('')
        }
        </div>
        <div>
            <u>Idiophone length &nbsp; <i>cm / &radic; K</i></u> &nbsp; <i> where K is elastic constant of material </i>
        </div>
        <div class="freqs__contain">
            ${new Array(NOTE_COUNT)
            .fill('')
            .map((_, n) => `<span class="freqs__freq">${noteNumTofreq(n, true)
                }</span>`)
            .join('')
        }
        </div>
        <div>
            <u>Frequency &nbsp; <i>Hz</i></u> &nbsp; <i> for 440 equal temperment tuning </i>
        </div>
        <div class="freqs__contain">
            ${new Array(NOTE_COUNT)
            .fill('')
            .map((_, n) => {
                const F = numToHTML(noteNumToFreq(n));
                return `
                            <span class="
                                freqs__freq
                                ${F === '440' ? 'freqs__freq--base' : ''}
                            ">
                                ${F}
                            </span>`
            })
            .join('')
        }
        </div>
    `
}

function addKeys(parentEl) {
    for (let i = 0; i < NOTE_COUNT; i++) {
        const EL = document.createElement('span');
        EL.classList.add('keys__key');
        const CENTS = (i - NOTE_NUM_MID) * 100;
        if (CENTS >= -100 && CENTS < 2400) {
            EL.innerHTML +=
                `<span class="keys__key-cents">
                    ${CENTS === -100
                    ? 'Cents'
                    : numToHTML(CENTS, 0, true)
                }
                </span>`;
        }
        if (![1, 3, 6, 8, 10].includes(i % 12)) {
            EL.innerHTML +=
                `<span class="keys__key-label">${numToNote(i, false, true) === 'C'
                    ? `<b>${noteToHTML(i)}</b>`
                    : noteToHTML(i)
                }</span>`;
        }
        parentEl.appendChild(EL);
    }
}

function addFifths(parentEl) {
    const FIRST_NOTE_NUM = noteToNum('F' + _NOTE_LOWEST[1])
    parentEl.style.setProperty('--fifths-left', FIRST_NOTE_NUM);
    parentEl.innerHTML =
        new Array(Math.floor((NOTE_COUNT - FIRST_NOTE_NUM - 20) / 7))
            .fill()
            .map((_, i) => `
                <span class="
                    fifths__note
                    ${i === 6 ? 'fifths__note--skip' : ''}
                ">
                    ${i === 0 || i === 7 ? `
                            <span class="fifths__label">
                                <u>Circle of fifths</u> &nbsp;
                                <i>${i ? 'Accidentals' : 'Natural notes'}</i>
                            </span>
                        ` : ''
                }
                </span>
            `)
            .join('');
}

function addInters(parentEl) {
    parentEl.style.setProperty('--inters-left', NOTE_NUM_MID);
    parentEl.innerHTML = `
        <div class="inters__contain">
            <u class="inters__inter inters__label">
                Intervals from Middle C
            </u>
            ${INTERVAL_LABELS
            .map((l, i) => `
                        <span class="inters__inter${i === 6 ? ' inters__inter--block' : ''}">
                            ${l}
                        </span>
                    `)
            .join('')
        }
        </div>
    `;
}

function addStaff(parentEl) {
    let
        y = 0,
        clefMax = 0,
        clefMin = 5;
    for (let i = NOTE_COUNT - 1; i >= CLEFS[CLEFS.length - 1].noteNum; i--) {
        if (!isSharp(i)) {
            clefMin += 1;
            if (i >= CLEFS[0].noteNum) {
                clefMax += 1;
            }
        }
    }
    for (let i = NOTE_COUNT - 1, ci = 0; i >= 0; i--) {
        if (isC(i)) {
            const EL = document.createElement('span');
            EL.classList.add('staff__note');
            EL.style.setProperty('--note-left', i);
            EL.style.setProperty('--note-top', y + 1);
            EL.style.setProperty(
                '--note-extend-bottom',
                Math.max(0, clefMax - y)
            );
            EL.style.setProperty(
                '--note-extend-top',
                Math.max(0, y - clefMin) - (ci % 2 || y > clefMin ? 0 : 1)
            );
            parentEl.prepend(EL);
            ci += 1;
        }
        if (!isSharp(i)) {
            y += 1;
            const C = CLEFS.find(c => c.noteNum === i);
            if (C) {
                C.y = y;
            }
        }
    }
    CLEFS.forEach(c => {
        const EL = document.createElement('span');
        EL.classList.add('staff__clef');
        if (c.showStaff) {
            EL.classList.add('staff__clef--show-staff');
        }
        EL.style.setProperty('--staff-top', c.y);
        EL.style.setProperty('--clef-url', `url("${c.imgSrc}")`);
        EL.style.setProperty('--clef-y', c.imgY);
        EL.style.setProperty('--clef-h', c.imgH);
        parentEl.prepend(EL);
    });
}


//
// Init
//

function init() {
    render();
}

init();