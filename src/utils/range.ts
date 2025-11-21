export const range = (start?: number, end?: number, step?: number, isRight?: boolean): Array<number> => {
    if (step === undefined && end === undefined) {
        end = start
        start = 0
        step = 1
    }

    if (step === undefined) {
        step = 1
    } else {
        step = Math.abs(step);
    }

    if (end === undefined) {
        end = 0
    }

    if (start === undefined) {
        start = 0
    }

    const res: Array<number> = [];

    if (step === 0) {
        end = Math.abs(end);
        for (let i = 1; i < end; i++) {
            res.push(start);
        }
    }
    else if (start > end) {
        for (let i = start; i > end; i = i - step) {
            res.push(i);
        }
    }
    else if (start <= end) {
        for (let i = start; i < end; i = i + step) {
            res.push(i);
        }
    }

    return isRight ? res.reverse() : res;
}
