using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System;

namespace Conch
{
    /// <summary>
    /// Summary description for DeckHub
    /// </summary>
    [HubName("deck")]
    public class DeckHub : Hub
    {
        private static int _currentIndex = 0;

        public void Control(string connectionId, string deckName)
        {
            Groups.Add(connectionId, deckName + "Controller");
        }

        public int Join(string connectionId, string deckName)
        {
            Groups.Add(connectionId, deckName);
            return _currentIndex;
        }

        public void Leave(string connectionId, string deckName)
        {
            Groups.Remove(connectionId, deckName);
        }

        public void Move(string deckName, int index)
        {
            _currentIndex = index;
            Clients.Group(deckName).move(index);
        }

        public void Message(string deckName, string name, string message)
        {
            Clients.Group(deckName + "Controller").message(name, message);
        }
    }
}