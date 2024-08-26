document.getElementById('text-spacing').addEventListener('input', function() {
    const spacing = this.value;
    document.getElementById('text-sample').style.letterSpacing = `${spacing}px`;
    document.getElementById('text-sample').style.wordSpacing = `${spacing / 2}px`;
});
