/* Veterans Pest Control LLC - site behavior
   -------------------------------------------------------------
   LEAD FORM CONFIG
   Paste your form endpoint between the quotes to turn on real lead
   capture. Leave it empty and the form still works: it opens a
   pre-filled email and offers a text-message option instead.

   Example (FormSubmit, no account needed, one confirmation click):
     var FORM_ENDPOINT = "https://formsubmit.co/veteranspestcontrolllc@gmail.com";
   ------------------------------------------------------------- */
var FORM_ENDPOINT = "";

var BUSINESS_EMAIL = "veteranspestcontrolllc@gmail.com";
var BUSINESS_SMS   = "13348934443";

(function () {
  "use strict";

  /* ---------- mobile navigation ---------- */
  var navBtn = document.querySelector(".menu-button");
  var navBox = document.querySelector(".site-nav");
  if (navBtn && navBox) {
    navBtn.setAttribute("role", "button");
    navBtn.setAttribute("tabindex", "0");
    navBtn.setAttribute("aria-expanded", "false");
    navBtn.setAttribute("aria-controls", "primary-nav");
    navBox.id = "primary-nav";

    var toggle = document.getElementById("menu-toggle");
    var sync = function () {
      navBtn.setAttribute("aria-expanded", toggle && toggle.checked ? "true" : "false");
    };
    if (toggle) { toggle.addEventListener("change", sync); }

    navBtn.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (toggle) { toggle.checked = !toggle.checked; sync(); }
      }
    });
    // close the menu after following a link
    navBox.addEventListener("click", function (e) {
      if (e.target.closest("a") && toggle) { toggle.checked = false; sync(); }
    });
    // Escape closes it
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle && toggle.checked) { toggle.checked = false; sync(); navBtn.focus(); }
    });
  }

  /* ---------- quote form ---------- */
  var form = document.querySelector(".quote-form");
  if (!form) { return; }

  var status = document.createElement("div");
  status.className = "form-status";
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  form.parentNode.insertBefore(status, form.nextSibling);

  var submitBtn = form.querySelector('button[type="submit"]');

  function val(name) {
    var el = form.querySelector('[name="' + name + '"]');
    return el ? el.value.trim() : "";
  }

  function showError(msg) {
    status.className = "form-status is-error";
    status.innerHTML = msg;
  }

  function showSuccess(html) {
    status.className = "form-status is-success";
    status.innerHTML = html;
    status.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function summary() {
    return [
      "Name: " + val("Name"),
      "Phone: " + val("Phone"),
      "Email: " + val("Email"),
      "Property type: " + val("Property Type"),
      "Service needed: " + val("Service"),
      "",
      "What they are seeing:",
      val("Message")
    ].join("\n");
  }

  /* No endpoint configured: open a properly encoded email and offer a text.
     This is deliberately different from action="mailto:" on the <form>,
     which most mobile browsers ignore without telling the visitor. */
  function fallbackSend() {
    var subject = "Quote request from " + (val("Name") || "website visitor");
    var href = "mailto:" + BUSINESS_EMAIL +
               "?subject=" + encodeURIComponent(subject) +
               "&body=" + encodeURIComponent(summary());
    var smsSep = /iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent) ? "&" : "?";
    var sms = "sms:+" + BUSINESS_SMS + smsSep + "body=" +
              encodeURIComponent("Quote request - " + (val("Name") || "") + " - " + val("Service"));

    window.location.href = href;

    showSuccess(
      "<strong>Almost there.</strong> Your email app should be opening with the details filled in. " +
      "Press send and we will get back to you." +
      '<div class="form-status-actions">' +
        '<a class="button button-primary" href="tel:1' + BUSINESS_SMS + '">Call (334) 893-4443</a>' +
        '<a class="button button-outline" href="' + sms + '">Text us instead</a>' +
      "</div>"
    );
  }

  function endpointSend() {
    var data = new FormData(form);
    data.delete("_honey");
    data.append("_subject", "New quote request - veteranspestcontrolllc.com");
    data.append("_template", "table");
    data.append("_captcha", "false");

    submitBtn.disabled = true;
    var original = submitBtn.textContent;
    submitBtn.textContent = "Sending...";

    fetch(FORM_ENDPOINT, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" }
    })
      .then(function (r) {
        if (!r.ok) { throw new Error("HTTP " + r.status); }
        form.reset();
        showSuccess(
          "<strong>Thank you, we have your request.</strong> We will follow up by phone or email, " +
          "usually the same business day." +
          '<div class="form-status-actions">' +
            '<a class="button button-outline" href="tel:1' + BUSINESS_SMS + '">Or call now: (334) 893-4443</a>' +
          "</div>"
        );
      })
      .catch(function () {
        showError(
          "<strong>That did not go through.</strong> Please call us at " +
          '<a href="tel:1' + BUSINESS_SMS + '">(334) 893-4443</a> or email ' +
          '<a href="mailto:' + BUSINESS_EMAIL + '">' + BUSINESS_EMAIL + "</a>."
        );
      })
      .then(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = original;
      });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // honeypot: bots fill hidden fields, people do not
    var trap = form.querySelector('[name="_honey"]');
    if (trap && trap.value) { return; }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var phone = val("Phone").replace(/\D/g, "");
    if (phone.length < 10) {
      showError("Please enter a phone number with area code so we can reach you.");
      var p = form.querySelector('[name="Phone"]');
      if (p) { p.focus(); }
      return;
    }

    status.className = "form-status";
    status.innerHTML = "";

    if (FORM_ENDPOINT) { endpointSend(); } else { fallbackSend(); }
  });
})();
