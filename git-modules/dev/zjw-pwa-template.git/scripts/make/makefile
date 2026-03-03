# Makefile for TypeScript project using zjw-pwa-template build 'framework'

# Variables
#$(info PATH: $(PATH))
#$(info ZJWP_PROJECT_GIT_ROOT: $(ZJWP_PROJECT_GIT_ROOT))

sp := 

sp +=

qs = $(subst ?,$(sp),$1)
sq = $(subst $(sp),?,$1)


_ZJWP_PROJECT_GIT_ROOT:=$(call sq,$(ZJWP_PROJECT_GIT_ROOT))
$(info ZJWP_PROJECT_GIT_ROOT: $(ZJWP_PROJECT_GIT_ROOT))
#$(ZJWP_PROJECT_GIT_ROOT) # Ensure the environment variable is set
#ifeq ($(_ZJWP_PROJECT_GIT_ROOT)," ")
ifndef _ZJWP_PROJECT_GIT_ROOT
  $(error Environment variable ZJWP_PROJECT_GIT_ROOT is not set.  Have you run 'source scripts/zjwp/zjwp-set-path')
else
  $(info _ZJWP_PROJECT_GIT_ROOT: $(_ZJWP_PROJECT_GIT_ROOT))
  MK=$(addsuffix /scripts/makefile-variables, $(_ZJWP_PROJECT_GIT_ROOT))
  include $(call qs,$(MK))
endif

$(info SRC_DIR: $(SRC_DIR))

TS_FILES = $(wildcard $(SRC_DIR)/**/*.ts)
SHELL = /bin/bash

# Default target
all: build

push: 

	@./embed-revision	
	cd ..; pwd;	git commit -m "Update revision" .
	@echo "Pushing changes to remote repository..."
	git push		cd


# Build target
#build: $(TS_FILES)    
build:	
	@echo Root.... $(_ZJWP_PROJECT_GIT_ROOT)
	@echo Building.... $(SRC_DIR)
	@pushd $(SRC_DIR) > /dev/null;\
	tsc;\
	sed -i 's/export {};//' main.js;\
	popd > /dev/null	

revision:
	@./embed-revision $(call $(qs),$(SRC_DIR))

# git commit -m "Update revision" .	

# Clean target
clean:
	rm -rf $(OUT_DIR)/*

# Watch target
watch:
	tsc --watch

.PHONY: all build clean watch
