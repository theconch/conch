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
            _fileSystem = new PhysicalFileSystem(environment.ApplicationBasePath);
        }

        public IEnumerable<Slide> GetSlides()
        {
            return FindSlides("Decks\\" + _deckName, _htmlPathBase);
        }

        private IEnumerable<Slide> FindSlides(string directory, string path)
        {
            IEnumerable<IFileInfo> contents;
            if (_fileSystem.TryGetDirectoryContents(directory, out contents))
            {
                foreach (var info in contents)
                {
                    if (info.IsDirectory)
                    {
                        foreach (var sub in FindSlides(directory + "\\" + info.Name, path + "/" + info.Name))
                        {
                            yield return sub;
                        }
                    }
                    else if (info.Name.EndsWith(".html", StringComparison.OrdinalIgnoreCase))
                    {
                        yield return new Slide(ExtractName(info.Name))
                        {
                            TemplateUrl = path + "/" + info.Name
                        };
                    }
                }
            }
        }

        private static string ExtractName(string fileName)
        {
            return NameExtractor.Replace(fileName, "$1");
        }
    }
}