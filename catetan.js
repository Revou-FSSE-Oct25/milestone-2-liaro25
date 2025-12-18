const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const iconOpen = document.getElementById('icon-open');
const iconClose = document.getElementById("icon-close");

function handleMenuToggleClick() {
    mobileMenu.classList.toggle('hidden');
    iconOpen.classList.toggle('hidden');
    iconClose.classList.toggle('hidden');
}

menuToggle.addEventListener('click', handleMenuToggleClick);



/**
 * @param {string} val
 * @return {Object}
 */
var expect = function(val) {
    return { 
        toBe : function(otherval) {
            if (val === otherval)
            return "true" ;
            else {
            throw new Error ("Not Equal");    
        }
    },
        notToBe : function(otherval){
            if (val !== otherval)
            return "false";
            else {
            throw new Error ("Equal");
            }
        }
    }  
};

/**
 * expect(5).toBe(5); // true
 * expect(5).notToBe(5); // throws "Equal"
 */