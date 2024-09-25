//jquery.unobtrusive-ajax
(function(a) { var b = "unobtrusiveAjaxClick", d = "unobtrusiveAjaxClickTarget", h = "unobtrusiveValidation"; function c(d, b) { var a = window, c = (d || "").split("."); while (a && c.length) a = a[c.shift()]; if (typeof a === "function") return a; b.push(d); return Function.constructor.apply(null, b) } function e(a) { return a === "GET" || a === "POST" } function g(b, a) { !e(a) && b.setRequestHeader("X-HTTP-Method-Override", a) } function i(c, b, e) { var d; if (e.indexOf("application/x-javascript") !== -1) return; d = (c.getAttribute("data-ajax-mode") || "").toUpperCase(); a(c.getAttribute("data-ajax-update")).each(function(f, c) { var e; switch (d) { case "BEFORE": e = c.firstChild; a("<div />").html(b).contents().each(function() { c.insertBefore(this, e) }); break; case "AFTER": a("<div />").html(b).contents().each(function() { c.appendChild(this) }); break; case "REPLACE-WITH": a(c).replaceWith(b); break; default: a(c).html(b) } }) } function f(b, d) { var j, k, f, h; j = b.getAttribute("data-ajax-confirm"); if (j && !window.confirm(j)) return; k = a(b.getAttribute("data-ajax-loading")); h = parseInt(b.getAttribute("data-ajax-loading-duration"), 10) || 0; a.extend(d, { type: b.getAttribute("data-ajax-method") || undefined, url: b.getAttribute("data-ajax-url") || undefined, cache: !!b.getAttribute("data-ajax-cache"), beforeSend: function(d) { var a; g(d, f); a = c(b.getAttribute("data-ajax-begin"), ["xhr"]).apply(b, arguments); a !== false && k.show(h); return a }, complete: function() { k.hide(h); c(b.getAttribute("data-ajax-complete"), ["xhr", "status"]).apply(b, arguments) }, success: function(a, e, d) { i(b, a, d.getResponseHeader("Content-Type") || "text/html"); c(b.getAttribute("data-ajax-success"), ["data", "status", "xhr"]).apply(b, arguments) }, error: function() { c(b.getAttribute("data-ajax-failure"), ["xhr", "status", "error"]).apply(b, arguments) } }); d.data.push({ name: "X-Requested-With", value: "XMLHttpRequest" }); f = d.type.toUpperCase(); if (!e(f)) { d.type = "POST"; d.data.push({ name: "X-HTTP-Method-Override", value: f }) } a.ajax(d) } function j(c) { var b = a(c).data(h); return !b || !b.validate || b.validate() } a(document).on("click", "a[data-ajax=true]", function(a) { a.preventDefault(); f(this, { url: this.href, type: "GET", data: [] }) }); a(document).on("click", "form[data-ajax=true] input[type=image]", function(c) { var g = c.target.name, e = a(c.target), f = a(e.parents("form")[0]), d = e.offset(); f.data(b, [{ name: g + ".x", value: Math.round(c.pageX - d.left) }, { name: g + ".y", value: Math.round(c.pageY - d.top) }]); setTimeout(function() { f.removeData(b) }, 0) }); a(document).on("click", "form[data-ajax=true] :submit", function(e) { var g = e.currentTarget.name, f = a(e.target), c = a(f.parents("form")[0]); c.data(b, g ? [{ name: g, value: e.currentTarget.value }] : []); c.data(d, f); setTimeout(function() { c.removeData(b); c.removeData(d) }, 0) }); a(document).on("submit", "form[data-ajax=true]", function(h) { var e = a(this).data(b) || [], c = a(this).data(d), g = c && c.hasClass("cancel"); h.preventDefault(); if (!g && !j(this)) return; f(this, { url: this.action, type: this.method || "GET", data: e.concat(a(this).serializeArray()) }) }) })(jQuery);

//jquery.validate
!function(a) { "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = a(require("jquery")) : a(jQuery) }(function(a) { a.extend(a.fn, { validate: function(b) { if (!this.length) return void (b && b.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing.")); var c = a.data(this[0], "validator"); return c ? c : (this.attr("novalidate", "novalidate"), c = new a.validator(b, this[0]), a.data(this[0], "validator", c), c.settings.onsubmit && (this.on("click.validate", ":submit", function(b) { c.settings.submitHandler && (c.submitButton = b.target), a(this).hasClass("cancel") && (c.cancelSubmit = !0), void 0 !== a(this).attr("formnovalidate") && (c.cancelSubmit = !0) }), this.on("submit.validate", function(b) { function d() { var d, e; return c.settings.submitHandler ? (c.submitButton && (d = a("<input type='hidden'/>").attr("name", c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)), e = c.settings.submitHandler.call(c, c.currentForm, b), c.submitButton && d.remove(), void 0 !== e ? e : !1) : !0 } return c.settings.debug && b.preventDefault(), c.cancelSubmit ? (c.cancelSubmit = !1, d()) : c.form() ? c.pendingRequest ? (c.formSubmitted = !0, !1) : d() : (c.focusInvalid(), !1) })), c) }, valid: function() { var b, c, d; return a(this[0]).is("form") ? b = this.validate().form() : (d = [], b = !0, c = a(this[0].form).validate(), this.each(function() { b = c.element(this) && b, b || (d = d.concat(c.errorList)) }), c.errorList = d), b }, rules: function(b, c) { if (this.length) { var d, e, f, g, h, i, j = this[0]; if (b) switch (d = a.data(j.form, "validator").settings, e = d.rules, f = a.validator.staticRules(j), b) { case "add": a.extend(f, a.validator.normalizeRule(c)), delete f.messages, e[j.name] = f, c.messages && (d.messages[j.name] = a.extend(d.messages[j.name], c.messages)); break; case "remove": return c ? (i = {}, a.each(c.split(/\s/), function(b, c) { i[c] = f[c], delete f[c], "required" === c && a(j).removeAttr("aria-required") }), i) : (delete e[j.name], f) } return g = a.validator.normalizeRules(a.extend({}, a.validator.classRules(j), a.validator.attributeRules(j), a.validator.dataRules(j), a.validator.staticRules(j)), j), g.required && (h = g.required, delete g.required, g = a.extend({ required: h }, g), a(j).attr("aria-required", "true")), g.remote && (h = g.remote, delete g.remote, g = a.extend(g, { remote: h })), g } } }), a.extend(a.expr[":"], { blank: function(b) { return !a.trim("" + a(b).val()) }, filled: function(b) { var c = a(b).val(); return null !== c && !!a.trim("" + c) }, unchecked: function(b) { return !a(b).prop("checked") } }), a.validator = function(b, c) { this.settings = a.extend(!0, {}, a.validator.defaults, b), this.currentForm = c, this.init() }, a.validator.format = function(b, c) { return 1 === arguments.length ? function() { var c = a.makeArray(arguments); return c.unshift(b), a.validator.format.apply(this, c) } : void 0 === c ? b : (arguments.length > 2 && c.constructor !== Array && (c = a.makeArray(arguments).slice(1)), c.constructor !== Array && (c = [c]), a.each(c, function(a, c) { b = b.replace(new RegExp("\\{" + a + "\\}", "g"), function() { return c }) }), b) }, a.extend(a.validator, { defaults: { messages: {}, groups: {}, rules: {}, errorClass: "error", pendingClass: "pending", validClass: "valid", errorElement: "label", focusCleanup: !1, focusInvalid: !0, errorContainer: a([]), errorLabelContainer: a([]), onsubmit: !0, ignore: ":hidden", ignoreTitle: !1, onfocusin: function(a) { this.lastActive = a, this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, a, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(a))) }, onfocusout: function(a) { this.checkable(a) || !(a.name in this.submitted) && this.optional(a) || this.element(a) }, onkeyup: function(b, c) { var d = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225]; 9 === c.which && "" === this.elementValue(b) || -1 !== a.inArray(c.keyCode, d) || (b.name in this.submitted || b.name in this.invalid) && this.element(b) }, onclick: function(a) { a.name in this.submitted ? this.element(a) : a.parentNode.name in this.submitted && this.element(a.parentNode) }, highlight: function(b, c, d) { "radio" === b.type ? this.findByName(b.name).addClass(c).removeClass(d) : a(b).addClass(c).removeClass(d) }, unhighlight: function(b, c, d) { "radio" === b.type ? this.findByName(b.name).removeClass(c).addClass(d) : a(b).removeClass(c).addClass(d) } }, setDefaults: function(b) { a.extend(a.validator.defaults, b) }, messages: { required: "This field is required.", remote: "Please fix this field.", email: "Please enter a valid email address.", url: "Please enter a valid URL.", date: "Please enter a valid date.", dateISO: "Please enter a valid date ( ISO ).", number: "Please enter a valid number.", digits: "Please enter only digits.", equalTo: "Please enter the same value again.", maxlength: a.validator.format("Please enter no more than {0} characters."), minlength: a.validator.format("Please enter at least {0} characters."), rangelength: a.validator.format("Please enter a value between {0} and {1} characters long."), range: a.validator.format("Please enter a value between {0} and {1}."), max: a.validator.format("Please enter a value less than or equal to {0}."), min: a.validator.format("Please enter a value greater than or equal to {0}."), step: a.validator.format("Please enter a multiple of {0}.") }, autoCreateRanges: !1, prototype: { init: function() { function b(b) { var c = a.data(this.form, "validator"), d = "on" + b.type.replace(/^validate/, ""), e = c.settings; e[d] && !a(this).is(e.ignore) && e[d].call(c, this, b) } this.labelContainer = a(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || a(this.currentForm), this.containers = a(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset(); var c, d = this.groups = {}; a.each(this.settings.groups, function(b, c) { "string" == typeof c && (c = c.split(/\s/)), a.each(c, function(a, c) { d[c] = b }) }), c = this.settings.rules, a.each(c, function(b, d) { c[b] = a.validator.normalizeRule(d) }), a(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable]", b).on("click.validate", "select, option, [type='radio'], [type='checkbox']", b), this.settings.invalidHandler && a(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler), a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true") }, form: function() { return this.checkForm(), a.extend(this.submitted, this.errorMap), this.invalid = a.extend({}, this.errorMap), this.valid() || a(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid() }, checkForm: function() { this.prepareForm(); for (var a = 0, b = this.currentElements = this.elements(); b[a]; a++) this.check(b[a]); return this.valid() }, element: function(b) { var c, d, e = this.clean(b), f = this.validationTargetFor(e), g = this, h = !0; return void 0 === f ? delete this.invalid[e.name] : (this.prepareElement(f), this.currentElements = a(f), d = this.groups[f.name], d && a.each(this.groups, function(a, b) { b === d && a !== f.name && (e = g.validationTargetFor(g.clean(g.findByName(a))), e && e.name in g.invalid && (g.currentElements.push(e), h = h && g.check(e))) }), c = this.check(f) !== !1, h = h && c, c ? this.invalid[f.name] = !1 : this.invalid[f.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), a(b).attr("aria-invalid", !c)), h }, showErrors: function(b) { if (b) { var c = this; a.extend(this.errorMap, b), this.errorList = a.map(this.errorMap, function(a, b) { return { message: a, element: c.findByName(b)[0] } }), this.successList = a.grep(this.successList, function(a) { return !(a.name in b) }) } this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors() }, resetForm: function() { a.fn.resetForm && a(this.currentForm).resetForm(), this.invalid = {}, this.submitted = {}, this.prepareForm(), this.hideErrors(); var b = this.elements().removeData("previousValue").removeAttr("aria-invalid"); this.resetElements(b) }, resetElements: function(a) { var b; if (this.settings.unhighlight) for (b = 0; a[b]; b++) this.settings.unhighlight.call(this, a[b], this.settings.errorClass, ""), this.findByName(a[b].name).removeClass(this.settings.validClass); else a.removeClass(this.settings.errorClass).removeClass(this.settings.validClass) }, numberOfInvalids: function() { return this.objectLength(this.invalid) }, objectLength: function(a) { var b, c = 0; for (b in a) a[b] && c++; return c }, hideErrors: function() { this.hideThese(this.toHide) }, hideThese: function(a) { a.not(this.containers).text(""), this.addWrapper(a).hide() }, valid: function() { return 0 === this.size() }, size: function() { return this.errorList.length }, focusInvalid: function() { if (this.settings.focusInvalid) try { a(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin") } catch (b) { } }, findLastActive: function() { var b = this.lastActive; return b && 1 === a.grep(this.errorList, function(a) { return a.element.name === b.name }).length && b }, elements: function() { var b = this, c = {}; return a(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function() { var d = this.name || a(this).attr("name"); return !d && b.settings.debug && window.console && console.error("%o has no name assigned", this), this.hasAttribute("contenteditable") && (this.form = a(this).closest("form")[0]), d in c || !b.objectLength(a(this).rules()) ? !1 : (c[d] = !0, !0) }) }, clean: function(b) { return a(b)[0] }, errors: function() { var b = this.settings.errorClass.split(" ").join("."); return a(this.settings.errorElement + "." + b, this.errorContext) }, resetInternals: function() { this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = a([]), this.toHide = a([]) }, reset: function() { this.resetInternals(), this.currentElements = a([]) }, prepareForm: function() { this.reset(), this.toHide = this.errors().add(this.containers) }, prepareElement: function(a) { this.reset(), this.toHide = this.errorsFor(a) }, elementValue: function(b) { var c, d, e = a(b), f = b.type; return "radio" === f || "checkbox" === f ? this.findByName(b.name).filter(":checked").val() : "number" === f && "undefined" != typeof b.validity ? b.validity.badInput ? "NaN" : e.val() : (c = b.hasAttribute("contenteditable") ? e.text() : e.val(), "file" === f ? "C:\\fakepath\\" === c.substr(0, 12) ? c.substr(12) : (d = c.lastIndexOf("/"), d >= 0 ? c.substr(d + 1) : (d = c.lastIndexOf("\\"), d >= 0 ? c.substr(d + 1) : c)) : "string" == typeof c ? c.replace(/\r/g, "") : c) }, check: function(b) { b = this.validationTargetFor(this.clean(b)); var c, d, e, f = a(b).rules(), g = a.map(f, function(a, b) { return b }).length, h = !1, i = this.elementValue(b); if ("function" == typeof f.normalizer) { if (i = f.normalizer.call(b, i), "string" != typeof i) throw new TypeError("The normalizer should return a string value."); delete f.normalizer } for (d in f) { e = { method: d, parameters: f[d] }; try { if (c = a.validator.methods[d].call(this, i, b, e.parameters), "dependency-mismatch" === c && 1 === g) { h = !0; continue } if (h = !1, "pending" === c) return void (this.toHide = this.toHide.not(this.errorsFor(b))); if (!c) return this.formatAndAdd(b, e), !1 } catch (j) { throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method.", j), j instanceof TypeError && (j.message += ".  Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method."), j } } if (!h) return this.objectLength(f) && this.successList.push(b), !0 }, customDataMessage: function(b, c) { return a(b).data("msg" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()) || a(b).data("msg") }, customMessage: function(a, b) { var c = this.settings.messages[a]; return c && (c.constructor === String ? c : c[b]) }, findDefined: function() { for (var a = 0; a < arguments.length; a++) if (void 0 !== arguments[a]) return arguments[a] }, defaultMessage: function(b, c) { var d = this.findDefined(this.customMessage(b.name, c.method), this.customDataMessage(b, c.method), !this.settings.ignoreTitle && b.title || void 0, a.validator.messages[c.method], "<strong>Warning: No message defined for " + b.name + "</strong>"), e = /\$?\{(\d+)\}/g; return "function" == typeof d ? d = d.call(this, c.parameters, b) : e.test(d) && (d = a.validator.format(d.replace(e, "{$1}"), c.parameters)), d }, formatAndAdd: function(a, b) { var c = this.defaultMessage(a, b); this.errorList.push({ message: c, element: a, method: b.method }), this.errorMap[a.name] = c, this.submitted[a.name] = c }, addWrapper: function(a) { return this.settings.wrapper && (a = a.add(a.parent(this.settings.wrapper))), a }, defaultShowErrors: function() { var a, b, c; for (a = 0; this.errorList[a]; a++) c = this.errorList[a], this.settings.highlight && this.settings.highlight.call(this, c.element, this.settings.errorClass, this.settings.validClass), this.showLabel(c.element, c.message); if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success) for (a = 0; this.successList[a]; a++) this.showLabel(this.successList[a]); if (this.settings.unhighlight) for (a = 0, b = this.validElements(); b[a]; a++) this.settings.unhighlight.call(this, b[a], this.settings.errorClass, this.settings.validClass); this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show() }, validElements: function() { return this.currentElements.not(this.invalidElements()) }, invalidElements: function() { return a(this.errorList).map(function() { return this.element }) }, showLabel: function(b, c) { var d, e, f, g, h = this.errorsFor(b), i = this.idOrName(b), j = a(b).attr("aria-describedby"); h.length ? (h.removeClass(this.settings.validClass).addClass(this.settings.errorClass), h.html(c)) : (h = a("<" + this.settings.errorElement + ">").attr("id", i + "-error").addClass(this.settings.errorClass).html(c || ""), d = h, this.settings.wrapper && (d = h.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(d) : this.settings.errorPlacement ? this.settings.errorPlacement(d, a(b)) : d.insertAfter(b), h.is("label") ? h.attr("for", i) : 0 === h.parents("label[for='" + this.escapeCssMeta(i) + "']").length && (f = h.attr("id"), j ? j.match(new RegExp("\\b" + this.escapeCssMeta(f) + "\\b")) || (j += " " + f) : j = f, a(b).attr("aria-describedby", j), e = this.groups[b.name], e && (g = this, a.each(g.groups, function(b, c) { c === e && a("[name='" + g.escapeCssMeta(b) + "']", g.currentForm).attr("aria-describedby", h.attr("id")) })))), !c && this.settings.success && (h.text(""), "string" == typeof this.settings.success ? h.addClass(this.settings.success) : this.settings.success(h, b)), this.toShow = this.toShow.add(h) }, errorsFor: function(b) { var c = this.escapeCssMeta(this.idOrName(b)), d = a(b).attr("aria-describedby"), e = "label[for='" + c + "'], label[for='" + c + "'] *"; return d && (e = e + ", #" + this.escapeCssMeta(d).replace(/\s+/g, ", #")), this.errors().filter(e) }, escapeCssMeta: function(a) { return a.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, "\\$1") }, idOrName: function(a) { return this.groups[a.name] || (this.checkable(a) ? a.name : a.id || a.name) }, validationTargetFor: function(b) { return this.checkable(b) && (b = this.findByName(b.name)), a(b).not(this.settings.ignore)[0] }, checkable: function(a) { return /radio|checkbox/i.test(a.type) }, findByName: function(b) { return a(this.currentForm).find("[name='" + this.escapeCssMeta(b) + "']") }, getLength: function(b, c) { switch (c.nodeName.toLowerCase()) { case "select": return a("option:selected", c).length; case "input": if (this.checkable(c)) return this.findByName(c.name).filter(":checked").length } return b.length }, depend: function(a, b) { return this.dependTypes[typeof a] ? this.dependTypes[typeof a](a, b) : !0 }, dependTypes: { "boolean": function(a) { return a }, string: function(b, c) { return !!a(b, c.form).length }, "function": function(a, b) { return a(b) } }, optional: function(b) { var c = this.elementValue(b); return !a.validator.methods.required.call(this, c, b) && "dependency-mismatch" }, startRequest: function(b) { this.pending[b.name] || (this.pendingRequest++, a(b).addClass(this.settings.pendingClass), this.pending[b.name] = !0) }, stopRequest: function(b, c) { this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[b.name], a(b).removeClass(this.settings.pendingClass), c && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (a(this.currentForm).submit(), this.formSubmitted = !1) : !c && 0 === this.pendingRequest && this.formSubmitted && (a(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1) }, previousValue: function(b, c) { return a.data(b, "previousValue") || a.data(b, "previousValue", { old: null, valid: !0, message: this.defaultMessage(b, { method: c }) }) }, destroy: function() { this.resetForm(), a(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur") } }, classRuleSettings: { required: { required: !0 }, email: { email: !0 }, url: { url: !0 }, date: { date: !0 }, dateISO: { dateISO: !0 }, number: { number: !0 }, digits: { digits: !0 }, creditcard: { creditcard: !0 } }, addClassRules: function(b, c) { b.constructor === String ? this.classRuleSettings[b] = c : a.extend(this.classRuleSettings, b) }, classRules: function(b) { var c = {}, d = a(b).attr("class"); return d && a.each(d.split(" "), function() { this in a.validator.classRuleSettings && a.extend(c, a.validator.classRuleSettings[this]) }), c }, normalizeAttributeRule: function(a, b, c, d) { /min|max|step/.test(c) && (null === b || /number|range|text/.test(b)) && (d = Number(d), isNaN(d) && (d = void 0)), d || 0 === d ? a[c] = d : b === c && "range" !== b && (a[c] = !0) }, attributeRules: function(b) { var c, d, e = {}, f = a(b), g = b.getAttribute("type"); for (c in a.validator.methods) "required" === c ? (d = b.getAttribute(c), "" === d && (d = !0), d = !!d) : d = f.attr(c), this.normalizeAttributeRule(e, g, c, d); return e.maxlength && /-1|2147483647|524288/.test(e.maxlength) && delete e.maxlength, e }, dataRules: function(b) { var c, d, e = {}, f = a(b), g = b.getAttribute("type"); for (c in a.validator.methods) d = f.data("rule" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()), this.normalizeAttributeRule(e, g, c, d); return e }, staticRules: function(b) { var c = {}, d = a.data(b.form, "validator"); return d.settings.rules && (c = a.validator.normalizeRule(d.settings.rules[b.name]) || {}), c }, normalizeRules: function(b, c) { return a.each(b, function(d, e) { if (e === !1) return void delete b[d]; if (e.param || e.depends) { var f = !0; switch (typeof e.depends) { case "string": f = !!a(e.depends, c.form).length; break; case "function": f = e.depends.call(c, c) } f ? b[d] = void 0 !== e.param ? e.param : !0 : (a.data(c.form, "validator").resetElements(a(c)), delete b[d]) } }), a.each(b, function(d, e) { b[d] = a.isFunction(e) && "normalizer" !== d ? e(c) : e }), a.each(["minlength", "maxlength"], function() { b[this] && (b[this] = Number(b[this])) }), a.each(["rangelength", "range"], function() { var c; b[this] && (a.isArray(b[this]) ? b[this] = [Number(b[this][0]), Number(b[this][1])] : "string" == typeof b[this] && (c = b[this].replace(/[\[\]]/g, "").split(/[\s,]+/), b[this] = [Number(c[0]), Number(c[1])])) }), a.validator.autoCreateRanges && (null != b.min && null != b.max && (b.range = [b.min, b.max], delete b.min, delete b.max), null != b.minlength && null != b.maxlength && (b.rangelength = [b.minlength, b.maxlength], delete b.minlength, delete b.maxlength)), b }, normalizeRule: function(b) { if ("string" == typeof b) { var c = {}; a.each(b.split(/\s/), function() { c[this] = !0 }), b = c } return b }, addMethod: function(b, c, d) { a.validator.methods[b] = c, a.validator.messages[b] = void 0 !== d ? d : a.validator.messages[b], c.length < 3 && a.validator.addClassRules(b, a.validator.normalizeRule(b)) }, methods: { required: function(b, c, d) { if (!this.depend(d, c)) return "dependency-mismatch"; if ("select" === c.nodeName.toLowerCase()) { var e = a(c).val(); return e && e.length > 0 } return this.checkable(c) ? this.getLength(b, c) > 0 : b.length > 0 }, email: function(a, b) { return this.optional(b) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a) }, url: function(a, b) { return this.optional(b) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(a) }, date: function(a, b) { return this.optional(b) || !/Invalid|NaN/.test(new Date(a).toString()) }, dateISO: function(a, b) { return this.optional(b) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a) }, number: function(a, b) { return this.optional(b) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a) }, digits: function(a, b) { return this.optional(b) || /^\d+$/.test(a) }, minlength: function(b, c, d) { var e = a.isArray(b) ? b.length : this.getLength(b, c); return this.optional(c) || e >= d }, maxlength: function(b, c, d) { var e = a.isArray(b) ? b.length : this.getLength(b, c); return this.optional(c) || d >= e }, rangelength: function(b, c, d) { var e = a.isArray(b) ? b.length : this.getLength(b, c); return this.optional(c) || e >= d[0] && e <= d[1] }, min: function(a, b, c) { return this.optional(b) || a >= c }, max: function(a, b, c) { return this.optional(b) || c >= a }, range: function(a, b, c) { return this.optional(b) || a >= c[0] && a <= c[1] }, step: function(b, c, d) { var e = a(c).attr("type"), f = "Step attribute on input type " + e + " is not supported.", g = ["text", "number", "range"], h = new RegExp("\\b" + e + "\\b"), i = e && !h.test(g.join()); if (i) throw new Error(f); return this.optional(c) || b % d === 0 }, equalTo: function(b, c, d) { var e = a(d); return this.settings.onfocusout && e.not(".validate-equalTo-blur").length && e.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function() { a(c).valid() }), b === e.val() }, remote: function(b, c, d, e) { if (this.optional(c)) return "dependency-mismatch"; e = "string" == typeof e && e || "remote"; var f, g, h, i = this.previousValue(c, e); return this.settings.messages[c.name] || (this.settings.messages[c.name] = {}), i.originalMessage = i.originalMessage || this.settings.messages[c.name][e], this.settings.messages[c.name][e] = i.message, d = "string" == typeof d && { url: d } || d, h = a.param(a.extend({ data: b }, d.data)), i.old === h ? i.valid : (i.old = h, f = this, this.startRequest(c), g = {}, g[c.name] = b, a.ajax(a.extend(!0, { mode: "abort", port: "validate" + c.name, dataType: "json", data: g, context: f.currentForm, success: function(a) { var d, g, h, j = a === !0 || "true" === a; f.settings.messages[c.name][e] = i.originalMessage, j ? (h = f.formSubmitted, f.resetInternals(), f.toHide = f.errorsFor(c), f.formSubmitted = h, f.successList.push(c), f.invalid[c.name] = !1, f.showErrors()) : (d = {}, g = a || f.defaultMessage(c, { method: e, parameters: b }), d[c.name] = i.message = g, f.invalid[c.name] = !0, f.showErrors(d)), i.valid = j, f.stopRequest(c, j) } }, d)), "pending") } } }); var b, c = {}; a.ajaxPrefilter ? a.ajaxPrefilter(function(a, b, d) { var e = a.port; "abort" === a.mode && (c[e] && c[e].abort(), c[e] = d) }) : (b = a.ajax, a.ajax = function(d) { var e = ("mode" in d ? d : a.ajaxSettings).mode, f = ("port" in d ? d : a.ajaxSettings).port; return "abort" === e ? (c[f] && c[f].abort(), c[f] = b.apply(this, arguments), c[f]) : b.apply(this, arguments) }) });

//jquery.validate.unobtrusive
!function(a) { function e(a, e, n) { a.rules[e] = n, a.message && (a.messages[e] = a.message) } function n(a) { return a.replace(/^\s+|\s+$/g, "").split(/\s*,\s*/g) } function t(a) { return a.replace(/([!"#$%&'()*+,./:;<=>?@\[\\\]^`{|}~])/g, "\\$1") } function r(a) { return a.substr(0, a.lastIndexOf(".") + 1) } function i(a, e) { return 0 === a.indexOf("*.") && (a = a.replace("*.", e)), a } function o(e, n) { var r = a(this).find("[data-valmsg-for='" + t(n[0].name) + "']"), i = r.attr("data-valmsg-replace"), o = i ? a.parseJSON(i) !== !1 : null; r.removeClass("field-validation-valid").addClass("field-validation-error"), e.data("unobtrusiveContainer", r), o ? (r.empty(), e.removeClass("input-validation-error").appendTo(r)) : e.hide() } function d(e, n) { var t = a(this).find("[data-valmsg-summary=true]"), r = t.find("ul"); r && r.length && n.errorList.length && (r.empty(), t.addClass("validation-summary-errors").removeClass("validation-summary-valid"), a.each(n.errorList, function() { a("<li />").html(this.message).appendTo(r) })) } function s(e) { var n = e.data("unobtrusiveContainer"); if (n) { var t = n.attr("data-valmsg-replace"), r = t ? a.parseJSON(t) : null; n.addClass("field-validation-valid").removeClass("field-validation-error"), e.removeData("unobtrusiveContainer"), r && n.empty() } } function l(e) { var n = a(this), t = "__jquery_unobtrusive_validation_form_reset"; if (!n.data(t)) { n.data(t, !0); try { n.data("validator").resetForm() } finally { n.removeData(t) } n.find(".validation-summary-errors").addClass("validation-summary-valid").removeClass("validation-summary-errors"), n.find(".field-validation-error").addClass("field-validation-valid").removeClass("field-validation-error").removeData("unobtrusiveContainer").find(">*").removeData("unobtrusiveContainer") } } function m(e) { var n = a(e), t = n.data(v), r = a.proxy(l, e), i = p.unobtrusive.options || {}, m = function(n, t) { var r = i[n]; r && a.isFunction(r) && r.apply(e, t) }; return t || (t = { options: { errorClass: i.errorClass || "input-validation-error", errorElement: i.errorElement || "span", errorPlacement: function() { o.apply(e, arguments), m("errorPlacement", arguments) }, invalidHandler: function() { d.apply(e, arguments), m("invalidHandler", arguments) }, messages: {}, rules: {}, success: function() { s.apply(e, arguments), m("success", arguments) } }, attachValidation: function() { n.off("reset." + v, r).on("reset." + v, r).validate(this.options) }, validate: function() { return n.validate(), n.valid() } }, n.data(v, t)), t } var u, p = a.validator, v = "unobtrusiveValidation"; p.unobtrusive = { adapters: [], parseElement: function(e, n) { var t, r, i, o = a(e), d = o.parents("form")[0]; d && (t = m(d), t.options.rules[e.name] = r = {}, t.options.messages[e.name] = i = {}, a.each(this.adapters, function() { var n = "data-val-" + this.name, t = o.attr(n), s = {}; void 0 !== t && (n += "-", a.each(this.params, function() { s[this] = o.attr(n + this) }), this.adapt({ element: e, form: d, message: t, params: s, rules: r, messages: i })) }), a.extend(r, { __dummy__: !0 }), n || t.attachValidation()) }, parse: function(e) { var n = a(e), t = n.parents().addBack().filter("form").add(n.find("form")).has("[data-val=true]"); n.find("[data-val=true]").each(function() { p.unobtrusive.parseElement(this, !0) }), t.each(function() { var a = m(this); a && a.attachValidation() }) } }, u = p.unobtrusive.adapters, u.add = function(a, e, n) { return n || (n = e, e = []), this.push({ name: a, params: e, adapt: n }), this }, u.addBool = function(a, n) { return this.add(a, function(t) { e(t, n || a, !0) }) }, u.addMinMax = function(a, n, t, r, i, o) { return this.add(a, [i || "min", o || "max"], function(a) { var i = a.params.min, o = a.params.max; i && o ? e(a, r, [i, o]) : i ? e(a, n, i) : o && e(a, t, o) }) }, u.addSingleVal = function(a, n, t) { return this.add(a, [n || "val"], function(r) { e(r, t || a, r.params[n]) }) }, p.addMethod("__dummy__", function(a, e, n) { return !0 }), p.addMethod("regex", function(a, e, n) { var t; return this.optional(e) ? !0 : (t = new RegExp(n).exec(a), t && 0 === t.index && t[0].length === a.length) }), p.addMethod("nonalphamin", function(a, e, n) { var t; return n && (t = a.match(/\W/g), t = t && t.length >= n), t }), p.methods.extension ? (u.addSingleVal("accept", "mimtype"), u.addSingleVal("extension", "extension")) : u.addSingleVal("extension", "extension", "accept"), u.addSingleVal("regex", "pattern"), u.addBool("creditcard").addBool("date").addBool("digits").addBool("email").addBool("number").addBool("url"), u.addMinMax("length", "minlength", "maxlength", "rangelength").addMinMax("range", "min", "max", "range"), u.addMinMax("minlength", "minlength").addMinMax("maxlength", "minlength", "maxlength"), u.add("equalto", ["other"], function(n) { var o = r(n.element.name), d = n.params.other, s = i(d, o), l = a(n.form).find(":input").filter("[name='" + t(s) + "']")[0]; e(n, "equalTo", l) }), u.add("required", function(a) { ("INPUT" !== a.element.tagName.toUpperCase() || "CHECKBOX" !== a.element.type.toUpperCase()) && e(a, "required", !0) }), u.add("remote", ["url", "type", "additionalfields"], function(o) { var d = { url: o.params.url, type: o.params.type || "GET", data: {} }, s = r(o.element.name); a.each(n(o.params.additionalfields || o.element.name), function(e, n) { var r = i(n, s); d.data[r] = function() { var e = a(o.form).find(":input").filter("[name='" + t(r) + "']"); return e.is(":checkbox") ? e.filter(":checked").val() || e.filter(":hidden").val() || "" : e.is(":radio") ? e.filter(":checked").val() || "" : e.val() } }), e(o, "remote", d) }), u.add("password", ["min", "nonalphamin", "regex"], function(a) { a.params.min && e(a, "minlength", a.params.min), a.params.nonalphamin && e(a, "nonalphamin", a.params.nonalphamin), a.params.regex && e(a, "regex", a.params.regex) }), a(function() { p.unobtrusive.parse(document) }) }(jQuery);

// definition for the isdateafter validation rule
if ($.validator && $.validator.unobtrusive) {
    $.validator.addMethod('isdateafter', function(value, element, params) {
        value = Date.parse(value);

        var otherDate = Date.parse($(params.compareTo).val());

        if (isNaN(value) && isNaN(otherDate))
            return true;

        return value > otherDate || (value == otherDate && params.allowEqualDates);
    });

    $.validator.unobtrusive.adapters.add('isdateafter', ['propertytested', 'allowequaldates'], function(options) {
        options.rules['isdateafter'] = {
            'allowEqualDates': options.params['allowequaldates'],
            'compareTo': '#' + options.params['propertytested']
        };
        options.messages['isdateafter'] = options.message;
    });
}

// This must be applied to a form (or an object inside a form).
jQuery.fn.addHidden = function(name, value) {
    return this.each(function() {
        var input = $("<input>").attr("type", "hidden").attr("id", name).val(value);

        $(this).append($(input));
    });
};

//var ROOT_DOMAIN; // X0103966 - Error Create BAST
//if (location.pathname !== 'undefined' || location.pathname !== null || location.pathname !== '') ROOT_DOMAIN = location.protocol + '//' + location.host + '/' + location.pathname;

//ROOT_DOMAIN = location.protocol + '//' + location.host;

$("#btnSave").on('click', function(e) {
    if ($("#StartKEUR").val() === "" && $("#EndKEUR").val() === "" && $("#Action").val() == "0")
        $("#myModalKEUR").modal('show');
    else {
        $('.msgModal').text("Save");
        $('#submitButtonText').val("Save");
        $("#myModal").modal('show');
    }
});

$("#keurConfirm").click(function(e) {
    $("#myModalKEUR").modal('hide');
    $('.msgModal').text("Save");
    $('#submitButtonText').val("Save");
    $("#myModal").modal('show');
});

$('#confirmModalBast').click(function(e) {
    $("#myModal").modal('hide');
    $('form:first').trigger('submit');
});

$("#RPCPoliceNo").bind('input propertychange', function() {
    ClearElementValue("policeNumberDataRPL");
});

$('#btnOPLPoliceNo').on('click', function(e) {
    if ($("#IdOPLAgreement").val() == "" || $("#RPCPoliceNo").val() == "") {
        e.stopPropagation();

        return;
    }
});

function PopulatePrompt(GetData) {
    var col = null;
    var sor = null;
    var oTable = null;

    switch (GetData) {
        case "RegistrationNo":
            col = [
                { "mData" : "RegNo" },
                { "mData" : "RPCUnit.RPCPoliceNo" },
                { "mData" : "RPCUnit.ModelInfo.ModelName" },
                { "mData" : "OPLUnit.OPLPoliceNo" },
                { "mData" : "OPLAgreement.AgreementNumber" }
            ];
            sor = [[0, "asc"]];
            break;
        case "DSFOfficeData":
            col = [
                {
                    "mData"       : null,
                    "bSearchable" : false,
                    "bSortable"   : false,
                    "fnRender"    : function(aObj) {
                        return "<div class='text-right'></div>";
                    }
                },
                { "mData" : "BranchShortName" },
                { "mData" : "BranchName" }
            ];
            sor = [[1, "asc"]];
            break;
        case "policeNumberDataRPL":
            col = [
                { "mData" : "RPCPoliceNo" },
                { "mData" : "CreatedDate" }
            ];
            sor = [[0, "asc"]];
            break;
        case "ModelData":
            col = [
                { "mData" : "BrandName" },
                { "mData" : "ModelName" }
            ];
            sor = [[0, "asc"]];
            break;
        case "AgreementData":
            col = [
                { "mData" : "AgreementNumber" },
                { "mData" : "CustomerName" },
                { "mData" : "LastModifiedDate" }
            ];
            sor = [[2, "desc"]];
            break;
        case "PoliceNumberData":
            col = [
                { "mData" : "OPLPoliceNo" },
                { "mData" : "Status" }
            ];
            sor = [[0, "asc"]];
            break;
    }

    var config = {
        "bServerSide"     : true,
        "bProcessing"     : true,
        "aaSorting"       : sor,
        "bRetrieve"       : true,
        "sScrollY"        : 300,
        "sAjaxSource"     : serverRoot + "MGTOplUnitReplace/GetDataList/?getdata=" + GetData,
        "fnServerParams"  : function(aoData) {
            aoData.push(
                { "name": "IdOPLAgreement", "value": $("#IdOPLAgreement").val() },
                { "name": "IdRPCUnit", "value": $("#IdRPCUnit").val() }
            );
        },
        "sDom"            : "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
        "sPaginationType" : "full_numbers",
        "aoColumns"       : col,
        "fnServerData"    : function(sSource, aoData, fnCallback) {
            $.ajax({
                "dataType" : 'json',
                "type"     : "POST",
                "url"      : sSource,
                "data"     : aoData,
                "success"  : fnCallback,
                "timeout"  : 0,
                "error"    : handleAjaxError,
                "global"   : false
            });
        },
        "fnDrawCallback"  : function(oSettings) {
            if (GetData == "DSFOfficeData") {
                for (var i = oSettings._iDisplayStart, iLen = oSettings._iDisplayStart + oSettings.aiDisplay.length; i < iLen; i++) {
                    var nTr = oSettings.aoData[oSettings.aiDisplay[i - oSettings._iDisplayStart]].nTr;

                    $(nTr).find("td div").first().text(i + 1);
                }
            }
            $("#" + GetData + "-list_wrapper").find(".dataTables_scrollHeadInner").css("padding-right", "0px");
        }
    };

    oTable = $("#" + GetData + "-list").dataTable(config);
    oTable.fnDraw();

    $("#" + GetData + "-list tbody").delegate("tr", "click", function() {
        var data = oTable.fnGetData(this);

        ClearElementValue(GetData);

        if (data != null) {
            switch (GetData) {
                case "RegistrationNo":
                    $("#IdTb_MGT_RegRPC").val(data.IdTb_MGT_RegRPC == null ? "" : data.IdTb_MGT_RegRPC);
                    $("#RegNo").val(data.RegNo == null ? "" : data.RegNo);

                    if (data.IsActive == null ? false : data.IsActive) {
                        $("#statActive").prop("checked", true);
                        $("#statNotActive").prop("checked", false);
                    }
                    else {
                        $("#statActive").prop("checked", false);
                        $("#statNotActive").prop("checked", true);
                    }

                    SetData("DSFOfficeData", data.OPLBranch);
                    SetData("policeNumberDataRPL", data.RPCUnit);
                    SetData("AgreementData", data.OPLAgreement);
                    SetData("PoliceNumberData", data.OPLUnit);

                    break;
                case "DSFOfficeData":
                case "policeNumberDataRPL":
                case "ModelData":
                case "AgreementData":
                    SetData(GetData, data);

                    break;
                case "PoliceNumberData":
                    if (data.Status != "Registered")
                        SetData(GetData, data);
                    else
                        return;

                    break;
            }

            $("#" + GetData + "-list tbody").undelegate("tr", "click");
            $("#" + GetData).modal('hide');
        }
    });
}

function datagridReplacementUnit() {
    $('#table-list-replacementunit').each(function() {
        oTable1 = $(this).dataTable({
            "bServerSide"     : true,
            "bProcessing"     : true,
            "aaSorting"       : [[19, "desc"]],
            "sScrollXInner"   : "200%",
            "sAjaxSource"     : serverRoot + "MGTOplUnitReplace/ReplacementUnitAjaxHandler",
            "fnServerParams"  : function(aoData) {
                aoData.push(
                    { "name" : "ddlSearchCriteria", "value" : $("#ddlSearchCriteria").val() },
                    { "name" : "txtSearch",         "value" : $("#txtSearch").val() },
                    { "name" : "txtStartDate",      "value" : $("#txtStartDate").val() },
                    { "name" : "txtEndDate",        "value" : $("#txtEndDate").val() }
                );
            },
            "sDom"            : "<'row'<'col-sm-6'l><'col-sm-6'>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
            "sPaginationType" : "full_numbers",
            "bAutoWidth"      : false,
            "aoColumns"       : [
                { "mData" : "Branch" },
                { "mData" : "RegistrationNumber" },
                { "mData" : "ReplacementUnitPoliceNo" },
                { "mData" : "ModelUnit" },
                { "mData" : "AgreementNo" },
                { "mData" : "CustomerName" },
                { "mData" : "OPLUnitPoliceNo" },
                {
                    "mData"    : null,
                    "fnRender" : function(oObj) {
                        var LabelStatusActiveNotActive = "";

                        if (oObj.aData["StatusActiveNotActive"] == "Not Active") {
                            LabelStatusActiveNotActive += "<span class='label label-danger'>" + oObj.aData["StatusActiveNotActive"] + "</span>";
                        }
                        else if (oObj.aData["StatusActiveNotActive"] == "Active") {
                            LabelStatusActiveNotActive += "<span class='label label-success'>" + oObj.aData["StatusActiveNotActive"] + "</span>";
                        }

                        return LabelStatusActiveNotActive;
                    }
                },
                {
                    "mData"    : null,
                    "fnRender" : function(oObj) {
                        var LabelStatusReplacementUnit = "";

                        if (oObj.aData["StatusReplacementUnit"] == "customer" || oObj.aData["StatusReplacementUnit"] == "Customer") {
                            LabelStatusReplacementUnit += "<span class='label label-success'>" + oObj.aData["StatusReplacementUnit"] + "</span>";
                        }
                        else if (oObj.aData["StatusReplacementUnit"] == "Return" || oObj.aData["StatusReplacementUnit"] == "return") {
                            LabelStatusReplacementUnit += "<span class='label label-warning'>" + oObj.aData["StatusReplacementUnit"] + "</span>";
                        }
                        else if (oObj.aData["StatusReplacementUnit"] == "Workshop" || oObj.aData["StatusReplacementUnit"] == "workshop") {
                            LabelStatusReplacementUnit += "<span class='label label-primary'>" + oObj.aData["StatusReplacementUnit"] + "</span>";
                        }
                        else {
                            LabelStatusReplacementUnit += "<span class='label label-default'>" + oObj.aData["StatusReplacementUnit"] + "</span>";
                        }

                        return LabelStatusReplacementUnit;
                    }
                },
                { "mData" : "CompanyLocationUnit" },
                { "mData" : "CompanyLocationUnitSite" },
                { "mData" : "ReplacingUnit" },
                {
                    "mData"    : null,
                    "fnRender" : function(oObj) {
                        var LabelReplacementType = "";

                        if (oObj.aData["BASTOutStatus"] != "0" && oObj.aData["BASTOutStatus"] != "30") {
                            LabelReplacementType += "<span class='label label-success'>N/A</span>";
                        }
                        else {
                            if (oObj.aData["ReplacementType"] == "General Repair") {
                                LabelReplacementType += "<span class='label label-warning'>" + oObj.aData["ReplacementType"] + "</span>";
                            }
                            else if (oObj.aData["ReplacementType"] == "N/A") {
                                LabelReplacementType += "<span class='label label-success'>" + oObj.aData["ReplacementType"] + "</span>";
                            }
                            else if (oObj.aData["ReplacementType"] == "Special Case") {
                                LabelReplacementType += "<span class='label label-danger'>" + oObj.aData["ReplacementType"] + "</span>";
                            }
                            else if (oObj.aData["ReplacementType"] == "Insurance Claim") {
                                LabelReplacementType += "<span class='label label-primary'>" + oObj.aData["ReplacementType"] + "</span>";
                            }
                            else {
                                LabelReplacementType += "<span class='label label-default'>" + oObj.aData["ReplacementType"] + "</span>";
                            }
                        }

                        return LabelReplacementType;
                    }
                },
                { "mData" : "UsagePeriodStartDate" },
                {
                    "mData": "UsagePeriodEstimation",
                    "bSearchable": false,
                    "bSortable": false,
                    "fnRender": function(oObj) {
                        if (oObj.aData["UsagePeriodEstimation"] === "")
                            return "N/A";
                        else
                            return oObj.aData["UsagePeriodEstimation"];
                    }
                },
                { "mData": "UsagePeriodEndDate" },
                { "mData": "CreateBY" },
                { "mData": "CreateDate" },
                { "mData": "LastModifiedBy" },
                { "mData": "LastModifiedDate" },
                {
                    "mData": null,
                    "bSearchable": false,
                    "bSortable": false,
                    "fnRender": function(oObj) {
                        var id = oObj.aData["Id_Tb_MGT_RegRPC"];
                        var status = oObj.aData["StatusReplacementUnit"];
                        var isEditActive = oObj.aData["isEditActive"];
                        var createParam = 1;
                        var editParam = 2;
                        var viewParam = 3;
                        var reportParam = 4;
                        var createdBy = oObj.aData["CreateBY"];
                        var StatusBAST = oObj.aData["BASTOutStatus"];
                        var StatusBASTIn = oObj.aData["BASTInStatus"];
                        var CreateStatus = oObj.aData["CreateStatus"];
                        iCount++;
                        var htmlButtonAction = '';
                        switch (status) {
                            case "Customer":
                                if (StatusBAST == null && StatusBASTIn == null && CreateStatus == true) {
                                    htmlButtonAction += "<a title='Create BAST' class='btn btn-danger btn-xs' data-target='#BASTSelection' data-toggle='modal' onclick='openModal(" + createParam + ", " + id + ")'><i class='fa fa-plus'></i></a>";
                                } else if (StatusBAST != null && StatusBASTIn == null && CreateStatus == true) {
                                    htmlButtonAction += "<a title='Create BAST' class='btn btn-danger btn-xs' data-target='#BASTSelection' data-toggle='modal' onclick='openModal(" + createParam + ", " + id + ")'><i class='fa fa-plus'></i></a>";
                                } else if (StatusBAST != null && StatusBASTIn == null && CreateStatus == false) {
                                    htmlButtonAction += "<a title='Create BAST' href='#' class='btn bg-light btn-xs disabled'><i class='fa fa-plus'></i></a>";
                                } else if (StatusBAST == "30" && StatusBASTIn == null && CreateStatus == true) {
                                    htmlButtonAction += "<a title='Create BAST' class='btn btn-danger btn-xs' data-target='#BASTSelection' data-toggle='modal' onclick='openModal(" + createParam + ", " + id + ")'><i class='fa fa-plus'></i></a>";
                                } else if (StatusBAST == "30" && StatusBASTIn == "0" && CreateStatus == false) {
                                    htmlButtonAction += "<a title='Create BAST' href='#' class='btn bg-light btn-xs disabled'><i class='fa fa-plus'></i></a>";
                                } else if (StatusBAST == "0" && StatusBASTIn == "0" && CreateStatus == true) {
                                    htmlButtonAction += "<a title='Create BAST' class='btn btn-danger btn-xs' data-target='#BASTSelection' data-toggle='modal' onclick='openModal(" + createParam + ", " + id + ")'><i class='fa fa-plus'></i></a>";
                                } else if (StatusBAST == "30" && StatusBASTIn == "30" && CreateStatus == true) {
                                    htmlButtonAction += "<a title='Create BAST' class='btn btn-danger btn-xs' data-target='#BASTSelection' data-toggle='modal' onclick='openModal(" + createParam + ", " + id + ")'><i class='fa fa-plus'></i></a>";
                                } else if (StatusBAST == "4") {
                                    htmlButtonAction += "<a title='Create BAST' class='btn btn-danger btn-xs' data-target='#BASTSelection' data-toggle='modal' onclick='openModal(" + createParam + ", " + id + ")'><i class='fa fa-plus'></i></a>";
                                } else {
                                    htmlButtonAction += "<a title='Create BAST' href='#' class='btn bg-light btn-xs disabled'><i class='fa fa-plus'></i></a>";
                                }
                                break;
                            case "Return":
                                if (StatusBAST == null && StatusBASTIn == null && CreateStatus == true) {
                                    htmlButtonAction += "<a title='Create BAST' class='btn btn-danger btn-xs' data-target='#BASTSelection' data-toggle='modal' onclick='openModal(" + createParam + ", " + id + ")'><i class='fa fa-plus'></i></a>";
                                } else if (StatusBAST != null && StatusBASTIn == null && CreateStatus == false) {
                                    htmlButtonAction += "<a title='Create BAST' href='#' class='btn bg-light btn-xs disabled'><i class='fa fa-plus'></i></a>";
                                } else if (StatusBAST == null && StatusBASTIn == null && CreateStatus == false) {
                                    htmlButtonAction += "<a title='Create BAST' href='#' class='btn bg-light btn-xs disabled'><i class='fa fa-plus'></i></a>";
                                } else if (StatusBAST == "30" && StatusBASTIn == null && CreateStatus == true) {
                                    htmlButtonAction += "<a title='Create BAST' class='btn btn-danger btn-xs' data-target='#BASTSelection' data-toggle='modal' onclick='openModal(" + createParam + ", " + id + ")'><i class='fa fa-plus'></i></a>";
                                } else if (StatusBAST == "30" && StatusBASTIn == "0" && CreateStatus == false) {
                                    htmlButtonAction += "<a title='Create BAST' href='#' class='btn bg-light btn-xs disabled'><i class='fa fa-plus'></i></a>";
                                } else if (StatusBAST == "0" && StatusBASTIn == "0" && CreateStatus == true) {
                                    htmlButtonAction += "<a title='Create BAST' class='btn btn-danger btn-xs' data-target='#BASTSelection' data-toggle='modal' onclick='openModal(" + createParam + ", " + id + ")'><i class='fa fa-plus'></i></a>";
                                } else if (StatusBAST == "30" && StatusBASTIn == "30" && CreateStatus == true) {
                                    htmlButtonAction += "<a title='Create BAST' class='btn btn-danger btn-xs' data-target='#BASTSelection' data-toggle='modal' onclick='openModal(" + createParam + ", " + id + ")'><i class='fa fa-plus'></i></a>";
                                } else if (StatusBAST == "4") {
                                    htmlButtonAction += "<a title='Create BAST' class='btn btn-danger btn-xs' data-target='#BASTSelection' data-toggle='modal' onclick='openModal(" + createParam + ", " + id + ")'><i class='fa fa-plus'></i></a>";
                                } else if (StatusBAST != null && StatusBASTIn == null && CreateStatus == false) {
                                    htmlButtonAction += "<a title='Create BAST' href='#' class='btn bg-light btn-xs disabled'><i class='fa fa-plus'></i></a>";
                                } else {
                                    htmlButtonAction += "<a title='Create BAST' href='#' class='btn bg-light btn-xs disabled'><i class='fa fa-plus'></i></a>";
                                }
                                break;
                            case "Workshop":
                                htmlButtonAction += "<a title='Create BAST' href='#' class='btn bg-light btn-xs disabled'><i class='fa fa-plus'></i></a>";
                                break;
                            default:
                                htmlButtonAction += "<a title='Create BAST' href='#' class='btn bg-light btn-xs disabled'><i class='fa fa-plus'></i></a>";
                        }

                        //if (status === 'customer' || oObj.aData["StatusReplacementUnit"] == "Customer" || status === 'return' || oObj.aData["StatusReplacementUnit"] == "Return" && oObj.aData["BASTOutStatus"] == "0" || oObj.aData["BASTOutStatus"] == "30" || StatusBAST == "4" || StatusBAST == null && StatusBASTIn != null || StatusBASTIn == "30" || StatusBASTIn == "0") {
                        //        htmlButtonAction += "<a title='Create BAST' class='btn btn-danger btn-xs' data-target='#BASTSelection' data-toggle='modal' onclick='openModal(" + createParam + ", " + id + ")'><i class='fa fa-plus'></i></a>";
                        //} else if (status === 'customer' || oObj.aData["StatusReplacementUnit"] == "Customer" && oObj.aData["BASTOutStatus"] != "0" || oObj.aData["BASTOutStatus"] != "30" || StatusBAST != null && StatusBASTIn === null || StatusBASTIn != "0" || StatusBASTIn != "30" ) {
                        //    htmlButtonAction += "<a title='Create BAST' href='#' class='btn bg-light btn-xs disabled'><i class='fa fa-plus'></i></a>";
                        //}
                        //else if (status === 'return' || oObj.aData["StatusReplacementUnit"] == "Return" && oObj.aData["BASTOutStatus"] != "0" || oObj.aData["BASTOutStatus"] != "30" || StatusBASTIn == "30" || StatusBAST == null) {
                        //    htmlButtonAction += "<a title='Create BAST' class='btn btn-danger btn-xs' data-target='#BASTSelection' data-toggle='modal' onclick='openModal(" + createParam + ", " + id + ")'><i class='fa fa-plus'></i></a>";
                        //}

                        //if (status === 'workshop' || oObj.aData["StatusReplacementUnit"] == "Workshop") {
                        //    htmlButtonAction += "<a title='Create BAST' href='#' class='btn bg-light btn-xs disabled'><i class='fa fa-plus'></i></a>";
                        //}

                        //if (status === null ) {
                        //    htmlButtonAction += "<a title='Create BAST' class='btn btn-danger btn-xs' data-target='#BASTSelection' data-toggle='modal' onclick='openModal(" + createParam + ", " + id + ")'><i class='fa fa-plus'></i></a>";
                        //}

                        if (isEditActive && createdBy == Usernamevar && StatusBAST != "30" && StatusBASTIn != "30") {
                            if (oObj.aData["StatusReplacementUnit"] == "Customer" || oObj.aData["StatusReplacementUnit"] == "Return" || status === srv_approved) {
                                htmlButtonAction += "&nbsp;<a title='Edit' class='btn btn-primary btn-xs' data-target='#BASTSelection' data-toggle='modal' onclick='openModal(" + editParam + ", " + id + ")'><i class='fa fa-edit'></i></a>";
                            }

                            if (oObj.aData["StatusReplacementUnit"] == "Workshop") {
                                htmlButtonAction += "&nbsp;<a title='Edit' href='#' class='btn bg-light btn-xs disabled' ><i class='fa fa-edit'></i></a>";
                            }
                        } else if (isEditActive && createdBy == Usernamevar && StatusBAST == "30" && StatusBASTIn == null) {
                            htmlButtonAction += "&nbsp;<a title='Edit' class='btn btn-primary btn-xs' data-target='#BASTSelection' data-toggle='modal' onclick='openModal(" + editParam + ", " + id + ")'><i class='fa fa-edit'></i></a>";
                        } else if (isEditActive && createdBy == Usernamevar && StatusBAST == "30" && StatusBASTIn != "30") {
                            htmlButtonAction += "&nbsp;<a title='Edit' class='btn btn-primary btn-xs' data-target='#BASTSelection' data-toggle='modal' onclick='openModal(" + editParam + ", " + id + ")'><i class='fa fa-edit'></i></a>";
                        }
                        else {
                            htmlButtonAction += "&nbsp;<a title='Edit' href='#' class='btn bg-light btn-xs disabled' ><i class='fa fa-edit'></i></a>";
                        }

                        //if (isEditActive && createdBy == Usernamevar) {
                        //    if (status === 'customer' || oObj.aData["StatusReplacementUnit"] == "Customer" || status === 'return' || oObj.aData["StatusReplacementUnit"] == "Return" || status === null) {
                        //        htmlButtonAction += "&nbsp;<a title='Edit' class='btn btn-primary btn-xs' data-target='#BASTSelection' data-toggle='modal' onclick='openModal(" + editParam + ", " + id + ")'><i class='fa fa-edit'></i></a>";
                        //    }
                        //    if (status === 'workshop' || oObj.aData["StatusReplacementUnit"] == "Workshop") {
                        //        htmlButtonAction += "&nbsp;<a title='Edit' href='#' class='btn bg-light btn-xs disabled' ><i class='fa fa-edit'></i></a>";
                        //    }
                        //}
                        //else {
                        //    htmlButtonAction += "&nbsp;<a title='Edit' href='#' class='btn bg-light btn-xs disabled' ><i class='fa fa-edit'></i></a>";
                        //}

                        htmlButtonAction += "&nbsp;<a title='View' href='#' class='btn btn-info btn-xs' data-target='#BAST_Print' data-toggle='modal' onclick='openModalReport(" + viewParam + ", " + id + ")'><i class='fa fa-bars'></i></a>";
                        htmlButtonAction += "&nbsp;<a title='History' href='#' class='btn btn-danger btn-xs' onclick='ShowHistory(" + id + ");return false;' data-target='#historyreplacementunitusagemodal' data-toggle='modal' type='button' ><i class='fa fa-book'></i></a>";
                        htmlButtonAction += "<a a title='Print Report' href='#' class='btn btn-white btn-xs' data-target='#BAST_Print' data-toggle='modal' onclick='openModalReport(" + reportParam + ", " + id + ")'><i class='fa fa-print'></i></a>";

                        return htmlButtonAction;
                    }
                },
                { "mData": "SortableCreateDate", "bVisible": false },
            ],
            "aoColumnDefs": [
                { "sWidth": "50%", "aTargets": [0] },
                { "sClass": "center", "aTargets": [1] }
            ],
            "fnServerData": function(sSource, aoData, fnCallback) {
                $.ajax({
                    "dataType": 'json',
                    "type": "POST",
                    "url": sSource,
                    "data": aoData,
                    "global": false,
                    "success": fnCallback,
                    "timeout": 0, // optional if you want to handle timeouts (which you should)
                    "error": handleAjaxError // this sets up jQuery to give me errors
                });
            }
        });
        var htmlTemp1 = '<div id="paging1" class="dataTables_wrapper row table-list-replacementunit">';
        var fakePagination1 = $('#table-list-replacementunit_wrapper > div:eq(1)').html();
        var datatableInfo1 = $('#table-list-replacementunit_wrapper > div:eq(1) > div:eq(0) > #table-list-replacementunit_info');
        $('#table-list-replacementunit_wrapper > div:eq(1)').prop('style', 'display: none;');
        htmlTemp1 += fakePagination1 + '</div>';
        $('.table-replacement-responsive').append(htmlTemp1);
        $('.table-replacement-responsive > div:eq(1) > div:eq(1) > #table-list-replacementunit_paginate').remove();
        $('.table-replacement-responsive > #paging1 > div:eq(1)').append($('#table-list-replacementunit_paginate'));
        $('.table-replacement-responsive > div:eq(1) > div:eq(0) > #table-list-replacementunit_info').replaceWith(datatableInfo1);
        $('#table-list-replacementunit_wrapper').css({ "overflow": "auto", "height": "375px" });
    });
}

function datagridOPLUnit() {
    $('#table-list-oplunit').each(function() {
        oTable2 = $(this).dataTable({
            "bServerSide": true,
            "bProcessing": true,
            "aaSorting": [[10, "desc"]],
            "sScrollXInner": "200%",
            "sAjaxSource": "MGTOplUnitReplace/OplUnitAjaxHandler",
            "fnServerParams": function(aoData) {
                aoData.push(
                    { "name": "ddlSearchCriteria", "value": $("#ddlSearchCriteria").val() },
                    { "name": "txtSearch", "value": $("#txtSearch").val() },
                    { "name": "ddlSubSearchCriteria", "value": $("#ddlSearchCriteria").val() == 10 || $("#ddlSearchCriteria").val() == 11 ? $("#ddlSubSearchCriteria").val() : $("#ddlSubSearchCriteria option:selected").text() },
                    { "name": "txtStartDate", "value": $("#txtStartDate").val() },
                    { "name": "txtEndDate", "value": $("#txtEndDate").val() }
                );
            },
            "sDom": "<'row'<'col-sm-6'l><'col-sm-6'>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
            "sPaginationType": "full_numbers",
            "bAutoWidth": false,
            "aoColumns": [
                { "mData": "Branch" },
                { "mData": "RegistrationNumber" },
                { "mData": "CustomerName" },
                { "mData": "PoliceNo" },
                { "mData": "UnitDescription" },
                { "mData": "ChasisNo" },
                { "mData": "EngineNo" },
                { "mData": "StartDate" },
                { "mData": "EndDate" },
                { "mData": "Allocation" },
                { "mData": "Status" },
                { "mData": "LocationProvince" },
                { "mData": "LocationCity" },
                { "mData": "LocationParking" },
                { "mData": "Aging" },
                { "mData": "ContractStatus" },
                { "mData": "Remark" },
                {
                    "mData": null,
                    "bSearchable": false,
                    "bSortable": false,
                    "sClass": "center",
                    "fnRender": function(oObj) {
                        var idopl = oObj.aData["IdOPLAgreement"];
                        var idunit = oObj.aData["IdTb_OPL_Unit"];
                        var isEdit = oObj.aData["IsEdit"];
                        var typeview = 1;
                        var isReverse = 0;

                        var htmlButtonAction = "<a title='Detail' href='#' onclick='ShowDataOPLUnit(" + idopl + "," + idunit + "," + typeview + "," + isReverse + ");return false;' data-target='#dataoplunitmodal' data-toggle='modal' class='btn btn-info btn-xs'><i class='fa fa-bars'></i></a>";

                        if (isEdit) {
                            typeview = 0;
                            htmlButtonAction += "&nbsp;<a title='Edit' href='#' onclick='ShowDataOPLUnit(" + idopl + "," + idunit + "," + typeview + "," + isReverse + ");return false;' data-target='#dataoplunitmodal' data-toggle='modal' class='btn btn-primary btn-xs'><i class='fa fa-edit'></i></a>";
                        } else {
                            htmlButtonAction += "&nbsp;<span class='btn btn-primary disabled btn-xs'><i class='fa fa-edit'></i></span>";
                        }

                        return htmlButtonAction;
                    }
                },
                {
                    "mData": null,
                    "bSearchable": false,
                    "bSortable": false,
                    "sClass": "center",
                    "fnRender": function(oObj) {
                        var idoplH = oObj.aData["IdOPLAgreement"];
                        var idunitH = oObj.aData["IdTb_OPL_Unit"];
                        var status = oObj.aData["IdTb_OPL_Unit"];

                        var htmlButtonHistory = "<div style='word-wrap: break-word; white-space: nowrap;'>";

                        htmlButtonHistory += "<a title='Contract History' href='#' onclick='ShowDataHistoryOPLUnit(" + idoplH + "," + idunitH + "," + 1 + "," + status + ");return false;' data-target='#historyoplmodal' data-toggle='modal' class='btn btn-danger btn-xs'><i class='fa fa-book'></i></a>&nbsp;";
                        htmlButtonHistory += "<a title='Daily Record Car History' href='#' onclick='ShowDataHistoryOPLUnit(" + idoplH + "," + idunitH + "," + 2 + "," + status + ");return false;' data-target='#historyoplmodal' data-toggle='modal' class='btn btn-danger btn-xs'><i class='fa fa-book'></i></a>&nbsp;";
                        htmlButtonHistory += "<a title='Maintenance History' href='#' onclick='ShowDataHistoryOPLUnit(" + idoplH + "," + idunitH + "," + 3 + "," + status + ");return false;' data-target='#historyoplmodal' data-toggle='modal' class='btn btn-danger btn-xs'><i class='fa fa-book'></i></a>&nbsp;";

                        return htmlButtonHistory += "</div>";
                    }
                },
                { "mData": "SortableCreateDate", "bVisible": false },
            ],
            "aoColumnDefs": [
                { "sClass": "center", "aTargets": [1] }
            ],
            "fnServerData": function(sSource, aoData, fnCallback) {
                $.ajax({
                    "dataType": 'json',
                    "type": "POST",
                    "url": sSource,
                    "data": aoData,
                    "global": false,
                    "success": fnCallback,
                    "timeout": 0, // optional if you want to handle timeouts (which you should)
                    "error": handleAjaxError // this sets up jQuery to give me errors
                });
            }
        });
        var htmlTemp2 = '<div id="paging2" class="dataTables_wrapper row table-oplunit-responsive">';
        var fakePagination2 = $('#table-list-oplunit_wrapper > div:eq(1)').html();
        var datatableInfo2 = $('#table-list-oplunit_wrapper > div:eq(1) > div:eq(0) > #table-list-oplunit_info');
        $('#table-list-oplunit_wrapper > div:eq(1)').prop('style', 'display: none;');
        htmlTemp2 += fakePagination2 + '</div>';
        $('.table-oplunit-responsive').append(htmlTemp2);
        $('.table-oplunit-responsive > div:eq(1) > div:eq(1) > #table-list-oplunit_paginate').remove();
        $('.table-oplunit-responsive > #paging2 > div:eq(1)').append($('#table-list-oplunit_paginate'));
        $('.table-oplunit-responsive > div:eq(1) > div:eq(0) > #table-list-oplunit_info').replaceWith(datatableInfo2);
        $('#table-list-oplunit_wrapper').css({ "overflow": "auto", "height": "375px" });
    });
}

function datagridDisposed() {
    $('#table-list-disposed').each(function() {
        oTable2 = $(this).dataTable({
            "bServerSide": true,
            "bProcessing": true,
            "aaSorting": [[10, "desc"]],
            "sScrollXInner": "200%",
            "sAjaxSource": "MGTOplUnitReplace/OplDisposedAjaxHandler",
            "fnServerParams": function(aoData) {
                aoData.push(
                    { "name": "ddlSearchCriteria", "value": $("#ddlSearchCriteria").val() },
                    { "name": "txtSearch", "value": $("#txtSearch").val() },
                    { "name": "ddlSubSearchCriteria", "value": $("#ddlSearchCriteria").val() == 10 || $("#ddlSearchCriteria").val() == 11 ? $("#ddlSubSearchCriteria").val() : $("#ddlSubSearchCriteria option:selected").text() },
                    { "name": "txtStartDate", "value": $("#txtStartDate").val() },
                    { "name": "txtEndDate", "value": $("#txtEndDate").val() }
                );
            },
            "sDom": "<'row'<'col-sm-6'l><'col-sm-6'>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
            "sPaginationType": "full_numbers",
            "bAutoWidth": false,
            "aoColumns": [
                { "mData": "RegistrationNumber" },
                { "mData": "CustomerName" },
                { "mData": "UnitDescription" },
                { "mData": "ModelYear" },
                { "mData": "ChasisNo" },
                { "mData": "EngineNo" },
                { "mData": "PoliceNo" },
                { "mData": "SoldPrice" },
                { "mData": "SoldDate" },
                { "mData": "BookValue" },
                { "mData": "GainLos" },
                { "mData": "BuyerName" },
                { "mData": "Status" },
                { "mData": "AuctionNumber" },
                { "mData": "Aging" },
                {
                    "mData": null,
                    "bSearchable": false,
                    "bSortable": false,
                    "sClass": "center",
                    "fnRender": function(oObj) {
                        var idopl = oObj.aData["IdOPLAgreement"];
                        var idunit = oObj.aData["IdTb_OPL_Unit"];
                        var isEdit = oObj.aData["IsEdit"];
                        var typeview = 1;
                        var isReverse = 1;
                        var htmlButtonAction = "";

                        if (isEdit) {
                            htmlButtonAction = "<a title='Reverse' href='#' onclick='ShowDataOPLUnit(" + idopl + "," + idunit + "," + typeview + "," + isReverse + ");return false;' data-target='#dataoplunitmodal' data-toggle='modal' class='btn btn-info btn-xs'><i class='fa fa-bars'></i></a>";
                        } else {
                            htmlButtonAction += "&nbsp;<span class='btn btn-info disabled btn-xs'><i class='fa fa-bars'></i></span>";
                        }

                        return htmlButtonAction;
                    }
                },
                {
                    "mData": null,
                    "bSearchable": false,
                    "bSortable": false,
                    "sClass": "center",
                    "fnRender": function(oObj) {
                        var idoplH = oObj.aData["IdOPLAgreement"];
                        var idunitH = oObj.aData["IdTb_OPL_Unit"];
                        var status = oObj.aData["IdTb_OPL_Unit"];

                        var htmlButtonHistory = "<div style='word-wrap: break-word; white-space: nowrap;'>";
                        // start add Upload Function by Agung

                        htmlButtonHistory += "<a title='Contract History' href='#' onclick='ShowDataHistoryOPLUnit(" + idoplH + "," + idunitH + "," + 1 + "," + status + ");return false;' data-target='#historyoplmodal' data-toggle='modal' class='btn btn-danger btn-xs'><i class='fa fa-book'></i></a>&nbsp;";
                        htmlButtonHistory += "<a title='Daily Record Car History' href='#' onclick='ShowDataHistoryOPLUnit(" + idoplH + "," + idunitH + "," + 2 + "," + status + ");return false;' data-target='#historyoplmodal' data-toggle='modal' class='btn btn-danger btn-xs'><i class='fa fa-book'></i></a>&nbsp;";
                        htmlButtonHistory += "<a title='Maintenance History' href='#' onclick='ShowDataHistoryOPLUnit(" + idoplH + "," + idunitH + "," + 3 + "," + status + ");return false;' data-target='#historyoplmodal' data-toggle='modal' class='btn btn-danger btn-xs'><i class='fa fa-book'></i></a>&nbsp;";

                        // end add Upload Function by Agung
                        return htmlButtonHistory += "</div>";
                    }
                },
                { "mData": "SortableCreateDate", "bVisible": false },
            ],
            "aoColumnDefs": [
                { "sClass": "center", "aTargets": [1] }
            ],
            "fnServerData": function(sSource, aoData, fnCallback) {
                $.ajax({
                    "dataType": 'json',
                    "type": "POST",
                    "url": sSource,
                    "data": aoData,
                    "global": false,
                    "success": fnCallback,
                    "timeout": 0, // optional if you want to handle timeouts (which you should)
                    "error": handleAjaxError // this sets up jQuery to give me errors
                });
            }
        });
        var htmlTemp2 = '<div id="paging3" class="dataTables_wrapper row table-disposed-responsive">';
        var fakePagination2 = $('#table-list-disposed_wrapper > div:eq(1)').html();
        var datatableInfo2 = $('#table-list-disposed_wrapper > div:eq(1) > div:eq(0) > #table-list-disposed_info');
        $('#table-list-disposed_wrapper > div:eq(1)').prop('style', 'display: none;');
        htmlTemp2 += fakePagination2 + '</div>';
        $('.table-disposed-responsive').append(htmlTemp2);
        $('.table-disposed-responsive > div:eq(1) > div:eq(1) > #table-list-disposed_paginate').remove();
        $('.table-disposed-responsive > #paging3 > div:eq(1)').append($('#table-list-disposed_paginate'));
        $('.table-disposed-responsive > div:eq(1) > div:eq(0) > #table-list-disposed_info').replaceWith(datatableInfo2);
        $('#table-list-disposed_wrapper').css({ "overflow": "auto", "height": "375px" });
    });
}

function HistoryUnitReplacementList(a) {
    var config = {
        "bServerSide": true,
        "bProcessing": true,
        //"aaSorting": [[7, "desc"],[8, "desc"], [9, "desc"]],
        "bRetrieve": true,
        "sScrollY": 200,
        "sAjaxSource": serverRoot + "MGTOplUnitReplace/HistoryReplacementUnitList/?id=" + a,
        "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
        "sPaginationType": "full_numbers",
        "bAutoWidth": false,
        "aoColumns": [
            { "mData": "Status" },
            { "mData": "CompanyName" },
            { "mData": "SiteLocation" },
            { "mData": "Replacing" },
            { "mData": "ReplacingType" },
            {
                "mData": "StartDate",
                "bSortable": false
            },
            {
                "mData": "EstimateDate",
                "bSortable": false
            },
            {
                "mData": "EndDate",
                "bSortable": false
            },
            {
                "mData": "UpdateDate",
                "bSortable": false
            },
            { "mData": "UpdateBy" },
        ],
        "fnServerData": function(sSource, aoData, fnCallback) {
            $.ajax({
                "dataType": 'json',
                "type": "POST",
                "url": sSource,
                "data": aoData,
                "success": fnCallback,
                "timeout": 0,
                "error": handleAjaxError,
                "global": false
            });
        }
    };
    if ($.fn.dataTable.fnIsDataTable(document.getElementById("history-list"))) {
        $("#history-list").dataTable().fnClearTable();
        $("#history-list").dataTable().fnDestroy();
        $('#history-list').dataTable(config).fnDraw();
    } else {
        $('#history-list').dataTable(config).fnDraw();
    }
}

function SetData(GetData, DataSource) {
    if (DataSource != null) {
        switch (GetData) {
            case "DSFOfficeData":
                $("#IdTb_OPL_Branch").val(!DataSource.IdTb_OPL_Branch ? "" : DataSource.IdTb_OPL_Branch);
                $("#BranchName").val(!DataSource.BranchName ? "" : DataSource.BranchName);
                break;
            case "policeNumberDataRPL":
                $("#IdRPCUnit").val(!DataSource.IdRPCUnit ? "" : DataSource.IdRPCUnit);
                $("#Location").val(!DataSource.Location ? "" : DataSource.Location);
                $("#RPCPoliceNo").val(!DataSource.RPCPoliceNo ? "" : DataSource.RPCPoliceNo);
                if (DataSource.ModelInfo) {
                    $("#IdProduct").val(!DataSource.ModelInfo.IdProduct ? "" : DataSource.ModelInfo.IdProduct);
                    $("#ModelName").val(!DataSource.ModelInfo.ModelName ? "" : DataSource.ModelInfo.ModelName);
                }
                $("#EngineNumber").val(!DataSource.EngineNumber ? "" : DataSource.EngineNumber);
                $("#ChassisNumber").val(!DataSource.ChassisNumber ? "" : DataSource.ChassisNumber);
                $("#Colour").val(!DataSource.Colour ? "" : DataSource.Colour);
                $("#StartSTNK").datepicker('setDate', !DataSource.StartSTNK ? null : new Date(DataSource.StartSTNK));
                $("#EndSTNK").datepicker('setDate', !DataSource.EndSTNK ? null : new Date(DataSource.EndSTNK));
                $("#StartKEUR").datepicker('setDate', !DataSource.StartKEUR ? null : new Date(DataSource.StartKEUR));
                $("#EndKEUR").datepicker('setDate', !DataSource.EndKEUR ? null : new Date(DataSource.EndKEUR));
                $("#CompanyInsurance").val(!DataSource.CompanyInsurance ? "" : DataSource.CompanyInsurance);
                $("#InsuranceNumber").val(!DataSource.InsuranceNumber ? "" : DataSource.InsuranceNumber);
                $("#StartInsurance").datepicker('setDate', !DataSource.StartInsurance ? null : new Date(DataSource.StartInsurance));
                $("#EndInsurance").datepicker('setDate', !DataSource.EndInsurance ? null : new Date(DataSource.EndInsurance));
                break;
            case "ModelData":
                $("#IdProduct").val(!DataSource.IdProduct ? "" : DataSource.IdProduct);
                $("#ModelName").val(!DataSource.ModelName ? "" : DataSource.ModelName);
                break;
            case "AgreementData":
                $("#IdOPLAgreement").val(!DataSource.IdOPLAgreement ? "" : DataSource.IdOPLAgreement);
                $("#IdCustomer").val(!DataSource.IdCustomer ? "" : DataSource.IdCustomer);
                $("#AgreementNumber").val(!DataSource.AgreementNumber ? "" : DataSource.AgreementNumber);
                $("#CustomerName").val(!DataSource.CustomerName ? "" : DataSource.CustomerName);
                break;
            case "PoliceNumberData":
                $("#IdOPLUnit").val(!DataSource.IdOPLUnit ? "" : DataSource.IdOPLUnit);
                $("#OPLPoliceNo").val(!DataSource.OPLPoliceNo ? "" : DataSource.OPLPoliceNo);
                $("#OPLModelName").val(!DataSource.OPLModelName ? "" : DataSource.OPLModelName);
                break;
        }
    }
}

function ClearElementValue(GetData) {
    switch (GetData) {
        case "Action":
            $("#IdTb_MGT_RegRPC").val(null);
            $("#RegNo").val(null);
            $("#statActive").prop("checked", false);
            $("#statNotActive").prop("checked", false);
            $("#RPCPoliceNo").val(null);
            $("#BranchName").val(null);
            $("#AgreementNumber").val(null);
            ClearElementValue("DSFOfficeData");
            ClearElementValue("policeNumberDataRPL");
            ClearElementValue("AgreementData");
            ClearValidation(GetData);
            break;
        case "DSFOfficeData":
            $("#IdTb_OPL_Branch").val(null);
            ClearValidation(GetData);
            break;
        case "policeNumberDataRPL":
            $("#IdRPCUnit").val(null);
            $("#Location").val(null);
            $("#IdProduct").val(null);
            $("#ModelName").val(null);
            $("#EngineNumber").val(null);
            $("#ChassisNumber").val(null);
            $("#Colour").val(null);
            $("#StartSTNK").datepicker('setDate', null);
            $("#EndSTNK").datepicker('setDate', null);
            $("#StartKEUR").datepicker('setDate', null);
            $("#EndKEUR").datepicker('setDate', null);
            $("#CompanyInsurance").val(null);
            $("#InsuranceNumber").val(null);
            $("#StartInsurance").datepicker('setDate', null);
            $("#EndInsurance").datepicker('setDate', null);
            ClearElementValue("ModelData");
            ClearValidation(GetData);
            break;
        case "ModelData":
            $("#IdProduct").val(null);
            ClearValidation(GetData);
            break;
        case "AgreementData":
            $("#IdOPLAgreement").val(null);
            $("#IdCustomer").val(null);
            $("#CustomerName").val(null);
            $("#OPLPoliceNo").val(null);
            ClearElementValue("PoliceNumberData");
            ClearValidation(GetData);
            break;
        case "PoliceNumberData":
            $("#IdOPLUnit").val(null);
            $("#OPLModelName").val(null);
            ClearValidation(GetData);
            break;
    }
}

function ClearValidation(GetData) {
    switch (GetData) {
        case "Action":
            $(".field-validation-error").addClass("field-validation-valid");
            $(".field-validation-error").removeClass("field-validation-error");
            $(".input-validation-error").removeClass("input-validation-error");
            break;
        case "DSFOfficeData":
            $("#errBranchName.field-validation-error").addClass("field-validation-valid").removeClass("field-validation-error");
            $("#BranchName.input-validation-error").removeClass("input-validation-error");
            break;
        case "policeNumberDataRPL":
            $("#errRPCPoliceNo.field-validation-error").addClass("field-validation-valid").removeClass("field-validation-error");
            $("#errLocation.field-validation-error").addClass("field-validation-valid").removeClass("field-validation-error");
            $("#errModelName.field-validation-error").addClass("field-validation-valid").removeClass("field-validation-error");
            $("#errEngineNumber.field-validation-error").addClass("field-validation-valid").removeClass("field-validation-error");
            $("#errChassisNumber.field-validation-error").addClass("field-validation-valid").removeClass("field-validation-error");
            $("#errColour.field-validation-error").addClass("field-validation-valid").removeClass("field-validation-error");
            $("#errStartSTNK.field-validation-error").addClass("field-validation-valid").removeClass("field-validation-error");
            $("#errEndSTNK.field-validation-error").addClass("field-validation-valid").removeClass("field-validation-error");
            $("#errStartKEUR.field-validation-error").addClass("field-validation-valid").removeClass("field-validation-error");
            $("#errEndKEUR.field-validation-error").addClass("field-validation-valid").removeClass("field-validation-error");
            $("#errCompanyInsurance.field-validation-error").addClass("field-validation-valid").removeClass("field-validation-error");
            $("#errInsuranceNumber.field-validation-error").addClass("field-validation-valid").removeClass("field-validation-error");
            $("#errStartInsurance.field-validation-error").addClass("field-validation-valid").removeClass("field-validation-error");
            $("#errEndInsurance.field-validation-error").addClass("field-validation-valid").removeClass("field-validation-error");
            $("#RPCPoliceNo.input-validation-error").removeClass("input-validation-error");
            $("#Location.input-validation-error").removeClass("input-validation-error");
            $("#ModelName.input-validation-error").removeClass("input-validation-error");
            $("#EngineNumber.input-validation-error").removeClass("input-validation-error");
            $("#ChassisNumber.input-validation-error").removeClass("input-validation-error");
            $("#Colour.input-validation-error").removeClass("input-validation-error");
            $("#StartSTNK.input-validation-error").removeClass("input-validation-error");
            $("#EndSTNK.input-validation-error").removeClass("input-validation-error");
            $("#StartKEUR.input-validation-error").removeClass("input-validation-error");
            $("#EndKEUR.input-validation-error").removeClass("input-validation-error");
            $("#CompanyInsurance.input-validation-error").removeClass("input-validation-error");
            $("#InsuranceNumber.input-validation-error").removeClass("input-validation-error");
            $("#StartInsurance.input-validation-error").removeClass("input-validation-error");
            $("#EndInsurance.input-validation-error").removeClass("input-validation-error");
            break;
        case "ModelData":
            $("#errModelName.field-validation-error").addClass("field-validation-valid").removeClass("field-validation-error");
            $("#ModelName.input-validation-error").removeClass("input-validation-error");
            break;
        case "AgreementData":
            $("#errAgreementNumber.field-validation-error").addClass("field-validation-valid").removeClass("field-validation-error");
            $("#AgreementNumber.input-validation-error").removeClass("input-validation-error");
            break;
        case "PoliceNumberData":
            $("#errOPLPoliceNo.field-validation-error").addClass("field-validation-valid").removeClass("field-validation-error");
            $("#OPLPoliceNo.input-validation-error").removeClass("input-validation-error");
            break;
    }
}

postOnComplete = function(result) {
    if (result.responseJSON) {
        if (result.responseJSON.url)
            window.location.href = result.responseJSON.url;
    }
    else {
        document.write(result.responseText);
        document.close();
    }
}

//BAST_Create and BAST_Edit modal popup
function openModal(viewtype, id) {
    $(".rpl").hide();
    $(".opl").hide();
    $('input[name=optradioBASTSelection]:checked').removeAttr('checked');
    if (viewtype == 1) {
        viewtype = "Create";
    }
    else if (viewtype == 2) {
        viewtype = "Edit";
    }

    $('.titleModal').text(viewtype);
    $('#BASTSelection').on('shown.bs.modal', function() {
        functionBASTSelection(viewtype, id);
        $("input[name=optradioBASTSelection]").click(function() {
            functionBASTSelection(viewtype, id);
        });
    });
}

function functionBASTSelection(viewtype, id) {
    var rates_create = "";
    rates_create = $('input[name=optradioBASTSelection]:checked').val();

    if (rates_create == "RPL") {
        $(".rpl").show();
        $(".rpl").prop("href", serverRoot + "MGTOplUnitReplace/" + viewtype + "/ReplacementUnit/" + id); // X0103966 - Error Create BAST

        $(".opl").hide();
    }
    else if (rates_create == "OPL") {
        $(".opl").show();
        $(".opl").prop("href", serverRoot + "MGTOplUnitReplace/" + viewtype + "/OplUnit/" + id); // X0103966 - Error Create BAST

        $(".rpl").hide();
    }
    else {
        $(".rpl").hide();
        $(".opl").hide();
    }


}

//BAST_Print modal popup
function openModalReport(viewtype, id) {
    $('form:first').addHidden('IdTbMGTRegRpc', id);
    $(".rpl").hide();
    $(".opl").hide();
    $('input[name=optradio_BAST_Print]:checked').removeAttr('checked');
    if (viewtype == 3) {
        viewtype = "Details";
    }
    else if (viewtype == 4) {
        viewtype = "Report";
    }

    $('.titleModal').text(viewtype);
    $('#BAST_Print_ViewType').val(viewtype);
    $('#BAST_Print').on('shown.bs.modal', function() {
        functionBASTPrintSelection(viewtype, id);
        $("input[name=optradio_BAST_Print]").click(function() {
            functionBASTPrintSelection(viewtype, id);
        });
    });
}

function functionBASTPrintSelection(viewtype, id) {
    var rates_create = "";
    rates_create = $('input[name=optradio_BAST_Print]:checked').val();

    if (rates_create == "RPL") {
        $(".rpl").show();
        $(".rpl").prop("href", serverRoot + "MGTOplUnitReplace/" + viewtype + "?viewname=ReplacementUnit&id=" + id); // X0103966 - Error Create BAST
        $(".opl").hide();
        $('#buttonNextOpl').hide();
    }
    else if (rates_create == "OPL") {
        $(".opl").show();
        $(".opl").prop("href", serverRoot + "MGTOplUnitReplace/" + viewtype + "?viewname=OplUnit&id=" + id); // X0103966 - Error Create BAST
        $(".rpl").hide();
        $('#buttonNextRpl').hide();
    }
    else {
        $(".rpl").hide();
        $(".opl").hide();
    }
}

function resetField() {
    $("#bastNoRPC").val('');
    $("#bastNoOPL").val('');
}

var oLookUpBAST;
var bastreqId = '';
var bastCurrentType = '';
function loadBASTNo(bastType) {
    //$('#BAST_Print').modal('hide');
    var id = $('#IdTbMGTRegRpc').val();
    var viewType = $('#functionBASTPrintSelection').val(viewType);
    var config = {
        "bServerSide": true,
        "bProcessing": true,
        "bRetrieve": true,
        "bAutoWidth": false,
        "sAjaxSource": serverRoot + "MGTOplUnitReplace/GetLookUpBASTNoList",
        "fnServerParams": function(aoData) {
            aoData.push(
                { "name": "id", "value": $('#IdTbMGTRegRpc').val() },
                { "name": "bastType", "value": bastType }
            );
        },
        "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
        "sPaginationType": "full_numbers",
        "aoColumns": [
            { "mData": "BASTNumber" },
            { "mData": "CreatedDate" }

        ],
        "iDisplayLength": 5,
        "bLengthChange": false
    };

    if (typeof (oLookUpBAST) != "undefined" && (bastreqId != id || bastCurrentType != bastType)) {
        oLookUpBAST.fnDestroy();
        oLookUpBAST = $('#BAST_data-list').dataTable(config);
    } else {
        oLookUpBAST = $('#BAST_data-list').dataTable(config);
    }

    bastreqId = id;
    bastCurrentType = bastType;

    $("#BAST_data-list tbody").delegate("tr", "click", function() {

        var data = oLookUpBAST.fnGetData(this);
        var viewType = $('#BAST_Print_ViewType').val();
        if (data == null) {
            $('#BAST_data').modal('hide');
            $('#BAST_Print').modal('show');
            return false;
        }
        if (bastType == 1) {
            $("#idBastRPC").val(data.IdTb_MGT_BASTRPC == null ? '' : data.IdTb_MGT_BASTRPC);
            $("#bastNoRPC").val(data.BASTNumber == null ? '' : data.BASTNumber);
            $('#buttonNextRpl').show();
            var id = $("#idBastRPC").val();
            if (id != undefined) {
                $('#idBastRPCNext').prop("href", serverRoot + "MGTOplUnitReplace/" + viewType + "/" + id); // X0103966 - Error Create BAST
            }
            $("#idBastRPC").val(data.IdTb_MGT_BASTRPC == null ? '' : data.IdTb_MGT_BASTRPC);
            $("#bastNoRPC").val(data.BASTNumber == null ? '' : data.BASTNumber);
        }
        else if (bastType == 2) {
            $("#idBastOPL").val(data.IdTb_MGT_BASTRPC == null ? '' : data.IdTb_MGT_BASTRPC);
            $("#bastNoOPL").val(data.BASTNumber == null ? '' : data.BASTNumber);
            $('#buttonNextOpl').show();
            var id = $("#idBastOPL").val();
            if (id != undefined) {
                $('#idBastOPLNext').prop("href", serverRoot + "MGTOplUnitReplace/" + viewType + "/" + id); // X0103966 - Error Create BAST
            }
            $("#idBastOPL").val(data.IdTb_MGT_BASTRPC == null ? '' : data.IdTb_MGT_BASTRPC);
            $("#bastNoOPL").val(data.BASTNumber == null ? '' : data.BASTNumber);
        }
        $('#BAST_data').modal('hide');
        $('#BAST_Print').modal('show');
        $('#BAST_data-list tbody').undelegate("tr", "click");

        return false;
    });
}

// start add Upload Function by Agung
function AddDataOPLUnitAttachment(IdTb_OPL_Unit, idOPLAgreement) {
    $("#oplunit").val(IdTb_OPL_Unit);
    $("#opl").val(IdTb_OPL_Unit);
    $("#oplagrAtch").val(idOPLAgreement);
    $("#oplagrAtchUnit").val(idOPLAgreement);
}
// end add Upload Function by Agung

//Update CR Mgt Module 2020
function ShowDataOPLUnit(idopl, idunit, typeview, isreverse) {
    $("#dataoplunitmodal").find("input, textarea, select, hidden").val("");
    $("#dataoplunitmodal").find("input, textarea, select").removeAttr("disabled");
    $("#soldDate").removeAttr("readonly");

    $.post('MGTOplUnitReplace/GetFormDataOPLUnit/?idOplAgreement=' + idopl + '&idOplUnit=' + idunit, function(data) {
        $("#lastUpdateBy").html(data.lastUpdateBy);
        $("#lastUpdateDate").html(data.lastUpdateDate);
        $("#idOPLAgreement").val(data.idOPLAgreement);
        $("#idOPLUnit").val(data.idOPLUnit);
        $("#policeNo").val(data.policeNo);
        $("#engineNo").val(data.engineNo);
        $("#chasisNo").val(data.chasisNo);
        $("#color").val(data.color);
        $("#insuranceCo").val(data.insuranceCo);
        $("#polisNo").val(data.polisNo);
        $("#unitDescription").val(data.unitDescription);
        $("#year").val(data.year);
        $("#stnkExpDate").val(data.stnkExpDate);
        $("#keurExpDate").val(data.keurExpDate);
        $("#insPeriodStart").val(data.insPeriodStart);
        $("#insPeriodEnd").val(data.insPeriodEnd);
        $("#IdTb_MGT_DailyRecordCar").val(data.idTbMgtDailyRecordCar);
        $("#mileage").val(data.mileage);
        thousandSeparator2($("#mileage"));
        $("#inDate").val(data.inDate);
        $("#outDate").val(data.outDate);
        $("#hInDate").val(data.inDate);
        $("#hOutDate").val(data.outDate);
        $("#hStatus").val(data.status);
        $("#hParkingLocation").val(data.parkingLocationStr);
        $("#hAllocation").val(data.allocation);
        $("#idProvince").val(data.idprovince);
        $("#provinceCode").val(data.provincecode);
        $("#province").val(data.province);
        $("#idCity").val(data.idcity);
        $("#city").val(data.city);
        $("#soldDate").val(data.soldDate);
        $("#soldPrice").val(parseInt(data.soldPrice));
        $("#bookValue").val(parseInt(data.bookValue));
        $("#gainLos").val(parseInt(data.gainLos));
        thousandSeparator2($("#soldPrice"));
        thousandSeparator2($("#bookValue"));
        thousandSeparator2($("#gainLos"));
        $("#buyerName").val(data.buyerName);
        $("#createdBy").val(data.createdBy);
        $("#createdDate").val(data.createdDate);

        if (typeview == 1) {
            $("#myModalLabelTitle").text("DETAIL DAILY RECORD CAR");
            $("#dataoplunitmodal").find("input, textarea, select").attr("disabled", "disabled");
            $("#remark").val(data.remark);
            $("*.editbutton").hide();

            if (isreverse == 1) {
                $("*.reversebutton").show();
            } else {
                $("*.reversebutton").hide();
            }

            $("*.detailbutton").show();
            $("#BtnProvince").attr("disabled", "disabled");
            $("#BtnCity").attr("disabled", "disabled");
        } else {
            $("#myModalLabelTitle").text("UPDATE DAILY RECORD CAR");
            $("*.alwaysdissable").find("input, textarea, select").attr("disabled", "disabled");
            $("*.editbutton").show();
            $("*.reversebutton").hide();
            $("*.detailbutton").hide();
            $("#BtnProvince").removeAttr("disabled");
            $("#BtnCity").attr("disabled", "disabled");

            if ($('#idProvince').val() != "") {
                $('#BtnCity').removeAttr("disabled");
            }
        }

        $.post('MGTOplUnitReplace/GetStatus/?statusCode=S1', function(data) {
            var s = '<option value="0" disabled selected>Allocation</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option value="' + data[i].IdTb_OPL_Status + '">' + data[i].StatusDescription + '</option>';
            }
            $("#allocation").html(s);
        })
            .done(function() {
                $("#allocation").val(data.allocation).change();
            });

        $.post('MGTOplUnitReplace/GetStatus/?statusCode=CS', function(data) {
            var s = '<option value="" disabled selected>Contract Status</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option value="' + data[i].IdTb_OPL_Status + '">' + data[i].StatusDescription + '</option>';
            }
            $("#contractStatus").html(s);
        })
            .done(function() {
                $("#contractStatus").val(data.contractStatus);
            });
    })
}

$("#allocation").change(function() {
    var str = "";
    var check = $("#allocation option:selected").text().split(" ");
    var check2 = $("#allocation option:selected").text();

    if (check.length > 1) {
        str = "S1" + check[0];
    } else {
        str = "S1" + check;
    }

    if (check2 == "Disposal") {
        $("*.notDisForm").hide();
        $("*.disForm").show();
    } else {
        $("*.notDisForm").show();
        $("*.disForm").hide();
    }

    $("#mAllocation").hide();

    var isExist = false;

    $.post('MGTOplUnitReplace/GetStatus/?statusCode=' + str, function(data) {
        var s = '<option value="0" disabled selected>Status</option>';
        for (var i = 0; i < data.length; i++) {
            if ($("#hStatus").val() == data[i].IdTb_OPL_Status) {
                isExist = true;
            }

            s += '<option value="' + data[i].IdTb_OPL_Status + '">' + data[i].StatusDescription + '</option>';
        }
        $("#status").html(s);
    })
        .done(function() {
            if (check2 == "Disposal") {
                if (isExist) {
                    $("#status").val($("#hStatus").val());
                } else {
                    $("#status").val("0");
                }

                $("#parkingLocation").val("0");
                $("#outDate").val("");
                $("#inDate").val("");
            } else {
                if (isExist) {
                    $("#status").val($("#hStatus").val()).change();
                } else {
                    $("#status").val("0").change();
                }
            }
        });
});

$("#status").change(function() {
    var check2 = $("#allocation option:selected").text();

    if (check2 != "Disposal") {
        var rmk = "Parking Location By Status ";
        var check = $("#status option:selected").text();
        var pLoc = "";

        rmk = rmk + check;

        $("#mStatus").hide();

        $.post('MGTOplUnitReplace/GetOptionItemByStatus/?remarks=' + rmk, function(data) {
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    pLoc = data[i].ItemValuesName.trim();
                }
            } else {
                pLoc = "";
            }
        })
            .done(function() {
                if (($("#allocation").val() != $("#hAllocation").val()) ||
                    ($("#status").val() != $("#hStatus").val())) {
                    var OlssOptionItem = "Parking Location";
                    $.post('MGTOplUnitReplace/GetOptionItem/?OlssOptItm=' + OlssOptionItem, function(data) {
                        var s = '<option value="0" disabled selected>Parking Location</option>';
                        for (var i = 0; i < data.length; i++) {
                            s += '<option value="' + data[i].IdOptionItemValue + '">' + data[i].ItemValuesName + '</option>';
                        }
                        $("#parkingLocation").html(s);
                    })
                        .done(function() {
                            //var vPLoc = pLoc == $("#hParkingLocation").val() ? pLoc : $("#hParkingLocation").val();
                            //$("#parkingLocation option:contains(" + pLoc + ")").attr("selected", true);
                            //$("#hParkingLocation").val(pLoc);

                            if (pLoc == "") {
                                $("#parkingLocation").val("0");
                            } else {
                                $("#parkingLocation option:contains(" + pLoc + ")").attr("selected", true);
                            }

                            if (pLoc == $("#hParkingLocation").val() || pLoc == "") {
                                $("#outDate").val($("#hOutDate").val());
                                $("#inDate").val($("#hInDate").val());
                            } else {
                                if (pLoc == "Parking at DSF" || pLoc == "Workshop" || pLoc == "Auction House") {
                                    //$("#inDate").datepicker({
                                    //    dateFormat: "mm/dd/yy"
                                    //}).datepicker("setDate", "0");
                                    if (($("#hInDate").val() == "" || $("#hInDate").val() == "NULL") ||
                                        $("#hParkingLocation").val() == "Customer Location") {
                                        $("#inDate").datepicker({
                                            dateFormat: "mm/dd/yy"
                                        }).datepicker("setDate", "0");
                                    } else {
                                        $("#inDate").val($("#hInDate").val());
                                    }

                                    $("#outDate").val($("#hOutDate").val());

                                } else if (pLoc == "Customer Location") {
                                    $("#outDate").datepicker({
                                        dateFormat: "mm/dd/yy"
                                    }).datepicker("setDate", "0");
                                    $("#inDate").val($("#hInDate").val());
                                }
                            }

                            //if (pLoc == "Parking at DSF" || pLoc == "Workshop" || pLoc == "Auction House") {
                            //    $("#inDate").datepicker({
                            //        dateFormat: "mm/dd/yy"
                            //    }).datepicker("setDate", "0");
                            //    $("#outDate").val($("#hOutDate").val());

                            //} else if (pLoc == "Customer Location") {
                            //    $("#outDate").datepicker({
                            //        dateFormat: "mm/dd/yy"
                            //    }).datepicker("setDate", "0");
                            //    $("#inDate").val($("#hInDate").val());
                            //}
                        });
                } else {
                    var OlssOptionItem = "Parking Location";
                    $.post('MGTOplUnitReplace/GetOptionItem/?OlssOptItm=' + OlssOptionItem, function(data) {
                        var s = '<option value="0" disabled selected>Parking Location</option>';
                        for (var i = 0; i < data.length; i++) {
                            s += '<option value="' + data[i].IdOptionItemValue + '">' + data[i].ItemValuesName + '</option>';
                        }
                        $("#parkingLocation").html(s);
                    })
                        .done(function() {
                            var vPLoc = pLoc == $("#hParkingLocation").val() ? pLoc : $("#hParkingLocation").val();
                            $("#parkingLocation option:contains(" + vPLoc + ")").attr("selected", true);
                            //$("#hParkingLocation").val(pLoc);

                            $("#outDate").val($("#hOutDate").val());
                            $("#inDate").val($("#hInDate").val());
                        });
                }
            });
    }
});

$("#parkingLocation").change(function() {
    var check = $("#parkingLocation option:selected").text();

    if (check == $("#hParkingLocation").val()) {
        $("#outDate").val($("#hOutDate").val());
        $("#inDate").val($("#hInDate").val());
    } else {
        if (check == "Parking at DSF" || check == "Workshop" || check == "Auction House") {
            //$("#inDate").datepicker({
            //    dateFormat: "mm/dd/yy"
            //}).datepicker("setDate", "0");
            if (($("#hInDate").val() == "" || $("#hInDate").val() == "NULL") ||
                $("#hParkingLocation").val() == "Customer Location") {
                $("#inDate").datepicker({
                    dateFormat: "mm/dd/yy"
                }).datepicker("setDate", "0");
            } else {
                $("#inDate").val($("#hInDate").val());
            }

            $("#outDate").val($("#hOutDate").val());

        } else if (check == "Customer Location") {
            $("#outDate").datepicker({
                dateFormat: "mm/dd/yy"
            }).datepicker("setDate", "0");
            $("#inDate").val($("#hInDate").val());
        }
    }

    //if (($("#allocation").val() == $("#hAllocation").val()) &&
    //        ($("#status").val() == $("#hStatus").val()) &&
    //        (check == $("#hParkingLocation").val())) {
    //    $("#outDate").val($("#hOutDate").val());
    //    $("#inDate").val($("#hInDate").val());
    //} else {
    //    if (check == "Parking at DSF" || check == "Workshop" || check == "Auction House") {
    //        $("#inDate").datepicker({
    //            dateFormat: "mm/dd/yy"
    //        }).datepicker("setDate", "0");
    //        $("#outDate").val($("#hOutDate").val());

    //    } else if (check == "Customer Location") {
    //        $("#outDate").datepicker({
    //            dateFormat: "mm/dd/yy"
    //        }).datepicker("setDate", "0");
    //        $("#inDate").val($("#hInDate").val());
    //    }
    //}
});

$("#ddlSearchCriteria").change(function() {
    var $select = $("#ddlSubSearchCriteria");
    var $txt = $("#txtSearch");
    var check = $("#ddlSearchCriteria option:selected").text();

    if (tabActive == 0) {
        return false;
    }

    $txt.val("");
    $txt.show();
    $("#provinceDivParam").hide();
    $("#cityDivParam").hide();
    $("#provinceParam").val("");
    $("#cityParam").val("");

    if (check == "Allocation") {

        $.post('MGTOplUnitReplace/GetStatus/?statusCode=S1', function(data) {
            var s = '<option value="" disabled selected></option>';
            for (var i = 0; i < data.length; i++) {
                if (data[i].StatusDescription != "Disposal") {
                    s += '<option value="' + data[i].IdTb_OPL_Status + '">' + data[i].StatusDescription + '</option>';
                }
            }
            $select.html(s);
        });

        $txt.hide();
        $select.show();
        $("#btnPrintAll").prop('disabled', true);

    } else if (check == "Contract Status") {

        $.post('MGTOplUnitReplace/GetStatus/?statusCode=CS', function(data) {
            var s = '<option value="" disabled selected></option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option value="' + data[i].IdTb_OPL_Status + '">' + data[i].StatusDescription + '</option>';
            }
            $select.html(s);
        });

        $txt.hide();
        $select.show();
        $("#btnPrintAll").prop('disabled', false);

    } else if (check == "Status") {

        if (tabActive == 1) {
            $.post('MGTOplUnitReplace/GetStatusSubSearch', function(data) {
                var s = '<option value="" disabled selected></option>';
                for (var i = 0; i < data.length; i++) {
                    s += '<option value="' + data[i][0].IdTb_OPL_Status + '">' + data[i][0].StatusDescription + '</option>';
                }
                $select.html(s);
            });
        } else if (tabActive == 2) {
            $.post('MGTOplUnitReplace/GetStatusSubSearchDisposal', function(data) {
                var s = '<option value="" disabled selected></option>';
                for (var i = 0; i < data.length; i++) {
                    s += '<option value="' + data[i][0].IdTb_OPL_Status + '">' + data[i][0].StatusDescription + '</option>';
                }
                $select.html(s);
            });
        }



        $txt.hide();
        $select.show();
        $("#btnPrintAll").prop('disabled', false);

    } else {
        $txt.show();
        $select.hide();
        $("#ddlSubSearchCriteria").val("");
        $("#btnPrintAll").prop('disabled', false);
    }

    if (check == "Sold Date") {
        $('#sDateL').text("Start Sold Date");
        $('#eDateL').text("End Sold Date");
        $("#ddlSubSearchCriteria").val("");
    } else {
        $('#sDateL').text("Start Modified Date");
        $('#eDateL').text("End Modified Date");
        $("#ddlSubSearchCriteria").val("");
    }

    if (check == "Province") {
        $("#provinceDivParam").show();
        $txt.hide();
    }

    if (check == "City") {
        $("#cityDivParam").show();
        $txt.hide();
    }
});

$("#ddlSubSearchCriteria").change(function() {
    var search = $("#ddlSearchCriteria option:selected").text();
    var subSearch = $("#ddlSubSearchCriteria option:selected").text();

    if (search == "Allocation" && subSearch == "") {
        $("#btnPrintAll").prop('disabled', true);
    } else {
        $("#btnPrintAll").prop('disabled', false);
    }
});

$("*.currency").change(function() {
    thousandSeparator2($("*.currency"));
});

function thousandSeparator2(param) {
    param.each(function() {
        var v = $(this).val();

        v = v.replace(/[^-\d]/g, '');

        if (v.length > 3) {
            v = v.replace(/(\d{3,3})$/g, ',$1');
            v = v.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        }

        v = v ? v : '';

        $(this).val(v);

    });
}

function ShowDataHistoryOPLUnit(idopl, idunit, typeview, status) {
    $("#historyoplmodal").find("input, textarea, select").val("");
    $("#historyoplmodal").find("input, textarea, select").removeAttr("disabled");

    $.post('MGTOplUnitReplace/GetFormDataOPLUnit/?idOplAgreement=' + idopl + '&idOplUnit=' + idunit, function(data) {
        $("#lastUpdateByH").html(data.lastUpdateBy);
        $("#lastUpdateDateH").html(data.lastUpdateDate);
        $("#idOPLAgreementH").val(data.idOPLAgreement);
        $("#idOPLUnitH").val(data.idOPLUnit);
        $("#policeNoH").val(data.policeNo);
        $("#engineNoH").val(data.engineNo);
        $("#chasisNoH").val(data.chasisNo);
        $("#colorH").val(data.color);
        $("#insuranceCoH").val(data.insuranceCo);
        $("#polisNoH").val(data.polisNo);
        $("#unitDescriptionH").val(data.unitDescription);
        $("#yearH").val(data.year);
        $("#stnkExpDateH").val(data.stnkExpDate);
        $("#keurExpDateH").val(data.keurExpDate);
        $("#insPeriodStartH").val(data.insPeriodStart);
        $("#insPeriodEndH").val(data.insPeriodEnd);
        $("#IdTBMgtDailyRecordCar").val(data.insPeriodEnd);
        $("#inDateH").val(data.inDate);
        $("#mileageH").val(data.mileage);
        thousandSeparator2($("#mileageH"));
        $("#outDateH").val(data.outDate);

        if (typeview == 1) {
            $("#myModalLabelTitleH").text("CONTRACT HISTORY");
            $("#myModalLabelSubTitleData").text("ASSET DATA");
            $("#myModalLabelSubTitleList").text("CONTRACT HISTORY");
            $("#historyoplmodal").find("input, textarea, select").attr("disabled", "disabled");
            $("#listdailyrecordcarhistory").hide();
            $("#listmaintenancehistory").hide();
            $("*.printreportbutton").hide();
            $("#listcontracthistory").show();
            $("#item-button").hide();

            ContractHistoryOPLUnit($("#idOPLUnitH").val());
        } else if (typeview == 2) {
            // start add Upload Function by Agung
            if (status != 0) {
                $("#myModalLabelTitleH").text("DAILY RECORD CAR HISTORY");
                $("#myModalLabelSubTitleData").text("ASSET DATA");
                $("#myModalLabelSubTitleList").text("DAILY RECORD CAR HISTORY");
                $("#historyoplmodal").find("input, textarea, select").attr("disabled", "disabled");
                $("#listcontracthistory").hide();
                $("#listmaintenancehistory").hide();
                $("*.printreportbutton").hide();
                $("#listdailyrecordcarhistory").show();
                $("#item-button").html("<a title='Attachment OPL Unit' href='#' onclick='ShowDataOPLUnitAttachment(" + idunit + "," + idopl + ");return false;' data-target='#attachmentoplunit-list' data-toggle='modal' class='btn btn-primary'>Attachment</a>&nbsp;")
                $("#item-button").show();

                DailyRecordCarHistoryOPLUnit($("#idOPLUnitH").val());
            }
            // end add Upload Function by Agung
            else {
                $("#myModalLabelTitleH").text("DAILY RECORD CAR HISTORY");
                $("#myModalLabelSubTitleData").text("ASSET DATA");
                $("#myModalLabelSubTitleList").text("DAILY RECORD CAR HISTORY");
                $("#historyoplmodal").find("input, textarea, select").attr("disabled", "disabled");
                $("#listcontracthistory").hide();
                $("#listmaintenancehistory").hide();
                $("*.printreportbutton").hide();
                $("#listdailyrecordcarhistory").show();
                $("#item-button").html("<a title='Attachment OPL Unit' href='#' onclick='AddDataOPLUnitAttachment(" + idunit + "," + idopl + ");return false;' data-target='#addattachmentoplunit-list' data-toggle='modal' class='btn btn-primary' style='float: left;'>Upload</a>")
                $("#item-button").show();

                DailyRecordCarHistoryOPLUnit($("#idOPLUnitH").val());
            }
        } else {
            $("#myModalLabelTitleH").text("MAINTENANCE HISTORY");
            $("#myModalLabelSubTitleData").text("ASSET DATA");
            $("#myModalLabelSubTitleList").text("MAINTENANCE HISTORY");
            $("#historyoplmodal").find("input, textarea, select").attr("disabled", "disabled");
            $("#listdailyrecordcarhistory").hide();
            $("#listcontracthistory").hide();
            //$("*.printreportbutton").show();
            $("*.printreportbutton").hide();
            $("#listmaintenancehistory").show();
            $("#item-button").hide();

            MaintenanceHistoryOPLUnit($("#idOPLUnitH").val());
        }
    })
}

// start add Upload Function by Agung
function ShowDataOPLUnitAttachment(idunit, idopl) {
    $("#attachmentoplunit-list").find("input, textarea, select").val("");
    $("#attachmentoplunit-list").find("input, textarea, select").removeAttr("disabled");
    $("#opl").val(idunit);
    $("#oplunit").val(idunit);
    $("#oplagrAtch").val(idopl);
    $("#oplagrAtchUnit").val(idopl);
    var config = {
        "bServerSide": true,
        "bProcessing": true,
        //"aaSorting": [[7, "desc"],[8, "desc"], [9, "desc"]],
        "bRetrieve": true,
        "sScrollY": 200,
        "sAjaxSource": serverRoot + "MGTOplUnitReplace/AttachmentList/?id=" + idunit + "&idagr=" + idopl,
        "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
        "sPaginationType": "full_numbers",
        "bAutoWidth": false,
        "aoColumns": [
            { "mData": "FileName" },
            { "mData": "CreatedBy" },
            { "mData": "CreatedDate" },
            {
                "mData": null,
                "bSearchable": false,
                "bSortable": false,
                "sClass": "center",
                "fnRender": function(oObj) {
                    var id = oObj.aData["IdOPLUnitAttachment"];

                    var htmlButtonAction = "<a title='Download Attachment' href='./MGTOplUnitReplace/DownloadAttachment/?idUnit=" + id + "' class='btn btn-success btn-xs'><i class='fa fa-download'></i></a>&nbsp;<a title='View Attachment' href='./MGTOplUnitReplace/ViewAttachment/?idUnit=" + id + "' class='btn btn-primary btn-xs' target='_blank'><i class='fa fa-eye'></i></a>&nbsp;<a title='Delete Attachment' data-target='#attachmentconfmodal' data-toggle='modal' onclick=showConfirmation(" + id + ") class='btn btn-danger btn-xs'><i class='fa fa-trash-o'></i></a>";

                    return htmlButtonAction;
                }
            },
        ],
        "fnServerData": function(sSource, aoData, fnCallback) {
            $.ajax({
                "dataType": 'json',
                "type": "POST",
                "url": sSource,
                "data": aoData,
                "success": fnCallback,
                "timeout": 0,
                "error": handleAjaxError,
                "global": false
            });
        }
    };
    if ($.fn.dataTable.fnIsDataTable(document.getElementById("attachment-list"))) {
        $("#attachment-list").dataTable().fnClearTable();
        $("#attachment-list").dataTable().fnDestroy();
        $('#attachment-list').dataTable(config).fnDraw();
    } else {
        $('#attachment-list').dataTable(config).fnDraw();
    }
}
// end add Upload Function by Agung

// start add Upload Function by Agung
function showConfirmation(idunit) {
    document.getElementById("idunitattachment").value = idunit;
}
// end add Upload Function by Agung

$("#deleteAttachment").click(function(e) {

    e.preventDefault();

    var IdTb_OPL_Unit = document.getElementById("idunitattachment").value;

    var obj = new Object();

    obj.IdTb_OPL_Unit = IdTb_OPL_Unit;

    $.ajax(
        {
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(obj),
            url: serverRoot + "MGTOplUnitReplace/DeleteAttachment",
            global: false,
            success: function(response) {

                $("#attachmentoplunit-list").modal('hide');
                $("#attachmentconfmodal").modal('hide');
                $("#historyoplmodal").modal('hide');

                //$("#paging2").remove();
                //$('#attachmentoplunit-list').dataTable().fnClearTable();
                //$('#attachmentoplunit-list').dataTable().fnDestroy();
                //datagridOPLUnit();
                $('#loadingmessage').hide();
                //$('#attachmentoplunit-list').dataTable().fnDraw();

                $("#agreementNumber").val('');
                $("#customerName").val('');

                UploadAttachmentSuccessMsg();
            }
        });
    return false;
});
function ContractHistoryOPLUnit(idunit) {
    var config = {
        "bServerSide": true,
        "bProcessing": true,
        "aaSorting": [[19, "desc"]],
        "bRetrieve": true,
        "sScrollY": 200,
        "sAjaxSource": serverRoot + "MGTOplUnitReplace/ContractHistoryOPLUnitList/?idOplUnit=" + idunit,
        "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
        "sPaginationType": "full_numbers",
        "bAutoWidth": false,
        "aoColumns": [
            { "mData": "AgreementNo" },
            { "mData": "Mileage" },
            { "mData": "Leese" },
            {
                "mData": "StartDate",
                "bSortable": false
            },
            {
                "mData": "EndDate",
                "bSortable": false
            },
            { "mData": "MaintenanceType" },
            { "mData": "Registration" },
            { "mData": "ReplacementCar" },
        ],
        "fnServerData": function(sSource, aoData, fnCallback) {
            $.ajax({
                "dataType": 'json',
                "type": "POST",
                "url": sSource,
                "data": aoData,
                "success": fnCallback,
                "timeout": 0,
                "error": handleAjaxError,
                "global": false
            });
        }
    };
    if ($.fn.dataTable.fnIsDataTable(document.getElementById("contracthistory-list"))) {
        $("#contracthistory-list").dataTable().fnClearTable();
        $("#contracthistory-list").dataTable().fnDestroy();
        $('#contracthistory-list').dataTable(config).fnDraw();
    } else {
        $('#contracthistory-list').dataTable(config).fnDraw();
    }
}

function DailyRecordCarHistoryOPLUnit(idunit) {
    var config = {
        "bServerSide": true,
        "bProcessing": true,
        "aaSorting": [[19, "desc"]],
        "bRetrieve": true,
        "sScrollY": 200,
        "sAjaxSource": serverRoot + "MGTOplUnitReplace/DailyRecordCarHistoryOPLUnit/?idOplUnit=" + idunit,
        "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
        "sPaginationType": "full_numbers",
        "bAutoWidth": false,
        "aoColumns": [
            { "mData": "AgreementNo" },
            { "mData": "Mileage" },
            {
                "mData": "Date",
                "bSortable": false
            },
            { "mData": "Allocation" },
            { "mData": "Status" },
            //{ "mData": "Province" },
            { "mData": "City" },
            { "mData": "ParkingLocation" },
            { "mData": "InOutDate" },
            { "mData": "LastUpdateBy" },
            { "mData": "Remark" },
        ],
        "fnServerData": function(sSource, aoData, fnCallback) {
            $.ajax({
                "dataType": 'json',
                "type": "POST",
                "url": sSource,
                "data": aoData,
                "success": fnCallback,
                "timeout": 0,
                "error": handleAjaxError,
                "global": false
            });
        }
    };
    if ($.fn.dataTable.fnIsDataTable(document.getElementById("dailyrecordcarhistory-list"))) {
        $("#dailyrecordcarhistory-list").dataTable().fnClearTable();
        $("#dailyrecordcarhistory-list").dataTable().fnDestroy();
        $('#dailyrecordcarhistory-list').dataTable(config).fnDraw();
    } else {
        $('#dailyrecordcarhistory-list').dataTable(config).fnDraw();
    }
}

function MaintenanceHistoryOPLUnit(idunit) {
    var config = {
        "bServerSide": true,
        "bProcessing": true,
        "aaSorting": [[19, "desc"]],
        "bRetrieve": true,
        "sScrollY": 200,
        "sAjaxSource": serverRoot + "MGTOplUnitReplace/MaintenanceHistoryOPLUnit/?idOplUnit=" + idunit,
        "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
        "sPaginationType": "full_numbers",
        "bAutoWidth": false,
        "aoColumns": [
            { "mData": "AgreementNo" },
            { "mData": "ActualKM" },
            { "mData": "MaintenanceBudget" },
            {
                "mData": "Date",
                "bSortable": false
            },
            { "mData": "Service" },
            { "mData": "LabourChange" },
            { "mData": "Sparepart" },
            { "mData": "Price" },
            { "mData": "MaintenanceCost" },
            { "mData": "RemainingBudget" },
        ],
        "fnServerData": function(sSource, aoData, fnCallback) {
            $.ajax({
                "dataType": 'json',
                "type": "POST",
                "url": sSource,
                "data": aoData,
                "success": fnCallback,
                "timeout": 0,
                "error": handleAjaxError,
                "global": false
            });
        }
    };
    if ($.fn.dataTable.fnIsDataTable(document.getElementById("maintenancehistory-list"))) {
        $("#maintenancehistory-list").dataTable().fnClearTable();
        $("#maintenancehistory-list").dataTable().fnDestroy();
        $('#maintenancehistory-list').dataTable(config).fnDraw();
    } else {
        $('#maintenancehistory-list').dataTable(config).fnDraw();
    }
}

$("#yesDailyConfirm").click(function(e) {
    $('#dailyrecconfmodal').modal('hide');
    $('#dataoplunitmodal').modal('hide');
});

$("#noDailyConfirm").click(function(e) {
    $('#dailyrecconfmodal').modal('hide');
});

$("#noDailyGTS").click(function(e) {
    $('#dailyrecgtsmodal').modal('hide');
});

function loadAgrNumber() {
    var config = {
        "bServerSide": true,
        "bProcessing": true,
        "bRetrieve": true,
        "sScrollY": 200,
        "aaSorting": [[5, "desc"]],
        "iDisplayLength": 5,
        "bLengthChange": false,
        "sAjaxSource": serverRoot + "MGTOplUnitReplace/AgrDataTable/?idOplUnit=" + $("#idOPLUnit").val(),
        "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
        "sPaginationType": "full_numbers",
        "bAutoWidth": false,
        "aoColumns": [
            { "mData": "AgreementNumber" },
            { "mData": "CustomerName" },
            { "mData": "AgreementDate" }
        ],
        "fnServerData": function(sSource, aoData, fnCallback) {
            $.ajax({
                "dataType": 'json',
                "type": "POST",
                "url": sSource,
                "data": aoData,
                "success": fnCallback,
                "timeout": 0,
                "error": handleAjaxError,
                "global": false
            });
        }
    };
    if ($.fn.dataTable.fnIsDataTable(document.getElementById("agrDRC-list"))) {
        $("#agrDRC-list").dataTable().fnClearTable();
        $("#agrDRC-list").dataTable().fnDestroy();
        $('#agrDRC-list').dataTable(config).fnDraw();
    } else {
        $('#agrDRC-list').dataTable(config).fnDraw();
    }

    $('#agrDRC-list tbody').delegate("tr", "click", function() {
        var table = $('#agrDRC-list').dataTable();
        var data = table.fnGetData(this);
        if (data != null) {
            $('#agreementNumber').val(data.AgreementNumber == null ? '' : data.AgreementNumber);
            $('#customerName').val(data.CustomerName == null ? '' : data.CustomerName);
            $('#idOPLAgreementGTS').val(data.IdOPLAgreement == null ? 0 : data.IdOPLAgreement);
        }

        $('#dailyrecagrmodal').modal('hide');
        $('#agrDRC-list tbody').undelegate("tr", "click");
    });
}



function loadRegionDailyRec(regType, sourceForm) {
    var regCode = "0";

    if (sourceForm == "ModalPopUpDailyRec") {

        if (regType == "Kab/Kota") {
            regCode = $("#provinceCode").val();

            $("#regionModalLabel").text("CITY DATA OF PROVINCE " + $("#province").val());
            $("#listprovincedailyrec").hide();
            $("#listregencyalldailyrec").hide();
            $("#listregencydailyrec").show();

            var config = {
                "bServerSide": true,
                "bProcessing": true,
                "bRetrieve": true,
                "sScrollY": 200,
                "aaSorting": [[5, "asc"]],
                "iDisplayLength": 5,
                "bLengthChange": false,
                "sAjaxSource": serverRoot + "MGTOplUnitReplace/RegionListLookUp/?regType=" + regType + "&regCode=" + regCode,
                "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
                "sPaginationType": "full_numbers",
                "bAutoWidth": false,
                "aoColumns": [
                    { "mData": "ItemValuesName" }
                ],
                "fnServerData": function(sSource, aoData, fnCallback) {
                    $.ajax({
                        "dataType": 'json',
                        "type": "POST",
                        "url": sSource,
                        "data": aoData,
                        "success": fnCallback,
                        "timeout": 0,
                        "error": handleAjaxError,
                        "global": false
                    });
                }
            };
            if ($.fn.dataTable.fnIsDataTable(document.getElementById("cityDailyRec-list"))) {
                $("#cityDailyRec-list").dataTable().fnClearTable();
                $("#cityDailyRec-list").dataTable().fnDestroy();
                $('#cityDailyRec-list').dataTable(config).fnDraw();
            } else {
                $('#cityDailyRec-list').dataTable(config).fnDraw();
            }

            $('#cityDailyRec-list tbody').delegate("tr", "click", function() {
                var table = $('#cityDailyRec-list').dataTable();
                var data = table.fnGetData(this);
                if (data != null) {
                    $('#idCity').val(data.IdOptionItemValue == null ? 0 : data.IdOptionItemValue);
                    $('#city').val(data.ItemValuesName == null ? '' : data.ItemValuesName);
                }

                $('#dailyrecregionmodal').modal('hide');
                $('#cityDailyRec-list tbody').undelegate("tr", "click");
            });
        }
        else {
            $("#regionModalLabel").text("PROVINCE DATA");
            $("#listregencydailyrec").hide();
            $("#listregencyalldailyrec").hide();
            $("#listprovincedailyrec").show();

            var config = {
                "bServerSide": true,
                "bProcessing": true,
                "bRetrieve": true,
                "sScrollY": 200,
                "aaSorting": [[5, "asc"]],
                "iDisplayLength": 5,
                "bLengthChange": false,
                "sAjaxSource": serverRoot + "MGTOplUnitReplace/RegionListLookUp/?regType=" + regType + "&regCode=" + regCode,
                "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
                "sPaginationType": "full_numbers",
                "bAutoWidth": false,
                "aoColumns": [
                    { "mData": "ItemValuesName" }
                ],
                "fnServerData": function(sSource, aoData, fnCallback) {
                    $.ajax({
                        "dataType": 'json',
                        "type": "POST",
                        "url": sSource,
                        "data": aoData,
                        "success": fnCallback,
                        "timeout": 0,
                        "error": handleAjaxError,
                        "global": false
                    });
                }
            };
            if ($.fn.dataTable.fnIsDataTable(document.getElementById("provinceDailyRec-list"))) {
                $("#provinceDailyRec-list").dataTable().fnClearTable();
                $("#provinceDailyRec-list").dataTable().fnDestroy();
                $('#provinceDailyRec-list').dataTable(config).fnDraw();
            } else {
                $('#provinceDailyRec-list').dataTable(config).fnDraw();
            }

            $('#provinceDailyRec-list tbody').delegate("tr", "click", function() {
                var table = $('#provinceDailyRec-list').dataTable();
                var data = table.fnGetData(this);
                if (data != null) {
                    $('#idProvince').val(data.IdOptionItemValue == null ? 0 : data.IdOptionItemValue);
                    $('#provinceCode').val(data.Remarks == null ? '' : data.Remarks);
                    $('#province').val(data.ItemValuesName == null ? '' : data.ItemValuesName);

                    if ($('#idProvince').val() > 0) {
                        $('#BtnCity').removeAttr("disabled");
                        $('#idCity').val(0);
                        $('#city').val("");
                    }
                }

                $('#dailyrecregionmodal').modal('hide');
                $('#provinceDailyRec-list tbody').undelegate("tr", "click");
            });
        }
    } else {
        if (regType == "Provinsi") {
            $("#regionModalLabel").text("PROVINCE DATA");
            $("#listregencydailyrec").hide();
            $("#listregencyalldailyrec").hide();
            $("#listprovincedailyrec").show();

            var config = {
                "bServerSide": true,
                "bProcessing": true,
                "bRetrieve": true,
                "sScrollY": 200,
                "aaSorting": [[5, "asc"]],
                "iDisplayLength": 5,
                "bLengthChange": false,
                "sAjaxSource": serverRoot + "MGTOplUnitReplace/RegionListLookUp/?regType=" + regType + "&regCode=" + regCode,
                "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
                "sPaginationType": "full_numbers",
                "bAutoWidth": false,
                "aoColumns": [
                    { "mData": "ItemValuesName" }
                ],
                "fnServerData": function(sSource, aoData, fnCallback) {
                    $.ajax({
                        "dataType": 'json',
                        "type": "POST",
                        "url": sSource,
                        "data": aoData,
                        "success": fnCallback,
                        "timeout": 0,
                        "error": handleAjaxError,
                        "global": false
                    });
                }
            };
            if ($.fn.dataTable.fnIsDataTable(document.getElementById("provinceDailyRec-list"))) {
                $("#provinceDailyRec-list").dataTable().fnClearTable();
                $("#provinceDailyRec-list").dataTable().fnDestroy();
                $('#provinceDailyRec-list').dataTable(config).fnDraw();
            } else {
                $('#provinceDailyRec-list').dataTable(config).fnDraw();
            }

            $('#provinceDailyRec-list tbody').delegate("tr", "click", function() {
                var table = $('#provinceDailyRec-list').dataTable();
                var data = table.fnGetData(this);
                if (data != null) {
                    $('#txtSearch').val(data.IdOptionItemValue == null ? 0 : data.IdOptionItemValue);
                    $('#provinceParam').val(data.ItemValuesName == null ? '' : data.ItemValuesName);
                }

                $('#dailyrecregionmodal').modal('hide');
                $('#provinceDailyRec-list tbody').undelegate("tr", "click");
            });
        } else {
            $("#regionModalLabel").text("CITY DATA");
            $("#listprovincedailyrec").hide();
            $("#listregencyalldailyrec").show();
            $("#listregencydailyrec").hide();

            regType = regType + "All";

            var config = {
                "bServerSide": true,
                "bProcessing": true,
                "bRetrieve": true,
                "sScrollY": 200,
                "aaSorting": [[5, "asc"]],
                "iDisplayLength": 5,
                "bLengthChange": false,
                "sAjaxSource": serverRoot + "MGTOplUnitReplace/RegionListLookUp/?regType=" + regType + "&regCode=" + regCode,
                "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
                "sPaginationType": "full_numbers",
                "bAutoWidth": false,
                "aoColumns": [
                    { "mData": "Province" },
                    { "mData": "ItemValuesName" }
                ],
                "fnServerData": function(sSource, aoData, fnCallback) {
                    $.ajax({
                        "dataType": 'json',
                        "type": "POST",
                        "url": sSource,
                        "data": aoData,
                        "success": fnCallback,
                        "timeout": 0,
                        "error": handleAjaxError,
                        "global": false
                    });
                }
            };
            if ($.fn.dataTable.fnIsDataTable(document.getElementById("cityAllDailyRec-list"))) {
                $("#cityAllDailyRec-list").dataTable().fnClearTable();
                $("#cityAllDailyRec-list").dataTable().fnDestroy();
                $('#cityAllDailyRec-list').dataTable(config).fnDraw();
            } else {
                $('#cityAllDailyRec-list').dataTable(config).fnDraw();
            }

            $('#cityAllDailyRec-list tbody').delegate("tr", "click", function() {
                var table = $('#cityAllDailyRec-list').dataTable();
                var data = table.fnGetData(this);
                if (data != null) {
                    $('#txtSearch').val(data.IdOptionItemValue == null ? 0 : data.IdOptionItemValue);
                    $('#cityParam').val(data.ItemValuesName == null ? '' : data.ItemValuesName);
                }

                $('#dailyrecregionmodal').modal('hide');
                $('#cityAllDailyRec-list tbody').undelegate("tr", "click");
            });
        }
    }
}

$(document).ready(function() {

    var ReplacementUnit = {
        "1": "DSF Office",
        "2": "Registration Number",
        "3": "Replacement Unit Police Number",
        "4": "Model Unit",
        "5": "Agreement No",
        "6": "Customer Name",
        "7": "OPL Unit Police No",
        "8": "Actice / Not Active",
        "9": "Status",
        "10": "Replacement Unit",
        "11": "Company Name",
        "12": "Site",
        "13": "Replacing",
        "14": "Replacement Type"
    }

    var $select = $("#ddlSearchCriteria");
    var JSONData = ReplacementUnit;
    var arrD = [];

    for (var key in JSONData) {
        if (JSONData.hasOwnProperty(key)) {
            arrD.push(JSONData[key]);
        }
    };

    arrD = arrD.sort();

    $select.empty();
    for (var val in arrD) {
        if (tabActive == 0) {
            $select.append('<option value=' + extractKeyValue(JSONData, arrD[val]) + '>' + arrD[val] + '</option>');
        }
    };

    $("#txtSearch").val(null);
    $("#txtStartDate").val(null);
    $("#txtEndDate").val(null);

    $("*.editbutton").click(function(e) {
        e.preventDefault();

        var state = $(this).val();

        if (state == "save") {

            var statusText = $("#status option:selected").html();
            var allocation = parseInt($("#allocation").val() == null ? "0" : $("#allocation").val());
            var status = parseInt($("#status").val() == null ? "0" : $("#status").val());

            if (allocation == 0) {
                $("#mAllocation").show();
                $("#allocation").focus();
                return false;
            }

            if (status == 0) {
                $("#mStatus").show();
                $("#status").focus();
                return false;
            }

            if (statusText == "GTS Unit") {
                $('#dailyrecgtsmodal').modal('show');
                $("#agreementNumber").val('');
                $("#customerName").val('');
            } else {
                var idTbMGTDailyRecordCar = parseInt($("#IdTb_MGT_DailyRecordCar").val());
                var idOPLAgreement = parseInt($("#idOPLAgreement").val());
                var idOPLUnit = parseInt($("#idOPLUnit").val());
                var mileage = parseInt($("#mileage").val().replace(/,/g, ""));
                var inDate = $("#inDate").val();
                var outDate = $("#outDate").val();
                var province = $("#idProvince").val();
                var city = $("#idCity").val();
                var parkingLocation = parseInt($("#parkingLocation").val());
                var soldPrice = parseFloat($("#soldPrice").val().replace(/,/g, ""));
                var bookValue = parseFloat($("#bookValue").val().replace(/,/g, ""));
                var gainLos = parseFloat($("#gainLos").val().replace(/,/g, ""));
                var soldDate = $("#soldDate").val();
                var contractStatus = parseInt($("#contractStatus").val());
                var buyerName = $("#buyerName").val();
                var remark = $("#remark").val();
                var createdBy = $("#createdBy").val();
                var createdDate = $("#createdDate").val();
                var policeNo = $("#policeNo").val();
                var engineNo = $("#engineNo").val();
                var chasisNo = $("#chasisNo").val();
                var idOPLAgreementGTS = 0;
                var agreementNumberGTS = "";
                var statusGTS = 0;

                var obj = new Object();

                obj.IdTb_MGT_DailyRecordCar = idTbMGTDailyRecordCar;
                obj.IdOPLAgreement = idOPLAgreement;
                obj.IdTb_OPL_Unit = idOPLUnit;
                obj.Mileage = mileage;
                obj.InDate = inDate;
                obj.OutDate = outDate;
                obj.Allocation = allocation;
                obj.Status = status;
                obj.Province = province;
                obj.City = city;
                obj.ParkingLocation = parkingLocation;
                obj.SoldPrice = soldPrice;
                obj.BookValue = bookValue;
                obj.GainLos = gainLos;
                obj.SoldDate = soldDate;
                obj.ContractStatus = contractStatus;
                obj.BuyerName = buyerName;
                obj.Remark = remark;
                obj.CreatedBy = createdBy;
                obj.CreatedDate = createdDate;
                obj.IdOPLAgreementGTS = idOPLAgreementGTS;
                obj.AgreementNumberGTS = agreementNumberGTS;
                obj.PoliceNo = policeNo;
                obj.EngineNo = engineNo;
                obj.ChassisNo = chasisNo;
                obj.StatusGTS = statusGTS;

                $.ajax(
                    {
                        type: "POST",
                        contentType: "application/json",
                        data: JSON.stringify(obj),
                        url: serverRoot + "MGTOplUnitReplace/UpdateDailyRecordCar",
                        success: function(response) {

                            $('#dailyrecgtsmodal').modal('hide');
                            $('#dataoplunitmodal').modal('hide');

                            $("#paging2").remove();
                            $('#table-list-oplunit').dataTable().fnClearTable();
                            $('#table-list-oplunit').dataTable().fnDestroy();
                            datagridOPLUnit();
                            $('#loadingmessage').hide();
                            $('#table-list-oplunit').dataTable().fnDraw();

                            UpdateDailyRecordCarOPLUnitSuccessMsg();
                        }
                    });
            }
        }
    });

    $("*.reversebutton").click(function(e) {
        e.preventDefault();

        var state = $(this).val();

        if (state == "reverse") {

            var statusText = $("#status option:selected").html();
            var allocation = parseInt($("#allocation").val() == null ? "0" : $("#allocation").val());
            var status = parseInt($("#status").val() == null ? "0" : $("#status").val());

            if (allocation == 0) {
                $("#mAllocation").show();
                $("#allocation").focus();
                return false;
            }

            if (status == 0) {
                $("#mStatus").show();
                $("#status").focus();
                return false;
            }

            if (statusText == "GTS Unit") {
                $('#dailyrecgtsmodal').modal('show');
                $("#agreementNumber").val('');
                $("#customerName").val('');
            } else {
                var idTbMGTDailyRecordCar = parseInt($("#IdTb_MGT_DailyRecordCar").val());
                var idOPLAgreement = parseInt($("#idOPLAgreement").val());
                var idOPLUnit = parseInt($("#idOPLUnit").val());
                var mileage = parseInt($("#mileage").val().replace(/,/g, ""));
                var inDate = $("#inDate").val();
                var outDate = $("#outDate").val();
                var province = $("#idProvince").val();
                var city = $("#idCity").val();
                var parkingLocation = parseInt($("#parkingLocation").val());
                var soldPrice = parseFloat($("#soldPrice").val().replace(/,/g, ""));
                var bookValue = parseFloat($("#bookValue").val().replace(/,/g, ""));
                var gainLos = parseFloat($("#gainLos").val().replace(/,/g, ""));
                var soldDate = $("#soldDate").val();
                var contractStatus = parseInt($("#contractStatus").val());
                var buyerName = $("#buyerName").val();
                var remark = $("#remark").val();
                var createdBy = $("#createdBy").val();
                var createdDate = $("#createdDate").val();
                var policeNo = $("#policeNo").val();
                var engineNo = $("#engineNo").val();
                var chasisNo = $("#chasisNo").val();
                var idOPLAgreementGTS = 0;
                var agreementNumberGTS = "";
                var statusGTS = 0;

                var obj = new Object();

                obj.IdTb_MGT_DailyRecordCar = idTbMGTDailyRecordCar;
                obj.IdOPLAgreement = idOPLAgreement;
                obj.IdTb_OPL_Unit = idOPLUnit;
                obj.Mileage = mileage;
                obj.InDate = inDate;
                obj.OutDate = outDate;
                obj.Allocation = allocation;
                obj.Status = status;
                obj.Province = province;
                obj.City = city;
                obj.ParkingLocation = parkingLocation;
                obj.SoldPrice = soldPrice;
                obj.BookValue = bookValue;
                obj.GainLos = gainLos;
                obj.SoldDate = soldDate;
                obj.ContractStatus = contractStatus;
                obj.BuyerName = buyerName;
                obj.Remark = "Reverse Unit";
                obj.CreatedBy = createdBy;
                obj.CreatedDate = createdDate;
                obj.IdOPLAgreementGTS = idOPLAgreementGTS;
                obj.AgreementNumberGTS = agreementNumberGTS;
                obj.PoliceNo = policeNo;
                obj.EngineNo = engineNo;
                obj.ChassisNo = chasisNo;
                obj.StatusGTS = statusGTS;

                $.ajax(
                    {
                        type: "POST",
                        contentType: "application/json",
                        data: JSON.stringify(obj),
                        url: serverRoot + "MGTOplUnitReplace/UpdateDailyRecordCar",
                        success: function(response) {

                            $('#dailyrecgtsmodal').modal('hide');
                            $('#dataoplunitmodal').modal('hide');

                            $("#paging3").remove();
                            $('#table-list-disposed').dataTable().fnClearTable();
                            $('#table-list-disposed').dataTable().fnDestroy();
                            datagridDisposed();
                            $('#loadingmessage').hide();
                            $('#table-list-disposed').dataTable().fnDraw();

                            ReverseCarOPLUnitSuccessMsg();
                        }
                    });
            }
        }
    });

    $("#yesDailyGTS").click(function(e) {

        var statusGTS = "";
        $('#status option').each(function() {
            if ($(this).html() == "In Use/ Running Contract") {
                statusGTS = $(this).val();
            }
        });

        var idTbMGTDailyRecordCar = parseInt($("#IdTb_MGT_DailyRecordCar").val());
        var idOPLAgreement = parseInt($("#idOPLAgreement").val());
        var idOPLUnit = parseInt($("#idOPLUnit").val());
        var mileage = parseInt($("#mileage").val().replace(/,/g, ""));
        var inDate = $("#inDate").val();
        var outDate = $("#outDate").val();
        var province = $("#idProvince").val();
        var city = $("#idCity").val();
        var allocation = parseInt($("#allocation").val());
        var status = parseInt($("#status").val());
        var parkingLocation = parseInt($("#parkingLocation").val());
        var soldPrice = parseFloat($("#soldPrice").val().replace(/,/g, ""));
        var bookValue = parseFloat($("#bookValue").val().replace(/,/g, ""));
        var gainLos = parseFloat($("#gainLos").val().replace(/,/g, ""));
        var soldDate = $("#soldDate").val();
        var contractStatus = parseInt($("#contractStatus").val());
        var buyerName = $("#buyerName").val();
        var remark = $("#remark").val();
        var createdBy = $("#createdBy").val();
        var createdDate = $("#createdDate").val();
        var policeNo = $("#policeNo").val();
        var engineNo = $("#engineNo").val();
        var chasisNo = $("#chasisNo").val();
        var idOPLAgreementGTS = $("#idOPLAgreementGTS").val();
        var agreementNumberGTS = $("#agreementNumber").val();

        var obj = new Object();

        obj.IdTb_MGT_DailyRecordCar = idTbMGTDailyRecordCar;
        obj.IdOPLAgreement = idOPLAgreement;
        obj.IdTb_OPL_Unit = idOPLUnit;
        obj.Mileage = mileage;
        obj.InDate = inDate;
        obj.OutDate = outDate;
        obj.Allocation = allocation;
        obj.Status = status;
        obj.Province = province;
        obj.City = city;
        obj.ParkingLocation = parkingLocation;
        obj.SoldPrice = soldPrice;
        obj.BookValue = bookValue;
        obj.GainLos = gainLos;
        obj.SoldDate = soldDate;
        obj.ContractStatus = contractStatus;
        obj.BuyerName = buyerName;
        obj.Remark = remark;
        obj.CreatedBy = createdBy;
        obj.CreatedDate = createdDate;
        obj.IdOPLAgreementGTS = idOPLAgreementGTS;
        obj.AgreementNumberGTS = agreementNumberGTS;
        obj.PoliceNo = policeNo;
        obj.EngineNo = engineNo;
        obj.ChassisNo = chasisNo;
        obj.StatusGTS = statusGTS;

        $.ajax(
            {
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(obj),
                url: serverRoot + "MGTOplUnitReplace/UpdateDailyRecordCar",
                success: function(response) {

                    $('#dailyrecgtsmodal').modal('hide');
                    $('#dataoplunitmodal').modal('hide');

                    $("#paging2").remove();
                    $('#table-list-oplunit').dataTable().fnClearTable();
                    $('#table-list-oplunit').dataTable().fnDestroy();
                    datagridOPLUnit();
                    $('#loadingmessage').hide();
                    $('#table-list-oplunit').dataTable().fnDraw();

                    $("#agreementNumber").val('');
                    $("#customerName").val('');

                    UpdateDailyRecordCarOPLUnitSuccessMsg();
                }
            });
    });

    $("#uploadBTNUnit").click(function(e) {

        e.preventDefault();

        //var File = document.getElementById("dataAttachmentUnit").files;
        var IdTb_OPL_Unit = $("#oplunit").val();// document.getElementById("oplunit").value;
        var IdOPLAgreement = $("#oplagrAtchUnit").val();// document.getElementById("oplagr").value;

        var fileUpload = $("#dataAttachmentUnit").get(0);
        var files = fileUpload.files;

        var formData = new FormData();

        for (var i = 0; i < files.length; i++) {
            formData.append(files[i].name, files[i]);
        }

        formData.append("IdOPL", IdTb_OPL_Unit);
        formData.append("IdOPLAgreement", IdOPLAgreement);

        $.ajax(
            {
                type: 'POST',
                url: './MGTOPLUnitReplace/UploadUnitAttachment',
                data: formData,
                dataType: 'json',
                contentType: false,
                processData: false,
                error: function(response) {

                    $('#dailyrecgtsmodal').modal('hide');
                    $('#dataoplunitmodal').modal('hide');
                    $('#historyoplmodal').modal('hide');
                    $('#addattachmentoplunit-list').modal('hide');
                    document.getElementById("uploadBTNUnit").disabled = true;

                    //$("#paging2").remove();
                    //$('#table-list-oplunit').dataTable().fnClearTable();
                    //$('#table-list-oplunit').dataTable().fnDestroy();
                    //datagridOPLUnit();
                    $('#loadingmessage').hide();
                    //$('#table-list-oplunit').dataTable().fnDraw();

                    $("#agreementNumber").val('');
                    $("#customerName").val('');

                    UploadAttachmentSuccessMsg();
                }
            });
    });

    $("#uploadBTN").click(function(e) {

        e.preventDefault();

        //var File = document.getElementById("dataAttachmentUnit").files;
        var IdTb_OPL_Unit = $("#opl").val();// document.getElementById("oplunit").value;
        var IdOPLAgreement = $("#oplagrAtch").val();// document.getElementById("oplagr").value;

        var fileUpload = $("#dataAttachment").get(0);
        var files = fileUpload.files;

        var formData = new FormData();

        for (var i = 0; i < files.length; i++) {
            formData.append(files[i].name, files[i]);
        }

        formData.append("IdOPL", IdTb_OPL_Unit);
        formData.append("IdOPLAgreement", IdOPLAgreement);

        $.ajax(
            {
                type: 'POST',
                url: './MGTOPLUnitReplace/UploadUnitAttachment',
                data: formData,
                dataType: 'json',
                contentType: false,
                processData: false,
                error: function(response) {

                    $('#dailyrecgtsmodal').modal('hide');
                    $('#dataoplunitmodal').modal('hide');
                    $('#historyoplmodal').modal('hide');
                    $('#attachmentoplunit-list').modal('hide');
                    document.getElementById("uploadBTN").disabled = true;

                    //$("#paging2").remove();
                    //$('#attachmentoplunit-list').dataTable().fnClearTable();
                    //$('#attachmentoplunit-list').dataTable().fnDestroy();
                    //datagridOPLUnit();
                    $('#loadingmessage').hide();
                    //$('#attachmentoplunit-list').dataTable().fnDraw();

                    $("#agreementNumber").val('');
                    $("#customerName").val('');

                    UploadAttachmentSuccessMsg();
                }
            });
    });
    function UpdateDailyRecordCarOPLUnitSuccessMsg() {
        var successMsg = "<div id = 'DailyRecordCarOPLUnitSuccessUpdated' class='alert alert-success' role='alert'>" +
            "<button type='button' class='close' data-dismiss='alert'>" +
            "<span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span>" +
            "</button><b>Success!</b> Daily Record Car OPL Unit have been updated" +
            "</div>";
        $('#datatable').before(successMsg);

        setTimeout(function() {
            $('#DailyRecordCarOPLUnitSuccessUpdated').fadeOut('fast');
            $("#DailyRecordCarOPLUnitSuccessUpdated").remove();
        }, 2000);
    }

    function UploadAttachmentSuccessMsg() {
        var successMsg = "<div id = 'UploadAttachmentSuccessUpdated' class='alert alert-success' role='alert'>" +
            "<button type='button' class='close' data-dismiss='alert'>" +
            "<span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span>" +
            "</button><b>Success!</b> Attachment successfully uploaded" +
            "</div>";
        $('#datatable').before(successMsg);

        setTimeout(function() {
            $('#UploadAttachmentSuccessUpdated').fadeOut('fast');
            $("#UploadAttachmentSuccessUpdated").remove();
        }, 2000);
    }

    function ReverseCarOPLUnitSuccessMsg() {
        var successMsg = "<div id = 'ReverseCarOPLUnitSuccessUpdated' class='alert alert-success' role='alert'>" +
            "<button type='button' class='close' data-dismiss='alert'>" +
            "<span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span>" +
            "</button><b>Success!</b> Reverse Car OPL Unit success" +
            "</div>";
        $('#datatable').before(successMsg);

        setTimeout(function() {
            $('#ReverseCarOPLUnitSuccessUpdated').fadeOut('fast');
            $("#ReverseCarOPLUnitSuccessUpdated").remove();
        }, 2000);
    }

    // start add Upload Function by Agung
    var uploadField = document.getElementById("dataAttachment");

    if (uploadField.value != null) {
        uploadField.onchange = function() {

            if (this.files.length > 10) {
                document.getElementById("uploadBTN").disabled = true;
                $("#addUnitFile").html("<p id='alertAdd' style='color:red;'>Only 10 files accepted.</p>");
                return false;
            } else {
                for (var i = 0; i < this.files.length; i++) {
                    if (this.files[i].size > 524288) {
                        $("#addUnitFile").html("<p id='alertAdd' style='color:red;'>Your File exceed than 500kb in size, file name " + this.files[i].name + "</p>");
                        document.getElementById("uploadBTN").disabled = true;
                        return false;
                    }
                    else if ((((this.files[i].name).length) + 82) > 200) {
                        document.getElementById("uploadBTN").disabled = true;
                        $("#addUnitFile").html("<p id='alertAdd' style='color:red;'>Your filename is to long. Please rename the file first, file name " + this.files[i].name + "</p>");
                        return false;
                    }
                    else {
                        document.getElementById("uploadBTN").disabled = false;
                        document.getElementById("alertAdd").style.visibility = 'hidden';
                    };
                }
            }
        };
    }
    else {
        document.getElementById("uploadBTN").disabled = true;
    };

    var uploadFieldUnit = document.getElementById("dataAttachmentUnit");

    uploadFieldUnit.onchange = function() {
        if (uploadFieldUnit != null) {
            if (this.files[0].size > 524288) {
                document.getElementById("uploadBTNUnit").disabled = true;
                $("#addUnit").html("<p id='alertAddUnit' style='color:red;'>Your File exceed than 500kb in size. Please choose another file</p>")
            }
            else if ((((this.files[0].name).length) + 82) > 200) {
                document.getElementById("uploadBTNUnit").disabled = true;
                $("#addUnit").html("<p id='alertAddUnit' style='color:red;'>Your filename is to long. Please rename the file first</p>")
            }
            else if ((((this.files[0].name).length) + 82) > 200) {
                document.getElementById("uploadBTNUnit").disabled = true;
                $("#addUnit").html("<p id='alertAddUnit' style='color:red;'>Your filename is to long. Please rename the file first</p>")
            }
            else {
                document.getElementById("uploadBTNUnit").disabled = false;
                document.getElementById("alertAddUnit").style.visibility = 'hidden';
            };
        }
        else {
            document.getElementById("uploadBTNUnit").disabled = true;
        };
    };

    $('#closeBTN').click(clearData);
    $('#closeBTNUnit').click(clearDataUnit);

    function clearData() {
        document.getElementById("dataAttachment").value = null;
        document.getElementById("uploadBTN").disabled = true;
        document.getElementById("alertAdd").style.visibility = 'hidden';
    };

    function clearDataUnit() {
        document.getElementById("dataAttachmentUnit").value = null;
        document.getElementById("uploadBTNUnit").disabled = true;
        document.getElementById("alertAddUnit").style.visibility = 'hidden';
    };
    // end add Upload Function by Agung									   
});