using Microsoft.AspNet.FileSystems;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using Microsoft.Framework.Runtime;

namespace Conch
{
    /// <summary>
    /// Summary description for DeckData
    /// </summary>
    public class DeckData
    {
        private static readonly char[] LeadingNumbers = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-' };
        private static readonly Regex NameExtractor = new Regex("^[0-9]*-(.*)\\.html$");
        private readonly string _deckName;
        private readonly string _htmlPathBase;
        private readonly PhysicalFileSystem _fileSystem;
        private IApplicationEnvironment _environment;

        public DeckData(IApplicationEnvironment environment, string deckName)
        {
            _environment = environment;
            _deckName = deckName;
            _htmlPathBase = "/decks/" + deckName;
            _fileSystem = new PhysicalFileSystem(environment.ApplicationBasePath + "\\wwwroot");
        }

        public IEnumerable<Slide> GetSlides()
        {
            var slides = FindSlides("Decks\\" + _deckName, _htmlPathBase).ToList();
            return slides;
        }

        private IEnumerable<Slide> FindSlides(string directory, string path, string prefix = "")
        {
            IEnumerable<IFileInfo> contents;
            if (_fileSystem.TryGetDirectoryContents(directory, out contents))
            {
                foreach (var info in contents)
                {
                    if (info.IsDirectory)
                    {
                        foreach (var sub in FindSlides(directory + "\\" + info.Name, path + "/" + info.Name, prefix + RemoveLeadingNumbers(info.Name) + "+"))
                        {
                            yield return sub;
                        }
                    }
                    else if (info.Name.EndsWith(".html", StringComparison.OrdinalIgnoreCase))
                    {
                        yield return new Slide(prefix + ExtractName(info.Name))
                        {
                            TemplateUrl = path + "/" + info.Name
                        };
                    }
                }
            }
        }

        private static string RemoveLeadingNumbers(string name)
        {
            return name.TrimStart(LeadingNumbers);
        }

        private static string ExtractName(string fileName)
        {
            return NameExtractor.Replace(fileName, "$1");
        }
    }
}