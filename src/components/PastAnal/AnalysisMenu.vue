<template>
  <div class="d-flex d-md-none">
    <div
      class="btn-group w-100"
      role="group"
      aria-label="Basic radio toggle button group"
    >
      <input
        type="radio"
        class="btn-check"
        name="btnRadioVote"
        id="btnRadioVote"
        autocomplete="off"
        checked
      />
      <label class="btn btn-outline-warning" for="btnRadioVote">投票情況</label>

      <input
        type="radio"
        class="btn-check"
        name="btnRadioParty"
        id="btnRadioParty"
        autocomplete="off"
      />
      <label class="btn btn-outline-warning" for="btnRadioParty"
        >政黨得票分析</label
      >
    </div>
  </div>
  <div class="d-none d-md-flex">
    <div
      class="btn-group-vertical w-100"
      role="group"
      aria-label="vertical button group"
    >
      <input
        type="radio"
        class="btn-check"
        name="btnRadioVote-v"
        id="btnRadioVote-v"
        autocomplete="off"
        checked
      />
      <label class="btn btn-outline-warning" for="btnRadioVote-v"
        >投票情況</label
      >

      <input
        type="radio"
        class="btn-check"
        name="btnRadioParty-v"
        id="btnRadioParty-v"
        autocomplete="off"
      />
      <label class="btn btn-outline-warning" for="btnRadioParty-v"
        >政黨得票分析</label
      >
    </div>
  </div>
</template>
