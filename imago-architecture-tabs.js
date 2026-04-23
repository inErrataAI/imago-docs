// Tab switching + deferred Mermaid rendering for architecture page
// Diagrams in hidden panels use class "mermaid-deferred" to prevent
// rendering on page load. When a tab is first shown, we swap the class
// and call mermaid.run() to render them.

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.arch-tab[data-panel]').forEach(function(tab) {
    tab.addEventListener('click', function() {
      var container = this.closest('.arch-tab-container');
      // Deactivate all tabs and panels in this container
      container.querySelectorAll('.arch-tab').forEach(function(t) {
        t.classList.remove('active');
      });
      container.querySelectorAll('.arch-panel').forEach(function(p) {
        p.classList.remove('active');
      });
      // Activate clicked tab and its panel
      this.classList.add('active');
      var panel = document.getElementById(this.dataset.panel);
      panel.classList.add('active');

      // Deferred Mermaid rendering: render any unprocessed diagrams
      var deferred = panel.querySelectorAll('pre.mermaid-deferred');
      if (deferred.length > 0) {
        deferred.forEach(function(el) {
          el.classList.remove('mermaid-deferred');
          el.classList.add('mermaid');
        });
        // mermaid.run() renders unprocessed .mermaid elements
        if (typeof mermaid !== 'undefined' && mermaid.run) {
          mermaid.run({ nodes: Array.from(deferred) });
        }
      }
    });
  });
});
