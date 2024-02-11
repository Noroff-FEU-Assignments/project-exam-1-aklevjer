// Close all accordions, if the selected one is not expanded, open it
function toggleAccordion(selectedBtn, accordionPanels) {
  const isExpanded = selectedBtn.getAttribute("aria-expanded") === "true";

  accordionPanels.forEach((panel) => {
    const accordionBtn = panel.querySelector(".accordion__header");
    const accordionIcon = panel.querySelector(".bx");
    const accordionContent = panel.querySelector(".accordion__content");

    const shouldExpand = accordionBtn === selectedBtn && !isExpanded;

    accordionBtn.setAttribute("aria-expanded", shouldExpand ? "true" : "false");

    accordionIcon.classList.toggle("bx-plus-circle", !shouldExpand);
    accordionIcon.classList.toggle("bx-minus-circle", shouldExpand);

    accordionContent.classList.toggle("accordion__content-open", shouldExpand);
  });
}

export function initAccordions() {
  const accordionBtns = document.querySelectorAll(".accordion__header");
  const accordionPanels = document.querySelectorAll(".accordion__panel");

  accordionBtns.forEach((btn) => {
    btn.addEventListener("click", () => toggleAccordion(btn, accordionPanels));
  });
}
