<template>
    <div class="container">
        <ContextBox class="context-box">회원가입</ContextBox>
        <JoinApplicantMain></JoinApplicantMain>
    </div>
</template>


<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    /* 세로로 배치 */
    // align-items: center;
    justify-content: flex-start;
    /* 위에서부터 배치 */
    max-width: 50%;
    background-color: white;
    border: 2px solid #E0E0E0;
    /* 테두리 색상과 두께 */
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 20px;
    /* 상하 여백 */
}

.context-box {
    width: 100%;
    /* 부모와 동일한 너비 */
    text-align: center;
    /* 텍스트 중앙 정렬 */
    padding: 20px;
    /* 상하 여백 */
}
</style>