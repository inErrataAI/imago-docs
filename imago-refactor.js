document.querySelectorAll('.tab[data-panel]').forEach(function(tab) {
  tab.addEventListener('click', function() {
    var container = this.closest('.tab-container');
    container.querySelectorAll('.tab').forEach(function(t) { t.classList.remove('active'); });
    container.querySelectorAll('.tab-panel').forEach(function(p) { p.classList.remove('active'); });
    this.classList.add('active');
    document.getElementById(this.dataset.panel).classList.add('active');
  });
});
