const drawSpiral = (size) => {
    const constant = size % 2 === 0 ? 1 : 0;
    const totalRows = size + constant;
    let nuggetSize = size;
    let gaps = 0;
    let i;
    for (i = 0; i < Math.floor((totalRows) / 2); i++) {
        if (i % 2 === 0) {
            console.log('# '.repeat(gaps + 1) + '#'.repeat(nuggetSize) + ' #'.repeat(gaps));
            gaps++;
        } else {
            console.log('# '.repeat(gaps + 1) + ' '.repeat(nuggetSize - 2) + ' #'.repeat(gaps));
        }
        nuggetSize -= 2;
    }
    for (; i < totalRows; i++) {
        if (i % 2 === 0) {
            console.log('# '.repeat(gaps) + '#'.repeat(nuggetSize + 2) + ' #'.repeat(gaps));
        } else {
            console.log('# '.repeat(gaps) + ' '.repeat(nuggetSize) + ' #'.repeat(gaps));
            gaps--;
        }
        nuggetSize += 2;
    }
}

drawSpiral(10);
