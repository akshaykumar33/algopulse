/**
 * Fancy select: upgrades every native <select> into a styled, scrollable listbox.
 *
 * The native element stays in the DOM (hidden) as the source of truth, so existing
 * `change` handlers, `.value` reads and form posts keep working untouched. Options are
 * re-read each time the list opens, so dynamically rebuilt selects stay in sync.
 */
'use strict';

(() => {
  let open = null;

  function label(sel) {
    const o = sel.selectedOptions[0];
    return o ? o.textContent : '';
  }

  function enhance(sel) {
    if (sel.dataset.fancy === 'on' || sel.multiple || sel.size > 1 || sel.closest('[data-native-select]')) return;
    sel.dataset.fancy = 'on';
    const wrap = document.createElement('span');
    wrap.className = 'fsel';
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'fsel-btn';
    btn.setAttribute('aria-haspopup', 'listbox');
    btn.setAttribute('aria-expanded', 'false');
    const lab = sel.id && document.querySelector(`label[for="${CSS.escape(sel.id)}"]`);
    if (lab) {
      lab.id ||= `${sel.id}-label`;
      btn.setAttribute('aria-labelledby', `${lab.id} ${sel.id}-fsel`);
      lab.addEventListener('click', (e) => {
        e.preventDefault();
        btn.focus();
      });
    } else if (sel.title || sel.getAttribute('aria-label')) btn.setAttribute('aria-label', sel.getAttribute('aria-label') || sel.title);
    btn.id = `${sel.id || 'sel' + Math.random().toString(36).slice(2)}-fsel`;
    btn.innerHTML = '<span class="fsel-value"></span><i class="ph ph-caret-down fsel-caret" aria-hidden="true"></i>';
    sel.after(wrap);
    wrap.append(sel, btn);
    sel.tabIndex = -1;
    sel.setAttribute('aria-hidden', 'true');
    const sync = () => {
      btn.querySelector('.fsel-value').textContent = label(sel);
      btn.disabled = sel.disabled;
    };
    sync();
    sel.addEventListener('change', sync);
    new MutationObserver(sync).observe(sel, { childList: true, subtree: true, attributes: true, attributeFilter: ['disabled', 'selected'] });
    btn.addEventListener('click', () => (open?.sel === sel ? close() : show(sel, btn)));
    btn.addEventListener('keydown', (e) => {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        show(sel, btn);
      }
    });
    // Programmatic `.value = x` does not fire events; keep the label honest anyway.
    const proto = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value');
    Object.defineProperty(sel, 'value', {
      get: () => proto.get.call(sel),
      set: (v) => {
        proto.set.call(sel, v);
        sync();
      },
    });
  }

  function show(sel, btn) {
    close();
    const list = document.createElement('div');
    list.className = 'fsel-list';
    list.setAttribute('role', 'listbox');
    list.id = `${btn.id}-list`;
    list.tabIndex = -1;
    const opts = [...sel.options].filter((o) => !o.hidden);
    const many = opts.length > 8;
    list.innerHTML = `${many ? '<div class="fsel-search"><i class="ph ph-magnifying-glass" aria-hidden="true"></i><input type="search" placeholder="Search…" aria-label="Search options"></div>' : ''}<div class="fsel-scroll">${opts
      .map(
        (o, i) =>
          `<div class="fsel-opt" role="option" id="${list.id}-${i}" data-i="${i}" aria-selected="${o.selected}" ${o.disabled ? 'aria-disabled="true"' : ''}><span>${escape(o.textContent)}</span>${o.selected ? '<i class="ph-bold ph-check" aria-hidden="true"></i>' : ''}</div>`
      )
      .join('')}</div>`;
    const host = sel.closest('dialog[open]') || document.body;
    host.append(list);
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-controls', list.id);
    let active = Math.max(0, opts.findIndex((o) => o.selected));
    const items = () => [...list.querySelectorAll('.fsel-opt:not([hidden])')];
    const mark = () => {
      items().forEach((el) => el.classList.toggle('is-active', +el.dataset.i === active));
      const el = list.querySelector(`[data-i="${active}"]`);
      if (el) {
        el.scrollIntoView({ block: 'nearest' });
        btn.setAttribute('aria-activedescendant', el.id);
      }
    };
    const pick = (i) => {
      const o = opts[i];
      if (!o || o.disabled) return;
      if (!o.selected) {
        sel.value = o.value;
        sel.dispatchEvent(new Event('input', { bubbles: true }));
        sel.dispatchEvent(new Event('change', { bubbles: true }));
      }
      close();
      btn.focus();
    };
    const place = () => {
      const r = btn.getBoundingClientRect();
      const below = innerHeight - r.bottom - 12;
      const up = below < 220 && r.top > below;
      const max = Math.min(340, (up ? r.top : below) - 8);
      list.style.minWidth = `${Math.max(r.width, 200)}px`;
      list.style.maxHeight = `${Math.max(140, max)}px`;
      const w = list.offsetWidth;
      list.style.left = `${Math.min(Math.max(8, r.left), innerWidth - w - 8)}px`;
      list.style.top = up ? '' : `${r.bottom + 6}px`;
      list.style.bottom = up ? `${innerHeight - r.top + 6}px` : '';
      list.classList.toggle('is-up', up);
    };
    place();
    mark();
    list.addEventListener('pointerdown', (e) => e.preventDefault());
    list.addEventListener('click', (e) => {
      const el = e.target.closest('.fsel-opt');
      if (el) pick(+el.dataset.i);
    });
    list.addEventListener('pointermove', (e) => {
      const el = e.target.closest('.fsel-opt');
      if (el && +el.dataset.i !== active) {
        active = +el.dataset.i;
        mark();
      }
    });
    const search = list.querySelector('input');
    search?.addEventListener('input', () => {
      const q = search.value.trim().toLowerCase();
      list.querySelectorAll('.fsel-opt').forEach((el) => (el.hidden = q && !el.textContent.toLowerCase().includes(q)));
      const first = items()[0];
      if (first) active = +first.dataset.i;
      mark();
    });
    const onKey = (e) => {
      const vis = items().map((el) => +el.dataset.i);
      const at = vis.indexOf(active);
      if (e.key === 'ArrowDown') active = vis[Math.min(vis.length - 1, at + 1)] ?? active;
      else if (e.key === 'ArrowUp') active = vis[Math.max(0, at - 1)] ?? active;
      else if (e.key === 'Home') active = vis[0] ?? active;
      else if (e.key === 'End') active = vis[vis.length - 1] ?? active;
      else if (e.key === 'PageDown') active = vis[Math.min(vis.length - 1, at + 8)] ?? active;
      else if (e.key === 'PageUp') active = vis[Math.max(0, at - 8)] ?? active;
      else if (e.key === 'Enter' || (e.key === ' ' && e.target !== search)) pick(active);
      else if (e.key === 'Escape' || e.key === 'Tab') {
        if (e.key === 'Escape') e.stopPropagation();
        close();
        if (e.key === 'Escape') btn.focus();
        return;
      } else if (!search && e.key.length === 1) {
        const k = e.key.toLowerCase();
        const hit = opts.findIndex((o, i) => i > active && o.textContent.trim().toLowerCase().startsWith(k));
        const wrap = opts.findIndex((o) => o.textContent.trim().toLowerCase().startsWith(k));
        active = hit >= 0 ? hit : wrap >= 0 ? wrap : active;
      } else return;
      e.preventDefault();
      mark();
    };
    (search || btn).addEventListener('keydown', onKey, true);
    if (search) setTimeout(() => search.focus(), 0);
    const outside = (e) => {
      if (!list.contains(e.target) && !btn.contains(e.target)) close();
    };
    const reflow = (e) => {
      if (e.type === 'scroll' && list.contains(e.target)) return;
      place();
    };
    setTimeout(() => document.addEventListener('pointerdown', outside, true), 0);
    addEventListener('resize', reflow);
    addEventListener('scroll', reflow, true);
    open = {
      sel,
      close() {
        list.remove();
        btn.setAttribute('aria-expanded', 'false');
        btn.removeAttribute('aria-activedescendant');
        (search || btn).removeEventListener('keydown', onKey, true);
        document.removeEventListener('pointerdown', outside, true);
        removeEventListener('resize', reflow);
        removeEventListener('scroll', reflow, true);
      },
    };
  }

  function close() {
    open?.close();
    open = null;
  }

  function escape(s) {
    return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  }

  const scan = (root) => {
    if (root.matches?.('select')) enhance(root);
    root.querySelectorAll?.('select').forEach(enhance);
  };
  function boot() {
    scan(document);
    new MutationObserver((ms) => ms.forEach((m) => m.addedNodes.forEach((n) => n.nodeType === 1 && scan(n)))).observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
  window.fancySelect = { enhance, close };
})();
