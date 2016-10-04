BLANKS=blanks.json
FORMS = $(shell find . -type f -name '*.commonform')
COMMONFORM=node_modules/.bin/commonform
CFTEMPLATE=node_modules/.bin/cftemplate
MUSTACHE=node_modules/.bin/mustache
JSON=node_modules/.bin/json
FOUNDERS=1 2
PER_COMPANY=action-of-incorporator board-resolutions bylaws certificate-of-incorporation incorporator-certificate-of-adoption indemnification-agreement indemnification-agreement-resolutions secretary-certificate-of-adoption mutual-nda equity-comp/stock-plan
PER_FOUNDER=stock-purchase-agreement assignment-of-other-assets stock-power receipt 83-b-election receipt-and-consent 83-b-statement-acknowledgement indemnification-agreement
FOUNDER=$(foreach form,$(PER_FOUNDER),$(foreach founder,$(FOUNDERS),$(form)-$(founder)))

all: pdfs.zip

pdfs.zip: pdf
	zip $@ *.pdf

docx: $(PER_COMPANY:=.docx) $(FOUNDER:=.docx)

pdf: $(PER_COMPANY:=.pdf) $(FOUNDER:=.pdf)

$(COMMONFORM) $(CFTEMPLATE) $(MUSTACHE) $(JSON):
	npm i

%.pdf: %.docx
	doc2pdf $<

%.blanks.json: $(BLANKS) $(JSON)
	node -e "var j = require('./$(BLANKS)'); console.log(JSON.stringify(j), '\n', JSON.stringify(j['Stock Purchasers'][$* - 1]))"  | \
	$(JSON) --merge > $@

%-1.sigs.json: 1.blanks.json %.sigs $(MUSTACHE)
	$(MUSTACHE) 1.blanks.json $*.sigs > $@

%-2.sigs.json: 2.blanks.json %.sigs $(MUSTACHE)
	$(MUSTACHE) 2.blanks.json $*.sigs > $@

%.options: %.options-template $(BLANKS) $(MUSTACHE)
	$(MUSTACHE) $(BLANKS) $*.options-template > $@

%-1.docx: %.commonform %.options %-1.sigs.json 1.blanks.json $(COMMONFORM) $(CFTEMPLATE)
	$(CFTEMPLATE) $*.commonform 1.blanks.json | \
	$(COMMONFORM) render --format docx --blanks 1.blanks.json --signatures $*-1.sigs.json $(shell cat $*.options) > $@

%-2.docx: %.commonform %.options %-2.sigs.json 2.blanks.json $(COMMONFORM) $(CFTEMPLATE)
	$(CFTEMPLATE) $*.commonform 2.blanks.json | \
	$(COMMONFORM) render --format docx --blanks 2.blanks.json --signatures $*-2.sigs.json $(shell cat $*.options) > $@

%.sigs.json: %.sigs.js $(BLANKS) $(MUSTACHE)
	node $*.sigs.js < $(BLANKS) > $@

%.docx: %.commonform %.options %.sigs.json $(BLANKS) $(COMMONFORM) $(CFTEMPLATE)
	$(CFTEMPLATE) $*.commonform $(BLANKS) | \
	$(COMMONFORM) render --format docx --blanks $(BLANKS) --signatures $*.sigs.json $(shell cat $*.options) > $@

%.docx: %.commonform %.options $(BLANKS) $(COMMONFORM) $(CFTEMPLATE)
	$(CFTEMPLATE) $*.commonform $(BLANKS) | \
	$(COMMONFORM) render --format docx --blanks $(BLANKS) $(shell cat $*.options) > $@

.PHONY: clean test variants critique

variants: $(FORMS)
	rm -rf variants
	for form in $(FORMS); do \
		base=$$(basename $$form .commonform) ; \
		node generate-variants.js $$base; \
	done

test: variants $(COMMONFORM)
	for variant in variants/* ; do \
		echo ; \
		echo $$variant; \
		$(COMMONFORM) lint < $$variant | fgrep -v "only once" || echo "No errors"; \
	done; \

critique: $(FORMS) $(COMMONFORM)
	for form in $(FORMS); do \
		$(COMMONFORM) critique < $$form; \
	done

clean:
	git clean -fdx
