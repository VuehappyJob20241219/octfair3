export const nullCheck = (checklist) => {
    let coptlist = [...checklist];
    let checksize = coptlist.length;
    console.log(coptlist);
    for (let i = 0; i < checksize; i++) {
        let item = coptlist[i];

        let checkflag = false;

        if (typeof item.inval === 'string') {
            checkflag = item.inval !== '' && item.inval !== null && item.inval !== undefined ? true : false;
        } else if (typeof item.inval === 'number') {
            checkflag = item.inval !== 0 ? true : false;
        }

        if (!checkflag) {
            alert(item.msg);
            return false;
        }
    }

    return true;
};
