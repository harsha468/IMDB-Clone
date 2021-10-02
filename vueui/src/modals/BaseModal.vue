<template>
    <div class="modal-container">
        <div class="modal">
            <slot name="modal"></slot>
        </div>
    </div>
</template>
<script></script>

<style scoped>
.modal-container {
    display: block;
    position: fixed;
    z-index: 1;
    padding: 20px 0px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.3);
    margin: auto;
    overflow: none;
}
.modal {
    margin: 20px auto;
    padding: 20px;
    max-width: 1100px;
    border-radius: 5px;
    background-color: #343a40;
}
</style>