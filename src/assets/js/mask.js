function format(mask, document) {
    let increment = document.value.length;
    let out = '#';
    let text = mask.substring(increment);

    while (text.substring(0, 1) != out && text.length ) {
      document.value += text.substring(0, 1);
      increment++;
      text = mask.substring(increment);
    }
}