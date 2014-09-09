using System;
using System.Collections.Generic;

namespace Conch
{
    /// <summary>
    /// Summary description for Deck
    /// </summary>
    public class Deck
    {
        public string Title { get; set; }
        public string Stylesheets { get; set; }

        public IEnumerable<string> GetStylesheets()
        {
            return Stylesheets.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
        }
    }
}