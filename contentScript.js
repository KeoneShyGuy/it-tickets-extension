// Function to extract ticket information from the form
function getTicketData() {
    let subject = document.querySelector("input#subject").value;
    let description = document.querySelector("textarea#description").value;
    let contactName = document.querySelector("input#contactName").value;

    return { subject, description, contactName };
}

// Function to auto-fill form fields based on saved ticket data
function autoFillForm(ticketData) {
    document.querySelector("input#subject").value = ticketData.subject;
    document.querySelector("textarea#description").value = ticketData.description;
    document.querySelector("input#contactName").value = ticketData.contactName;
}

// Save ticket data in local storage
function saveTicketData(ticketData) {
    chrome.storage.local.get({ tickets: [] }, function(result) {
        let tickets = result.tickets;
        tickets.push(ticketData);  // Add new ticket data
        chrome.storage.local.set({ tickets: tickets });
    });
}

// Find a matching ticket based on the current subject input
function findMatchingTicket(currentSubject) {
    chrome.storage.local.get({ tickets: [] }, function(result) {
        let tickets = result.tickets;
        let match = tickets.find(ticket => ticket.subject.includes(currentSubject));
        if (match) {
            autoFillForm(match);
        }
    });
}

// Save ticket data when the ticket form is submitted
document.querySelector("#submit-ticket-button").addEventListener("click", function() {
    let ticketData = getTicketData();
    saveTicketData(ticketData);
});

// Auto-fill the form when the subject input field changes
document.querySelector("input#subject").addEventListener("input", function(event) {
    let currentSubject = event.target.value;
    findMatchingTicket(currentSubject);
});
