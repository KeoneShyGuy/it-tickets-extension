document.getElementById("view-tickets").addEventListener("click", function() {
    chrome.storage.local.get({ tickets: [] }, function(result) {
        let tickets = result.tickets;
        let ticketListDiv = document.getElementById("ticket-list");
        ticketListDiv.innerHTML = '';  // Clear previous list

        if (tickets.length === 0) {
            ticketListDiv.innerHTML = '<p>No tickets found.</p>';
        } else {
            tickets.forEach(ticket => {
                let ticketElement = document.createElement("div");
                ticketElement.innerHTML = `<strong>Subject:</strong> ${ticket.subject} <br>
                                           <strong>Description:</strong> ${ticket.description} <br>
                                           <strong>Contact Name:</strong> ${ticket.contactName} <br><br>`;
                ticketListDiv.appendChild(ticketElement);
            });
        }
    });
});
